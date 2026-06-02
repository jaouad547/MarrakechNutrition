<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);

    Route::get('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [\App\Http\Controllers\Auth\PasswordResetController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [\App\Http\Controllers\Auth\PasswordResetController::class, 'store'])->name('password.email');
});

Route::get('categories/{category}', [\App\Http\Controllers\CategoryController::class, 'show'])->name('categories.show');

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
});

Route::middleware('auth')->group(function () {
    // User profile routes
    Route::get('profile', [\App\Http\Controllers\Auth\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('profile', [\App\Http\Controllers\Auth\ProfileController::class, 'update'])->name('profile.update');
    Route::post('profile/password', [\App\Http\Controllers\Auth\ProfileController::class, 'updatePassword'])->name('profile.password');
    Route::post('logout', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
