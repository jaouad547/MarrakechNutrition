<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
}
