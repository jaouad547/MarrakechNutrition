<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function __construct(private CartService $cartService)
    {
    }

    public function index(Request $request)
    {
        $cartItems = $request->session()->get('cart.items', []);

        if (empty($cartItems)) {
            return redirect()->route('cart.index')->with('status', 'Votre panier est vide.');
        }

        $items = collect($cartItems)
            ->map(fn ($item) => [
                'id' => $item['id'],
                'slug' => $item['slug'],
                'name' => $item['name'],
                'image' => $item['image'],
                'category' => $item['category'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'line_total' => round($item['price'] * $item['quantity'], 2),
            ])
            ->values()
            ->all();

        $subtotal = collect($items)->sum(fn ($item) => $item['line_total']);
        $deliveryFee = 20.00;

        return Inertia::render('Checkout/Index', [
            'items' => $items,
            'subtotal' => $subtotal,
            'deliveryFee' => $deliveryFee,
            'total' => $subtotal + $deliveryFee,
            'user' => $request->user()?->only(['name', 'phone', 'address']),
        ]);
    }

    public function store(Request $request)
    {
        $cartItems = $request->session()->get('cart.items', []);

        if (empty($cartItems)) {
            return redirect()->route('cart.index')->with('status', 'Votre panier est vide.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'address' => ['required', 'string', 'max:500'],
        ]);

        $items = collect($cartItems)
            ->map(function ($item) {
                return [
                    'product' => Product::find($item['id']),
                    'quantity' => $item['quantity'],
                ];
            })
            ->filter(fn ($item) => $item['product'] && $item['product']->is_active && $item['product']->stock > 0)
            ->map(function ($item) {
                $item['quantity'] = min($item['quantity'], $item['product']->stock);
                return $item;
            });

        if ($items->isEmpty()) {
            return redirect()->route('cart.index')->with('status', 'Aucun produit actif n’est disponible dans votre panier.');
        }

        $subtotal = $items->sum(fn ($item) => $item['product']->price * $item['quantity']);
        $deliveryFee = 20.00;
        $total = $subtotal + $deliveryFee;

        $order = Order::create([
            'user_id' => Auth::id(),
            'order_number' => 'MN-' . Str::upper(Str::random(8)),
            'total' => $total,
            'delivery_address' => $validated['address'],
            'phone' => $validated['phone'],
            'status' => 'pending',
            'payment_method' => 'Paiement à la livraison',
        ]);

        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product']->id,
                'quantity' => $item['quantity'],
                'price' => $item['product']->price,
            ]);
        }

        $request->session()->forget('cart.items');

        if ($request->user()) {
            $this->cartService->clearDatabaseCart($request->user());
        }

        return redirect()->route('home')->with('status', 'Commande passée avec succès.');
    }
}
