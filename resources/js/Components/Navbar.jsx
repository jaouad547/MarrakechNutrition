import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '../Contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const CATEGORY_ICON_PATHS = {
    proteines: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
    vitamines:
        'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    bio: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z',
    'pre-workout': 'M13 10V3L4 14h7v7l9-11h-7z',
    accessoires:
        'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z',
};

const DEFAULT_ICON_PATH =
    'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M6 6h.008v.008H6V6z';

function CategoryIcon({ slug, className }) {
    const path = CATEGORY_ICON_PATHS[slug] || DEFAULT_ICON_PATH;

    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={path} />
        </svg>
    );
}

export default function Navbar() {
    const { auth, categories, cart } = usePage().props;
    const { t } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className="relative z-30 bg-zinc-900 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                href="/"
                                className="flex items-center text-xl font-bold text-white shrink-0"
                                onClick={closeMenu}
                            >
                                <svg
                                    className="w-7 h-7 text-red-500 shrink-0 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2 12h2M4 8v8M6 6v12M9 10v4M9 12h6M15 10v4M18 6v12M20 8v8M22 12h-2"
                                    />
                                </svg>
                                Marrakech<span className="text-red-500">Nutrition</span>
                            </Link>
                        </div>

                        {/* Desktop nav links */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                href={route('cart.index')}
                                className="relative flex items-center min-h-[44px] text-gray-300 hover:text-white px-2 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="ml-1">{t('Panier')}</span>
                                {cart?.count > 0 && (
                                    <span className="absolute -right-1 -top-0 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-semibold text-white">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>

                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('profile.dashboard')}
                                        className="min-h-[44px] flex items-center text-gray-300 hover:text-white px-2 transition-colors"
                                    >
                                        {t('Mon compte')}
                                    </Link>
                                    {auth.user.role === 'admin' && (
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="min-h-[44px] flex items-center text-gray-300 hover:text-white px-2 transition-colors"
                                        >
                                            Admin
                                        </Link>
                                    )}
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="min-h-[44px] flex items-center text-gray-300 hover:text-white px-2 transition-colors"
                                    >
                                        {t('Déconnexion')}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="min-h-[44px] flex items-center text-gray-300 hover:text-white px-2 transition-colors"
                                    >
                                        {t('Connexion')}
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="min-h-[44px] flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors"
                                    >
                                        {t('Inscription')}
                                    </Link>
                                </>
                            )}
                            <LanguageSwitcher className="ml-2" />
                        </div>

                        {/* Mobile: cart icon + hamburger */}
                        <div className="flex items-center gap-1 md:hidden">
                            <Link
                                href={route('cart.index')}
                                className="relative flex items-center justify-center w-11 h-11 text-gray-300 hover:text-white"
                                onClick={closeMenu}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cart?.count > 0 && (
                                    <span className="absolute right-0.5 top-0.5 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>

                            <button
                                type="button"
                                onClick={toggleMenu}
                                className="flex items-center justify-center w-11 h-11 text-gray-300 hover:text-white focus:outline-none"
                                aria-label={menuOpen ? t('Fermer le menu') : t('Ouvrir le menu')}
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
                    <div className="md:hidden border-t border-zinc-800 bg-zinc-900 shadow-lg">
                        <div className="px-4 py-2 space-y-1">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('profile.dashboard')}
                                        onClick={closeMenu}
                                        className="flex items-center min-h-[44px] px-2 text-gray-200 hover:text-red-400 font-medium transition-colors"
                                    >
                                        {t('Mon compte')}
                                    </Link>
                                    {auth.user.role === 'admin' && (
                                        <Link
                                            href={route('admin.dashboard')}
                                            onClick={closeMenu}
                                            className="flex items-center min-h-[44px] px-2 text-gray-200 hover:text-red-400 font-medium transition-colors"
                                        >
                                            {t('Panneau Admin')}
                                        </Link>
                                    )}
                                    <div className="flex items-center min-h-[44px] px-2 text-sm text-gray-400">
                                        {t('Connecté : {{name}}', { name: auth.user.name })}
                                    </div>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        onClick={closeMenu}
                                        className="flex items-center w-full min-h-[44px] px-2 text-red-400 hover:text-red-300 font-medium transition-colors"
                                    >
                                        {t('Déconnexion')}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        onClick={closeMenu}
                                        className="flex items-center min-h-[44px] px-2 text-gray-200 hover:text-red-400 font-medium transition-colors"
                                    >
                                        {t('Connexion')}
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        onClick={closeMenu}
                                        className="flex items-center min-h-[44px] px-2 text-red-500 hover:text-red-400 font-semibold transition-colors"
                                    >
                                        {t('Inscription')}
                                    </Link>
                                </>
                            )}
                            <div className="flex items-center min-h-[44px] px-2 pt-1">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Mega-menu bar (desktop) */}
            <div className="hidden md:block relative z-20 bg-zinc-800 border-b border-zinc-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex">
                        {categories.map((category) => (
                            <div key={category.id} className="group relative">
                                <Link
                                    href={route('categories.show', category.slug)}
                                    className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-gray-200 hover:bg-zinc-700 hover:text-white transition-colors"
                                >
                                    <CategoryIcon slug={category.slug} className="w-4 h-4 shrink-0" />
                                    {category.name}
                                    <svg
                                        className="w-3 h-3 text-gray-400 transition-transform group-hover:rotate-180"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Link>

                                {/* Dropdown panel */}
                                <div className="invisible absolute left-0 top-full z-40 w-72 origin-top-left scale-95 rounded-b-lg border-t-2 border-red-600 bg-white text-gray-900 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
                                    <div className="p-4">
                                        <div className="mb-3 flex items-center gap-2">
                                            <CategoryIcon slug={category.slug} className="h-5 w-5 text-red-600" />
                                            <span className="font-semibold">{category.name}</span>
                                        </div>
                                        <Link
                                            href={route('categories.show', category.slug)}
                                            className="mb-3 block text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                                        >
                                            {t('Voir tous les produits →')}
                                        </Link>
                                        <div className="border-t border-gray-100 pt-3">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                {t('Filtrer par prix')}
                                            </p>
                                            <ul className="space-y-1 text-sm">
                                                <li>
                                                    <Link
                                                        href={route('products.index', { category: category.id, max: 100 })}
                                                        className="block rounded px-2 py-1.5 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                    >
                                                        {t('Moins de 100 DH')}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route('products.index', { category: category.id, min: 100, max: 300 })}
                                                        className="block rounded px-2 py-1.5 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                    >
                                                        100 – 300 DH
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href={route('products.index', { category: category.id, min: 300 })}
                                                        className="block rounded px-2 py-1.5 hover:bg-red-50 hover:text-red-700 transition-colors"
                                                    >
                                                        {t('Plus de 300 DH')}
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Category bar — horizontal scroll on mobile */}
            <div className="md:hidden bg-zinc-800 border-b border-zinc-700 overflow-x-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 py-3 text-sm whitespace-nowrap">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('categories.show', category.slug)}
                                className="shrink-0 rounded-full border border-zinc-600 bg-zinc-900 text-gray-200 px-3 py-1.5 hover:border-red-500 hover:text-white min-h-[36px] flex items-center transition-colors"
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
