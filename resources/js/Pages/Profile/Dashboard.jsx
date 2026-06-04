import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function Dashboard({ user, ordersCount, latestOrder }) {
    const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',');

    return (
        <Layout>
            <Head title="Espace client" />

            <div className="max-w-5xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-900">Bonjour{user?.name ? `, ${user.name}` : ''}</h1>
                <p className="mt-2 text-gray-600">Bienvenue dans votre espace client.</p>

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div className="col-span-2 rounded-xl bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900">Résumé du compte</h2>
                        <div className="mt-4 space-y-2 text-gray-700">
                            <div className="flex justify-between">
                                <span>Commandes passées</span>
                                <span className="font-semibold">{ordersCount}</span>
                            </div>
                            {latestOrder ? (
                                <div className="mt-4 rounded-lg border p-4 bg-gray-50">
                                    <p className="font-semibold">Dernière commande</p>
                                    <p className="text-sm">{latestOrder.order_number} — {latestOrder.status}</p>
                                    <p className="text-sm">Total: {formatPrice(latestOrder.total)} DH</p>
                                    <p className="text-sm">Le {latestOrder.created_at}</p>
                                </div>
                            ) : (
                                <p className="mt-4 text-sm text-gray-600">Aucune commande pour l'instant.</p>
                            )}
                        </div>
                    </div>

                    <aside className="space-y-3">
                        <Link href={route('profile.edit')} className="block rounded-md border border-gray-200 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50">
                            Modifier mon profil
                        </Link>
                        <Link href={route('cart.index')} className="block rounded-md border border-gray-200 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50">
                            Voir mon panier
                        </Link>
                    </aside>
                </div>
            </div>
        </Layout>
    );
}
