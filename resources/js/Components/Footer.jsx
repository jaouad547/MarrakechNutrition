import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '../Contexts/LanguageContext';

export default function Footer() {
    const { auth, categories } = usePage().props;
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    return (
        <footer className="mt-12 bg-zinc-900 text-gray-300">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                <div>
                    <div className="mb-3 flex items-center text-xl font-bold text-white">
                        <svg
                            className="w-7 h-7 text-red-500 shrink-0"
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
                    </div>
                    <p className="mb-2 text-sm text-gray-400">
                        {t('Compléments alimentaires et produits de nutrition sportive, livrés à domicile à Marrakech.')}
                    </p>
                    <p className="text-sm text-gray-400">{t('Paiement à la livraison.')}</p>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('Liens')}</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href={route('home')} className="transition-colors hover:text-red-400">
                                {t('Accueil')}
                            </Link>
                        </li>
                        <li>
                            <Link href={route('products.index')} className="transition-colors hover:text-red-400">
                                {t('Tous les produits')}
                            </Link>
                        </li>
                        <li>
                            <Link href={route('cart.index')} className="transition-colors hover:text-red-400">
                                {t('Mon panier')}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('Catégories')}</h3>
                    <ul className="space-y-2 text-sm">
                        {categories.slice(0, 5).map((category) => (
                            <li key={category.id}>
                                <Link
                                    href={route('categories.show', category.slug)}
                                    className="transition-colors hover:text-red-400"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t('Mon compte')}</h3>
                    <ul className="space-y-2 text-sm">
                        {auth.user ? (
                            <>
                                <li>
                                    <Link href={route('profile.dashboard')} className="transition-colors hover:text-red-400">
                                        {t('Mon compte')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('profile.orders')} className="transition-colors hover:text-red-400">
                                        {t('Mes commandes')}
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href={route('login')} className="transition-colors hover:text-red-400">
                                        {t('Connexion')}
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('register')} className="transition-colors hover:text-red-400">
                                        {t('Inscription')}
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className="border-t border-zinc-800">
                <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-gray-500 sm:px-6 lg:px-8">
                    {t('© {{year}} MarrakechNutrition. Tous droits réservés.', { year })}
                </div>
            </div>
        </footer>
    );
}
