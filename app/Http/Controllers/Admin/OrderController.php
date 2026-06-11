<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrderController extends Controller
{
    const STATUS_FLOW = [
        'Pending payment on delivery' => 'preparing',
        'pending'                     => 'preparing',
        'preparing'                   => 'in delivery',
        'in delivery'                 => 'delivered',
    ];

    const STATUSES = [
        'Pending payment on delivery',
        'preparing',
        'in delivery',
        'delivered',
        'cancelled',
    ];

    public function index(Request $request)
    {
        $statusFilter = $request->input('status');
        $sortDir      = $request->input('sort', 'desc') === 'asc' ? 'asc' : 'desc';

        $orders = Order::when($statusFilter, fn ($q, $v) => $q->where('status', $v))
            ->orderBy('created_at', $sortDir)
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders->through(fn (Order $order) => [
                'id'            => $order->id,
                'order_number'  => $order->order_number,
                'customer_name' => $order->customer_name,
                'phone'         => $order->phone,
                'total'         => $order->total,
                'status'        => $order->status,
                'created_at'    => $order->created_at->format('d/m/Y H:i'),
            ]),
            'filters'  => [
                'status' => $statusFilter,
                'sort'   => $sortDir,
            ],
            'statuses' => self::STATUSES,
        ]);
    }

    public function show(Order $order)
    {
        $order->load('items.product');

        $nextStatus = self::STATUS_FLOW[strtolower($order->status)] ?? self::STATUS_FLOW[$order->status] ?? null;

        return Inertia::render('Admin/Orders/Show', [
            'order' => [
                'id'             => $order->id,
                'order_number'   => $order->order_number,
                'customer_name'  => $order->customer_name,
                'phone'          => $order->phone,
                'delivery_address' => $order->delivery_address,
                'payment_method' => $order->payment_method,
                'total'          => $order->total,
                'status'         => $order->status,
                'created_at'     => $order->created_at->format('d/m/Y H:i'),
                'next_status'    => $nextStatus,
                'can_cancel'     => ! in_array(strtolower($order->status), ['delivered', 'cancelled']),
                'items'          => $order->items->map(fn ($item) => [
                    'id'           => $item->id,
                    'product_name' => $item->product?->name ?? __('messages.deleted_product'),
                    'product_image' => $item->product?->image,
                    'quantity'     => $item->quantity,
                    'price'        => $item->price,
                    'line_total'   => $item->quantity * $item->price,
                ]),
            ],
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $nextStatus = self::STATUS_FLOW[strtolower($order->status)] ?? self::STATUS_FLOW[$order->status] ?? null;

        if (! $nextStatus) {
            return back()->with('status', __('messages.order_status_locked'));
        }

        $order->update(['status' => $nextStatus]);

        return Redirect::route('admin.orders.show', $order->id)
            ->with('status', __('messages.order_status_updated'));
    }

    public function cancel(Order $order)
    {
        $statusLower = strtolower($order->status);

        if (in_array($statusLower, ['delivered', 'cancelled'])) {
            return back()->with('status', __('messages.order_cannot_cancel'));
        }

        $order->load('items.product');

        DB::transaction(function () use ($order) {
            foreach ($order->items as $item) {
                if ($item->product) {
                    $item->product->increment('stock', $item->quantity);
                }
            }
            $order->update(['status' => 'cancelled']);
        });

        return Redirect::route('admin.orders.show', $order->id)
            ->with('status', __('messages.order_cancelled'));
    }
}
