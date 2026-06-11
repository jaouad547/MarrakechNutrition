<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function __construct(private CartService $cartService)
    {
    }

    public function index(Request $request)
    {
        if ($request->user()) {
            $this->cartService->syncSessionCartFromDatabase($request->user(), $request);
        }

        $items = collect($request->session()->get('cart.items', []))
            ->map(fn ($item) => [
                'id' => $item['id'],
                'slug' => $item['slug'],
                'name' => $item['name'],
                'image' => $item['image'],
                'category' => $item['category'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'stock' => $item['stock'],
                'line_total' => round($item['price'] * $item['quantity'], 2),
            ])
            ->values()
            ->all();

        $subtotal = collect($items)->sum(fn ($item) => $item['line_total']);

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'subtotal' => $subtotal,
            'total' => $subtotal,
            'itemCount' => collect($items)->sum('quantity'),
        ]);
    }

    public function store(Request $request, Product $product)
    {
        if (! $product->is_active) {
            return back()->with('status', __('messages.product_unavailable'));
        }

        if ($product->stock <= 0) {
            return back()->with('status', __('messages.product_out_of_stock'));
        }

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:' . $product->stock],
        ]);

        $quantity = (int) $validated['quantity'];
        $cartItems = $request->session()->get('cart.items', []);
        $existingQuantity = $cartItems[$product->id]['quantity'] ?? 0;
        $newQuantity = min($existingQuantity + $quantity, $product->stock);

        $cartItems[$product->id] = $this->makeCartItem($product, $newQuantity);
        $request->session()->put('cart.items', $cartItems);

        if ($request->user()) {
            $this->cartService->syncDatabaseCartFromItems($request->user(), array_values($cartItems));
        }

        return back()->with('status', __('messages.product_added_to_cart'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:' . $product->stock],
        ]);

        $cartItems = $request->session()->get('cart.items', []);

        if (! isset($cartItems[$product->id])) {
            return redirect()->route('cart.index')->with('status', __('messages.product_not_found_in_cart'));
        }

        $cartItems[$product->id] = $this->cartService->makeCartItem($product, (int) $validated['quantity']);
        $request->session()->put('cart.items', $cartItems);

        if ($request->user()) {
            $this->cartService->syncDatabaseCartFromItems($request->user(), array_values($cartItems));
        }

        return back()->with('status', __('messages.quantity_updated'));
    }

    public function destroy(Request $request, Product $product)
    {
        $cartItems = $request->session()->get('cart.items', []);

        if (isset($cartItems[$product->id])) {
            unset($cartItems[$product->id]);
            $request->session()->put('cart.items', $cartItems);

            if ($request->user()) {
                $this->cartService->syncDatabaseCartFromItems($request->user(), array_values($cartItems));
            }
        }

        return back()->with('status', __('messages.product_removed_from_cart'));
    }

    private function makeCartItem(Product $product, int $quantity): array
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
        ];
    }
}
