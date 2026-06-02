<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'phone' => '0600000000',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        // Create a test client user
        User::factory()->create([
            'name' => 'Test Client',
            'email' => 'client@example.com',
            'phone' => '0611111111',
            'role' => 'client',
            'password' => bcrypt('password'),
        ]);

        // Specific categories mentioned in PRD
        $categoryNames = [
            'Protéines',
            'Vitamines',
            'Bio',
            'Accessoires',
            'Pré-workout'
        ];

        $categories = collect();
        foreach ($categoryNames as $name) {
            $categories->push(Category::factory()->create([
                'name' => $name,
                'slug' => Str::slug($name),
            ]));
        }

        // Create 20 products attached to these categories
        foreach ($categories as $category) {
            Product::factory(4)->create([
                'category_id' => $category->id,
            ]);
        }
    }
}
