<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->where('is_active', true)
            ->latest()
            ->limit(8)
            ->get();

        $banners = Banner::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'eyebrow', 'title', 'subtitle', 'image', 'cta_label', 'cta_link']);

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts->map(fn (Product $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'image' => $p->image,
                'category' => $p->category?->name,
                'stock' => $p->stock,
            ]),
            'banners' => $banners,
        ]);
    }
}
