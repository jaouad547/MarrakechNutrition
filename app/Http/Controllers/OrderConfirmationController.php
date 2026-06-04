<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class OrderConfirmationController extends Controller
{
    public function show(Order $order)
    {
        $order->load(['items.product', 'user']);

        return Inertia::render('Orders/Confirmation', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer_name,
                'delivery_address' => $order->delivery_address,
                'phone' => $order->phone,
                'status' => $order->status,
                'payment_method' => $order->payment_method,
                'total' => $order->total,
                'items' => $order->items->map(fn ($item) => [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'line_total' => round($item->price * $item->quantity, 2),
                ])->values()->all(),
                'user_id' => $order->user_id,
            ],
        ]);
    }
}
