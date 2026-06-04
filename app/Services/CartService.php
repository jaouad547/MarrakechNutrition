<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class CartService
{
    public function getSessionCart(Request $request): array
    {
        return $request->session()->get('cart.items', []);
    }

    public function setSessionCart(Request $request, array $items): void
    {
        $request->session()->put('cart.items', $items);
    }

    public function getSessionCartCount(Request $request): int
    {
        return array_sum(array_column($this->getSessionCart($request), 'quantity'));
    }

    public function syncSessionCartFromDatabase(User $user, Request $request): array
    {
        $items = $this->getDatabaseCartItems($user)->all();
        $this->setSessionCart($request, $items);

        return $items;
    }

    public function getDatabaseCartItems(User $user): Collection
    {
        $cart = Cart::firstWhere('user_id', $user->id);

        if (! $cart) {
            return collect([]);
        }

        return $cart->items()
            ->with('product')
            ->get()
            ->filter(fn ($item) => $item->product && $item->product->is_active && $item->product->stock > 0)
            ->map(fn ($item) => $this->makeCartItem($item->product, min($item->quantity, $item->product->stock)))
            ->values();
    }

    public function mergeSessionCartToDatabase(User $user, array $sessionItems): array
    {
        $cart = $this->getOrCreateCart($user);

        $databaseItems = $cart->items()
            ->with('product')
            ->get()
            ->filter(fn ($item) => $item->product && $item->product->is_active && $item->product->stock > 0)
            ->keyBy(fn ($item) => $item->product_id);

        $merged = [];

        foreach ($sessionItems as $item) {
            $product = Product::find($item['id']);

            if (! $product || ! $product->is_active || $product->stock <= 0) {
                continue;
            }

            $quantity = min($item['quantity'], $product->stock);
            $merged[$product->id] = $this->makeCartItem($product, $quantity);
        }

        foreach ($databaseItems as $existingItem) {
            $product = $existingItem->product;

            if (! $product || ! $product->is_active || $product->stock <= 0) {
                continue;
            }

            $existingQuantity = $merged[$product->id]['quantity'] ?? 0;
            $quantity = min($existingQuantity + $existingItem->quantity, $product->stock);
            $merged[$product->id] = $this->makeCartItem($product, $quantity);
        }

        $this->syncDatabaseCartFromItems($user, array_values($merged));

        return array_values($merged);
    }

    public function syncDatabaseCartFromItems(User $user, array $items): void
    {
        $cart = $this->getOrCreateCart($user);

        $incoming = collect($items)->keyBy('id');
        $existing = $cart->items()->pluck('quantity', 'product_id')->toArray();

        foreach ($incoming as $productId => $item) {
            $cart->items()->updateOrCreate([
                'product_id' => $productId,
            ], [
                'quantity' => $item['quantity'],
            ]);
        }

        $toDelete = array_diff(array_keys($existing), $incoming->keys()->all());

        if (! empty($toDelete)) {
            $cart->items()->whereIn('product_id', $toDelete)->delete();
        }
    }

    public function getOrCreateCart(User $user): Cart
    {
        return Cart::firstOrCreate([
            'user_id' => $user->id,
        ]);
    }

    public function makeCartItem(Product $product, int $quantity): array
    {
        return [
            'id' => $product->id,
            'slug' => $product->slug,
            'name' => $product->name,
            'image' => $product->image,
            'category' => $product->category?->name,
            'price' => (float) $product->price,
            'quantity' => $quantity,
            'stock' => $product->stock,
            'line_total' => round($product->price * $quantity, 2),
        ];
    }
}
