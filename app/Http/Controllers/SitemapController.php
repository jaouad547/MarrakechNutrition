<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;

class SitemapController extends Controller
{
    public function index()
    {
        $products = Product::where('is_active', true)
            ->orderBy('updated_at', 'desc')
            ->get(['slug', 'updated_at']);

        $categories = Category::orderBy('name')
            ->get(['slug', 'updated_at']);

        return response()
            ->view('sitemap', compact('products', 'categories'))
            ->header('Content-Type', 'application/xml; charset=utf-8');
    }
}
