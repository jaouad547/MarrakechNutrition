<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index'])->name('sitemap');

Route::middleware('guest')->group(function () {
    Route::get('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);

    Route::get('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [\App\Http\Controllers\Auth\PasswordResetController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [\App\Http\Controllers\Auth\PasswordResetController::class, 'store'])->name('password.email');
});

Route::get('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show');

Route::get('products', [\App\Http\Controllers\ProductController::class, 'index'])->name('products.index');
Route::get('products/{product}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');

Route::get('cart', [\App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
Route::post('cart', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
Route::put('cart/{product}', [\App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
Route::delete('cart/{product}', [\App\Http\Controllers\CartController::class, 'destroy'])->name('cart.destroy');

Route::get('checkout', [\App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout.index');
Route::post('checkout', [\App\Http\Controllers\CheckoutController::class, 'store'])->name('checkout.store');
Route::get('commande/confirmation/{order}', [\App\Http\Controllers\OrderConfirmationController::class, 'show'])->name('order.confirmation');

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('categories', [\App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('categories.index');
    Route::get('categories/create', [\App\Http\Controllers\Admin\CategoryController::class, 'create'])->name('categories.create');
    Route::get('categories/{category}/edit', [\App\Http\Controllers\Admin\CategoryController::class, 'edit'])->name('categories.edit');
    Route::post('categories', [\App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('categories.store');
    Route::put('categories/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('categories.update');
    Route::delete('categories/{category}', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('products', [\App\Http\Controllers\Admin\ProductController::class, 'index'])->name('products.index');
    Route::get('products/create', [\App\Http\Controllers\Admin\ProductController::class, 'create'])->name('products.create');
    Route::get('products/{product}/edit', [\App\Http\Controllers\Admin\ProductController::class, 'edit'])->name('products.edit');
    Route::post('products', [\App\Http\Controllers\Admin\ProductController::class, 'store'])->name('products.store');
    Route::put('products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'update'])->name('products.update');
    Route::delete('products/{product}', [\App\Http\Controllers\Admin\ProductController::class, 'destroy'])->name('products.destroy');
    Route::patch('products/{product}/toggle', [\App\Http\Controllers\Admin\ProductController::class, 'toggleActive'])->name('products.toggle-active');
    Route::patch('products/{product}/stock', [\App\Http\Controllers\Admin\ProductController::class, 'updateStock'])->name('products.update-stock');

    Route::get('orders', [\App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [\App\Http\Controllers\Admin\OrderController::class, 'show'])->name('orders.show');
    Route::patch('orders/{order}/status', [\App\Http\Controllers\Admin\OrderController::class, 'updateStatus'])->name('orders.update-status');
    Route::post('orders/{order}/cancel', [\App\Http\Controllers\Admin\OrderController::class, 'cancel'])->name('orders.cancel');
});

Route::middleware('auth')->group(function () {
    // User profile routes
    Route::get('profile', [\App\Http\Controllers\Auth\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('profile', [\App\Http\Controllers\Auth\ProfileController::class, 'update'])->name('profile.update');
    Route::post('profile/password', [\App\Http\Controllers\Auth\ProfileController::class, 'updatePassword'])->name('profile.password');
    Route::post('logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Client area: dashboard and account routes
    Route::get('compte', [\App\Http\Controllers\ClientAreaController::class, 'dashboard'])->name('profile.dashboard');
    Route::get('compte/commandes', [\App\Http\Controllers\ClientAreaController::class, 'orders'])->name('profile.orders');
});
