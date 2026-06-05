<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClientOrderHistoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_order_history()
    {
        $response = $this->get('/compte/commandes');
        $response->assertRedirect('/login');
    }

    public function test_client_can_view_their_own_order_history()
    {
        $user = User::factory()->create(['role' => 'client']);
        
        $order = Order::create([
            'user_id' => $user->id,
            'customer_name' => $user->name,
            'order_number' => 'ORD-20260605-001',
            'total' => 150.00,
            'delivery_address' => $user->address,
            'phone' => $user->phone,
            'status' => 'Pending',
            'payment_method' => 'Paiement à la livraison',
        ]);

        $response = $this->actingAs($user)->get('/compte/commandes');
        $response->assertStatus(200);
        $response->assertSee('ORD-20260605-001');
    }

    public function test_client_cannot_view_another_users_order()
    {
        $user1 = User::factory()->create(['role' => 'client']);
        $user2 = User::factory()->create(['role' => 'client']);

        $order = Order::create([
            'user_id' => $user1->id,
            'customer_name' => $user1->name,
            'order_number' => 'ORD-20260605-001',
            'total' => 150.00,
            'delivery_address' => $user1->address,
            'phone' => $user1->phone,
            'status' => 'Pending',
            'payment_method' => 'Paiement à la livraison',
        ]);

        $response = $this->actingAs($user2)->get("/compte/commandes/{$order->id}");
        $response->assertStatus(403);
    }

    public function test_client_can_view_their_own_order_detail()
    {
        $user = User::factory()->create(['role' => 'client']);

        $order = Order::create([
            'user_id' => $user->id,
            'customer_name' => $user->name,
            'order_number' => 'ORD-20260605-001',
            'total' => 150.00,
            'delivery_address' => $user->address,
            'phone' => $user->phone,
            'status' => 'Pending',
            'payment_method' => 'Paiement à la livraison',
        ]);

        $response = $this->actingAs($user)->get("/compte/commandes/{$order->id}");
        $response->assertStatus(200);
        $response->assertSee('ORD-20260605-001');
    }
}
