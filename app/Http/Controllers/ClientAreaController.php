<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ClientAreaController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        // Redirect admins to admin dashboard
        if ($user && ($user->role === 'admin')) {
            return redirect('/admin');
        }

        $orders = Order::where('user_id', $user->id ?? 0)->orderByDesc('created_at');

        $ordersCount = $orders->count();
        $latestOrder = $orders->first();

        return Inertia::render('Profile/Dashboard', [
            'user' => $user ? $user->only(['id', 'name', 'phone', 'address']) : null,
            'ordersCount' => $ordersCount,
            'latestOrder' => $latestOrder ? [
                'id' => $latestOrder->id,
                'order_number' => $latestOrder->order_number,
                'status' => $latestOrder->status,
                'total' => $latestOrder->total,
                'created_at' => $latestOrder->created_at->format('d/m/Y'),
            ] : null,
        ]);
    }

    public function orders()
    {
        $user = Auth::user();

        if (! $user) {
            return redirect()->route('login');
        }

        if ($user->role === 'admin') {
            return redirect('/admin');
        }

        $orders = Order::where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'status' => $o->status,
                'total' => $o->total,
                'created_at' => $o->created_at->format('d/m/Y'),
            ]);

        return Inertia::render('Profile/Orders', [
            'orders' => $orders,
        ]);
    }

    public function orderShow(Order $order)
    {
        $user = Auth::user();

        if ($order->user_id !== $user->id) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('Profile/OrderDetail', [
            'order' => [
                'id'               => $order->id,
                'order_number'     => $order->order_number,
                'customer_name'    => $order->customer_name,
                'status'           => $order->status,
                'total'            => $order->total,
                'delivery_address' => $order->delivery_address,
                'phone'            => $order->phone,
                'payment_method'   => $order->payment_method,
                'created_at'       => $order->created_at->format('d/m/Y'),
                'items'            => $order->items->map(fn ($item) => [
                    'id'         => $item->id,
                    'name'       => $item->product?->name ?? '(produit supprimé)',
                    'image'      => $item->product?->image,
                    'quantity'   => $item->quantity,
                    'price'      => $item->price,
                    'line_total' => $item->quantity * $item->price,
                ]),
            ],
        ]);
    }
}
