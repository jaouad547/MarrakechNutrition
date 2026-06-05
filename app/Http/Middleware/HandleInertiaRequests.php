<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $categories = [];

        if (Schema::hasTable('categories')) {
            $categories = Category::query()
                ->whereHas('products', fn ($query) => $query->where('is_active', true))
                ->withCount(['products' => fn ($query) => $query->where('is_active', true)])
                ->orderBy('name')
                ->get(['id', 'name', 'slug'])
                ->map(fn ($category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'products_count' => $category->products_count,
                ])
                ->values()
                ->all();
        }

        $cartItems = $request->session()->get('cart.items', []);

        if ($request->user()) {
            $cartService = app(CartService::class);
            $cartItems = $cartService->syncSessionCartFromDatabase($request->user(), $request);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'categories' => $categories,
            'cart' => [
                'items' => fn () => $cartItems,
                'count' => fn () => array_sum(array_column($cartItems, 'quantity')),
            ],
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
            ],
        ];
    }
}
