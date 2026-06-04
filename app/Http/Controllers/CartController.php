<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
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
            return back()->with('status', 'Ce produit n’est pas disponible.');
        }

        if ($product->stock <= 0) {
            return back()->with('status', 'Ce produit est en rupture de stock.');
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

        return back()->with('status', 'Produit ajouté au panier.');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1', 'max:' . $product->stock],
        ]);

        $cartItems = $request->session()->get('cart.items', []);

        if (! isset($cartItems[$product->id])) {
            return redirect()->route('cart.index')->with('status', 'Produit introuvable dans le panier.');
        }

        $cartItems[$product->id] = $this->makeCartItem($product, (int) $validated['quantity']);
        $request->session()->put('cart.items', $cartItems);

        return back()->with('status', 'Quantité mise à jour.');
    }

    public function destroy(Request $request, Product $product)
    {
        $cartItems = $request->session()->get('cart.items', []);

        if (isset($cartItems[$product->id])) {
            unset($cartItems[$product->id]);
            $request->session()->put('cart.items', $cartItems);
        }

        return back()->with('status', 'Produit retiré du panier.');
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
