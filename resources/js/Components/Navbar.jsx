import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth, categories, cart } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className="bg-white shadow relative z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="text-xl font-bold text-green-600 shrink-0"
                                onClick={closeMenu}
                            >
                                MarrakechNutrition
                            </Link>
                        </div>

                        {/* Desktop nav links */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                href={route('cart.index')}
                                className="relative flex items-center min-h-[44px] text-gray-500 hover:text-gray-700 px-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="ml-1">Panier</span>
                                {cart?.count > 0 && (
                                    <span className="absolute -right-1 -top-0 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-green-600 px-1.5 text-xs font-semibold text-white">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>

                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('profile.dashboard')}
                                        className="min-h-[44px] flex items-center text-gray-500 hover:text-gray-700 px-2"
                                    >
                                        Mon compte
                                    </Link>
                                    {auth.user.role === 'admin' && (
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="min-h-[44px] flex items-center text-gray-500 hover:text-gray-700 px-2"
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="min-h-[44px] flex items-center text-gray-500 hover:text-gray-700 px-2"
                                    >
                                        Déconnexion
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="min-h-[44px] flex items-center text-gray-500 hover:text-gray-700 px-2"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="min-h-[44px] flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-medium rounded-md"
                                    >
                                        Inscription
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile: cart icon + hamburger */}
                        <div className="flex items-center gap-1 md:hidden">
                            <Link
                                href={route('cart.index')}
                                className="relative flex items-center justify-center w-11 h-11 text-gray-500 hover:text-gray-700"
                                onClick={closeMenu}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cart?.count > 0 && (
                                    <span className="absolute right-0.5 top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-bold text-white">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>

                            <button
                                type="button"
                                onClick={toggleMenu}
                                className="flex items-center justify-center w-11 h-11 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                                aria-expanded={menuOpen}
                            >
                                {menuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile dropdown menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
                        <div className="px-4 py-2 space-y-1">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('profile.dashboard')}
                                        onClick={closeMenu}
                                        className="flex items-center min-h-[44px] px-2 text-gray-700 hover:text-green-600 font-medium"
                                    >
                                        Mon compte
                                    </Link>
                                    {auth.user.role === 'admin' && (
                                        <Link
                                            href={route('admin.dashboard')}
                                            onClick={closeMenu}
                                            className="flex items-center min-h-[44px] px-2 text-gray-700 hover:text-green-600 font-medium"
                                        >
                                            Panneau Admin
                                        </Link>
                                    )}
                                    <div className="flex items-center min-h-[44px] px-2 text-sm text-gray-500">
                                        Connecté : {auth.user.name}
                                    </div>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        onClick={closeMenu}
                                        className="flex items-center w-full min-h-[44px] px-2 text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Déconnexion
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        onClick={closeMenu}
                                        className="flex items-center min-h-[44px] px-2 text-gray-700 hover:text-green-600 font-medium"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        onClick={closeMenu}
                                        className="flex items-center min-h-[44px] px-2 text-green-600 hover:text-green-700 font-semibold"
                                    >
                                        Inscription
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Category bar — horizontal scroll on mobile */}
            <div className="bg-gray-50 border-b border-gray-200 overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 py-3 text-sm text-gray-700 whitespace-nowrap">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('categories.show', category.slug)}
                                className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 hover:bg-green-50 min-h-[36px] flex items-center"
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
