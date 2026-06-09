<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CheckoutTest extends TestCase
{
    use RefreshDatabase;

    private function makeProduct(array $attrs = []): Product
    {
        return Product::factory()->create(array_merge([
            'price'     => 100.00,
            'stock'     => 10,
            'is_active' => true,
        ], $attrs));
    }

    private function cartSession(Product $product, int $quantity = 1): array
    {
        return [
            'cart.items' => [
                $product->id => [
                    'id'       => $product->id,
                    'slug'     => $product->slug,
                    'name'     => $product->name,
                    'image'    => null,
                    'category' => null,
                    'price'    => (float) $product->price,
                    'quantity' => $quantity,
                    'stock'    => $product->stock,
                ],
            ],
        ];
    }

    private function checkoutData(): array
    {
        return [
            'name'    => 'Ahmed Alami',
            'phone'   => '0600000000',
            'address' => '123 Rue de la Medina, Marrakech',
        ];
    }

    public function test_guest_can_place_order()
    {
        $product = $this->makeProduct(['price' => 200.00, 'stock' => 5]);

        $response = $this->withSession($this->cartSession($product, 2))
            ->post('/checkout', $this->checkoutData());

        $response->assertRedirect();
        $this->assertDatabaseCount('orders', 1);
    }

    public function test_authenticated_user_can_place_order()
    {
        $user    = User::factory()->create();
        $product = $this->makeProduct(['price' => 150.00, 'stock' => 10]);

        // Populate the DB cart so the middleware sync doesn't wipe the session cart
        $cart = Cart::create(['user_id' => $user->id]);
        CartItem::create([
            'cart_id'    => $cart->id,
            'product_id' => $product->id,
            'quantity'   => 2,
        ]);

        $response = $this->actingAs($user)
            ->post('/checkout', $this->checkoutData());

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', ['user_id' => $user->id]);
    }

    public function test_checkout_decrements_product_stock()
    {
        $product = $this->makeProduct(['price' => 150.00, 'stock' => 10]);

        $this->withSession($this->cartSession($product, 3))
            ->post('/checkout', $this->checkoutData());

        $this->assertEquals(7, $product->fresh()->stock);
    }

    public function test_order_number_follows_expected_format()
    {
        $product = $this->makeProduct(['stock' => 5]);

        $this->withSession($this->cartSession($product))
            ->post('/checkout', $this->checkoutData());

        $order = Order::first();
        $this->assertNotNull($order);
        $this->assertMatchesRegularExpression('/^ORD-\d{8}-\d{3}$/', $order->order_number);
    }

    public function test_two_orders_get_unique_order_numbers()
    {
        $productA = $this->makeProduct(['stock' => 5]);
        $productB = $this->makeProduct(['stock' => 5]);

        $this->withSession($this->cartSession($productA))
            ->post('/checkout', $this->checkoutData());

        $this->withSession($this->cartSession($productB))
            ->post('/checkout', array_merge($this->checkoutData(), ['name' => 'Fatima Zahra']));

        $numbers = Order::pluck('order_number')->toArray();
        $this->assertCount(2, array_unique($numbers));
    }

    public function test_checkout_creates_order_items()
    {
        $product = $this->makeProduct(['price' => 200.00, 'stock' => 5]);

        $this->withSession($this->cartSession($product, 2))
            ->post('/checkout', $this->checkoutData());

        $order = Order::first();
        $this->assertDatabaseHas('order_items', [
            'order_id'   => $order->id,
            'product_id' => $product->id,
            'quantity'   => 2,
        ]);
    }

    public function test_order_total_includes_delivery_fee()
    {
        $product = $this->makeProduct(['price' => 100.00, 'stock' => 5]);

        $this->withSession($this->cartSession($product, 2))
            ->post('/checkout', $this->checkoutData());

        $order = Order::first();
        // 2 × 100 + 20 delivery = 220
        $this->assertEquals(220.00, (float) $order->total);
    }

    public function test_checkout_clears_cart_after_order()
    {
        $product = $this->makeProduct(['stock' => 5]);

        $response = $this->withSession($this->cartSession($product))
            ->post('/checkout', $this->checkoutData());

        $response->assertSessionMissing('cart.items');
    }

    public function test_checkout_redirects_to_cart_when_cart_is_empty()
    {
        $response = $this->post('/checkout', $this->checkoutData());

        $response->assertRedirect(route('cart.index'));
    }

    public function test_checkout_requires_name_phone_and_address()
    {
        $product = $this->makeProduct(['stock' => 5]);

        $response = $this->withSession($this->cartSession($product))
            ->post('/checkout', []);

        $response->assertSessionHasErrors(['name', 'phone', 'address']);
    }

    public function test_checkout_sets_status_to_pending()
    {
        $product = $this->makeProduct(['stock' => 5]);

        $this->withSession($this->cartSession($product))
            ->post('/checkout', $this->checkoutData());

        $this->assertDatabaseHas('orders', [
            'status' => 'Pending payment on delivery',
        ]);
    }
}
