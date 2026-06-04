<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            ->filter(fn ($item) => $item['product'] && $item['product']->is_active)
            ->values();

        if ($items->isEmpty()) {
            return redirect()->route('cart.index')->with('status', 'Aucun produit actif n’est disponible dans votre panier.');
        }

        $insufficientStock = $items->first(fn ($item) => $item['quantity'] > $item['product']->stock);

        if ($insufficientStock) {
            return redirect()->route('cart.index')->with('status', 'Stock insuffisant pour le produit : ' . $insufficientStock['product']->name);
        }

        $deliveryFee = 20.00;

        $order = DB::transaction(function () use ($validated, $items, $deliveryFee, $request) {
            $subtotal = $items->sum(fn ($item) => $item['product']->price * $item['quantity']);
            $total = $subtotal + $deliveryFee;

            $orderNumber = $this->generateOrderNumber();

            $order = Order::create([
                'user_id' => Auth::id(),
                'customer_name' => $validated['name'],
                'order_number' => $orderNumber,
                'total' => $total,
                'delivery_address' => $validated['address'],
                'phone' => $validated['phone'],
                'status' => 'Pending payment on delivery',
                'payment_method' => 'Paiement à la livraison',
            ]);

            foreach ($items as $item) {
                $product = $item['product'];
                $quantity = $item['quantity'];

                if ($product->stock < $quantity) {
                    throw new \Exception('Stock insuffisant pour le produit : ' . $product->name);
                }

                $product->decrement('stock', $quantity);

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'price' => $product->price,
                ]);
            }

            return $order;
        });

        if ($request->user()) {
            $this->cartService->clearDatabaseCart($request->user());
        }

        $this->cartService->clearSessionCart($request);

        return redirect()->route('order.confirmation', ['order' => $order->id])
            ->with('status', 'Votre commande a été passée avec succès.');

}

    private function generateOrderNumber(): string
    {
        $count = Order::whereDate('created_at', now()->toDateString())->count() + 1;
        return sprintf('ORD-%s-%03d', now()->format('Ymd'), $count);
    }
}
