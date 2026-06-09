<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminProductTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    private function client(): User
    {
        return User::factory()->create(['role' => 'client']);
    }

    // ── Access control ──────────────────────────────────────────────────

    public function test_guest_cannot_access_admin_products()
    {
        $response = $this->get('/admin/products');

        $response->assertRedirect('/login');
    }

    public function test_client_cannot_access_admin_products()
    {
        $response = $this->actingAs($this->client())->get('/admin/products');

        $response->assertRedirect('/');
    }

    public function test_admin_can_access_products_list()
    {
        $response = $this->actingAs($this->admin())->get('/admin/products');

        $response->assertStatus(200);
    }

    public function test_admin_can_access_create_product_page()
    {
        $response = $this->actingAs($this->admin())->get('/admin/products/create');

        $response->assertStatus(200);
    }

    // ── CRUD ─────────────────────────────────────────────────────────────

    public function test_admin_can_create_product()
    {
        Storage::fake('public');

        $category = Category::factory()->create();
        $admin    = $this->admin();

        $response = $this->actingAs($admin)->post('/admin/products', [
            'name'        => 'Whey Protein Vanille',
            'description' => 'Protéine de haute qualité',
            'price'       => 349.00,
            'stock'       => 20,
            'category_id' => $category->id,
            'is_active'   => true,
        ]);

        $response->assertRedirect(route('admin.products.index'));
        $this->assertDatabaseHas('products', [
            'name'  => 'Whey Protein Vanille',
            'price' => 349.00,
        ]);
    }

    public function test_admin_can_create_product_with_image()
    {
        Storage::fake('public');

        $category = Category::factory()->create();
        $admin    = $this->admin();
        $image    = UploadedFile::fake()->image('product.jpg', 400, 400);

        $this->actingAs($admin)->post('/admin/products', [
            'name'        => 'Créatine Monohydrate',
            'price'       => 199.00,
            'stock'       => 15,
            'category_id' => $category->id,
            'is_active'   => true,
            'image'       => $image,
        ]);

        $product = Product::where('name', 'Créatine Monohydrate')->first();
        $this->assertNotNull($product->image);
        Storage::disk('public')->assertExists($product->image);
    }

    public function test_admin_can_edit_product()
    {
        $product = Product::factory()->create(['name' => 'Ancien Nom']);
        $admin   = $this->admin();

        // Routes use slug-based binding (Product::getRouteKeyName() returns 'slug')
        $response = $this->actingAs($admin)->get("/admin/products/{$product->slug}/edit");

        $response->assertStatus(200);
    }

    public function test_admin_can_update_product()
    {
        Storage::fake('public');

        $product  = Product::factory()->create(['price' => 100.00]);
        $category = $product->category;
        $admin    = $this->admin();

        $response = $this->actingAs($admin)->put("/admin/products/{$product->slug}", [
            'name'        => 'Nouveau Nom',
            'description' => 'Nouvelle description',
            'price'       => 250.00,
            'stock'       => 30,
            'category_id' => $category->id,
            'is_active'   => true,
        ]);

        $response->assertRedirect(route('admin.products.index'));
        $this->assertDatabaseHas('products', [
            'id'    => $product->id,
            'name'  => 'Nouveau Nom',
            'price' => 250.00,
        ]);
    }

    public function test_admin_can_delete_product()
    {
        Storage::fake('public');

        $product = Product::factory()->create();
        $admin   = $this->admin();

        $response = $this->actingAs($admin)->delete("/admin/products/{$product->slug}");

        $response->assertRedirect(route('admin.products.index'));
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    public function test_admin_can_toggle_product_active_status()
    {
        $product = Product::factory()->create(['is_active' => true]);
        $admin   = $this->admin();

        $this->actingAs($admin)->patch("/admin/products/{$product->slug}/toggle");

        $this->assertFalse($product->fresh()->is_active);

        $this->actingAs($admin)->patch("/admin/products/{$product->slug}/toggle");

        $this->assertTrue($product->fresh()->is_active);
    }

    public function test_admin_can_update_product_stock()
    {
        $product = Product::factory()->create(['stock' => 10]);
        $admin   = $this->admin();

        $response = $this->actingAs($admin)->patch("/admin/products/{$product->slug}/stock", [
            'stock' => 50,
        ]);

        $response->assertRedirect();
        $this->assertEquals(50, $product->fresh()->stock);
    }

    public function test_product_creation_requires_required_fields()
    {
        $response = $this->actingAs($this->admin())->post('/admin/products', []);

        $response->assertSessionHasErrors(['name', 'price', 'stock', 'category_id']);
    }
}
