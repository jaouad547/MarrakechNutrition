import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth, categories, cart } = usePage().props;

    return (
        <>
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-green-600">
                                    MarrakechNutrition
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href={route('cart.index')} className="relative text-gray-500 hover:text-gray-700">
                                Panier
                                {cart?.count > 0 && (
                                    <span className="absolute -right-3 -top-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-green-600 px-2 text-xs font-semibold text-white">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>
                            {auth.user ? (
                                <>
                                    <Link href={route('profile.dashboard')} className="text-gray-500 hover:text-gray-700">
                                        Mon compte
                                    </Link>
                                    <span className="text-gray-700">Bonjour, {auth.user.name}</span>
                                    {auth.user.role === 'admin' && (
                                        <Link href={route('admin.categories.index')} className="text-gray-500 hover:text-gray-700">
                                            Admin catégories
                                        </Link>
                                    )}
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Se déconnecter
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-500 hover:text-gray-700">
                                        Connexion
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Inscription
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-2 py-3 text-sm text-gray-700">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('categories.show', category.slug)}
                                className="rounded-full border border-gray-200 bg-white px-3 py-1 hover:bg-green-50"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
