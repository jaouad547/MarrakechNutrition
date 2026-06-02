<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $category = $request->input('category');
        $min = $request->input('min');
        $max = $request->input('max');

        $products = Product::with('category')
            ->where('is_active', true)
            ->when($search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->when($category, fn ($q, $c) => $q->where('category_id', $c))
            ->when($min, fn ($q, $m) => $q->where('price', '>=', $m))
            ->when($max, fn ($q, $m) => $q->where('price', '<=', $m))
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products->through(fn (Product $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'image' => $p->image,
                'category' => $p->category?->name,
                'category_slug' => $p->category?->slug,
                'stock' => $p->stock,
            ]),
            'filters' => [
                'search' => $search,
                'category' => $category,
                'min' => $min,
                'max' => $max,
            ],
            'categories' => Category::orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function show(Product $product)
    {
        if (! $product->is_active) {
            abort(404);
        }

        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'image' => $product->image,
                'category' => $product->category?->name,
                'category_slug' => $product->category?->slug,
            ],
            'related' => $related->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'image' => $p->image,
            ]),
        ]);
    }
}
