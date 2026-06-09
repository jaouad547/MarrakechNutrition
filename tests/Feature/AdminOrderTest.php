<?php

namespace Tests\Feature;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminOrderTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    private function createOrderWithProduct(array $orderAttrs = [], int $quantity = 2): array
    {
        $product = Product::factory()->create(['stock' => 10, 'price' => 150.00]);
        $order   = Order::factory()->create(array_merge([
            'status' => 'Pending payment on delivery',
        ], $orderAttrs));

        OrderItem::create([
            'order_id'   => $order->id,
            'product_id' => $product->id,
            'quantity'   => $quantity,
            'price'      => $product->price,
        ]);

        return [$order, $product];
    }

    // ── Access control ──────────────────────────────────────────────────

    public function test_guest_cannot_access_admin_orders()
    {
        $response = $this->get('/admin/orders');

        $response->assertRedirect('/login');
    }

    public function test_client_cannot_access_admin_orders()
    {
        $client   = User::factory()->create(['role' => 'client']);
        $response = $this->actingAs($client)->get('/admin/orders');

        $response->assertRedirect('/');
    }

    // ── List & Detail ───────────────────────────────────────────────────

    public function test_admin_can_view_orders_list()
    {
        Order::factory()->count(3)->create();
        $admin = $this->admin();

        $response = $this->actingAs($admin)->get('/admin/orders');

        $response->assertStatus(200);
    }

    public function test_admin_can_view_order_detail()
    {
        [$order] = $this->createOrderWithProduct();
        $admin   = $this->admin();

        $response = $this->actingAs($admin)->get("/admin/orders/{$order->id}");

        $response->assertStatus(200);
    }

    // ── Status updates ──────────────────────────────────────────────────

    public function test_admin_can_advance_order_from_pending_to_preparing()
    {
        [$order] = $this->createOrderWithProduct(['status' => 'Pending payment on delivery']);
        $admin   = $this->admin();

        $response = $this->actingAs($admin)->patch("/admin/orders/{$order->id}/status");

        $response->assertRedirect(route('admin.orders.show', $order->id));
        $this->assertEquals('preparing', $order->fresh()->status);
    }

    public function test_admin_can_advance_order_from_preparing_to_in_delivery()
    {
        [$order] = $this->createOrderWithProduct(['status' => 'preparing']);
        $admin   = $this->admin();

        $this->actingAs($admin)->patch("/admin/orders/{$order->id}/status");

        $this->assertEquals('in delivery', $order->fresh()->status);
    }

    public function test_admin_can_advance_order_from_in_delivery_to_delivered()
    {
        [$order] = $this->createOrderWithProduct(['status' => 'in delivery']);
        $admin   = $this->admin();

        $this->actingAs($admin)->patch("/admin/orders/{$order->id}/status");

        $this->assertEquals('delivered', $order->fresh()->status);
    }

    public function test_delivered_order_cannot_be_advanced_further()
    {
        [$order] = $this->createOrderWithProduct(['status' => 'delivered']);
        $admin   = $this->admin();

        $this->actingAs($admin)->patch("/admin/orders/{$order->id}/status");

        $this->assertEquals('delivered', $order->fresh()->status);
    }

    // ── Cancellation ────────────────────────────────────────────────────

    public function test_admin_can_cancel_pending_order()
    {
        [$order] = $this->createOrderWithProduct(['status' => 'Pending payment on delivery']);
        $admin   = $this->admin();

        $response = $this->actingAs($admin)->post("/admin/orders/{$order->id}/cancel");

        $response->assertRedirect(route('admin.orders.show', $order->id));
        $this->assertEquals('cancelled', $order->fresh()->status);
    }

    public function test_cancelling_order_restores_product_stock()
    {
        [$order, $product] = $this->createOrderWithProduct(
            ['status' => 'preparing'],
            2
        );
        $stockBefore = $product->stock;
        $admin       = $this->admin();

        $this->actingAs($admin)->post("/admin/orders/{$order->id}/cancel");

        $this->assertEquals($stockBefore + 2, $product->fresh()->stock);
    }

    public function test_delivered_order_cannot_be_cancelled()
    {
        [$order] = $this->createOrderWithProduct(['status' => 'delivered']);
        $admin   = $this->admin();

        $this->actingAs($admin)->post("/admin/orders/{$order->id}/cancel");

        $this->assertEquals('delivered', $order->fresh()->status);
    }

    public function test_already_cancelled_order_cannot_be_cancelled_again()
    {
        [$order] = $this->createOrderWithProduct(['status' => 'cancelled']);
        $admin   = $this->admin();

        $this->actingAs($admin)->post("/admin/orders/{$order->id}/cancel");

        $this->assertEquals('cancelled', $order->fresh()->status);
    }

    public function test_cancellation_does_not_double_restore_stock_on_retry()
    {
        [$order, $product] = $this->createOrderWithProduct(['status' => 'cancelled'], 2);
        $stockBefore       = $product->stock;
        $admin             = $this->admin();

        $this->actingAs($admin)->post("/admin/orders/{$order->id}/cancel");

        // Stock must NOT have increased (already cancelled, so no reversion)
        $this->assertEquals($stockBefore, $product->fresh()->stock);
    }
}
