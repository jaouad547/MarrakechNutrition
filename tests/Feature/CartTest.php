<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    private function makeProduct(array $attrs = []): Product
    {
        return Product::factory()->create(array_merge([
            'price'     => 120.00,
            'stock'     => 10,
            'is_active' => true,
        ], $attrs));
    }

    private function cartSession(Product $product, int $quantity = 2): array
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

    public function test_user_can_add_product_to_cart()
    {
        $product = $this->makeProduct();

        $response = $this->post("/cart/{$product->slug}", ['quantity' => 2]);

        $response->assertRedirect();
        $response->assertSessionHas('status', 'Produit ajouté au panier.');
    }

    public function test_cart_session_contains_item_after_add()
    {
        $product = $this->makeProduct(['stock' => 10]);

        $this->post("/cart/{$product->slug}", ['quantity' => 3]);

        $this->assertTrue(
            session()->has("cart.items.{$product->id}"),
            'Le panier doit contenir le produit ajouté.'
        );
        $this->assertEquals(3, session("cart.items.{$product->id}.quantity"));
    }

    public function test_adding_same_product_twice_accumulates_quantity()
    {
        $product = $this->makeProduct(['stock' => 10]);

        $this->post("/cart/{$product->slug}", ['quantity' => 2]);
        $this->post("/cart/{$product->slug}", ['quantity' => 3]);

        $this->assertEquals(5, session("cart.items.{$product->id}.quantity"));
    }

    public function test_user_can_update_cart_quantity()
    {
        $product  = $this->makeProduct(['stock' => 10]);
        $response = $this->withSession($this->cartSession($product, 2))
            ->put("/cart/{$product->slug}", ['quantity' => 5]);

        $response->assertRedirect();
        $response->assertSessionHas('status', 'Quantité mise à jour.');
    }

    public function test_user_can_remove_item_from_cart()
    {
        $product  = $this->makeProduct();
        $response = $this->withSession($this->cartSession($product))
            ->delete("/cart/{$product->slug}");

        $response->assertRedirect();
        $response->assertSessionHas('status', 'Produit retiré du panier.');
    }

    public function test_cannot_add_inactive_product_to_cart()
    {
        $product  = $this->makeProduct(['is_active' => false]);
        $response = $this->post("/cart/{$product->slug}", ['quantity' => 1]);

        $response->assertRedirect();
        $response->assertSessionHas('status', "Ce produit n\u{2019}est pas disponible.");
    }

    public function test_cannot_add_out_of_stock_product_to_cart()
    {
        $product  = $this->makeProduct(['stock' => 0]);
        $response = $this->post("/cart/{$product->slug}", ['quantity' => 1]);

        $response->assertRedirect();
        $response->assertSessionHas('status', 'Ce produit est en rupture de stock.');
    }

    public function test_cannot_add_quantity_exceeding_stock()
    {
        $product  = $this->makeProduct(['stock' => 3]);
        $response = $this->post("/cart/{$product->slug}", ['quantity' => 10]);

        $response->assertSessionHasErrors('quantity');
    }

    public function test_cart_index_is_accessible()
    {
        $response = $this->get('/cart');

        $response->assertStatus(200);
    }
}
