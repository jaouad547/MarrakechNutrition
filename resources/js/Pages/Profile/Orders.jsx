import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import OrderStatusBadge from '../../Components/OrderStatusBadge';

export default function Orders({ orders }) {
    const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',');

    return (
        <Layout>
            <Head title="Mes commandes" />

            <div className="max-w-5xl mx-auto py-8 px-4">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('profile.dashboard')} className="text-sm text-green-600 hover:text-green-700">
                        &larr; Retour au tableau de bord
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-6">Historique des commandes</h1>

                {(!orders.data || orders.data.length === 0) ? (
                    <div className="rounded-xl bg-white p-8 shadow-sm text-center">
                        <p className="text-gray-600">Vous n'avez pas encore passé de commande.</p>
                        <Link href={route('products.index')} className="mt-4 inline-block bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition">
                            Découvrir nos produits
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">N° de commande</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Date</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Statut</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Total</th>
                                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {orders.data.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {order.order_number}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {order.created_at}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <OrderStatusBadge status={order.status} />
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                                                    {formatPrice(order.total)} DH
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                    <Link
                                                        href={route('profile.orders.show', order.id)}
                                                        className="inline-flex items-center text-green-600 hover:text-green-700"
                                                    >
                                                        Voir les détails
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        {orders.links && orders.links.length > 3 && (
                            <div className="flex items-center justify-between text-sm text-gray-600 px-2">
                                <div>
                                    Affichage de {orders.from} à {orders.to} sur {orders.total} commandes
                                </div>
                                <nav className="inline-flex items-center gap-1">
                                    {orders.links.map((link, index) => (
                                        <span key={index}>
                                            {link.url ? (
                                                <Link
                                                    href={link.url}
                                                    className={`inline-flex items-center justify-center rounded-md border px-3 py-1 ${link.active ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span 
                                                    className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-gray-400 cursor-not-allowed" 
                                                    dangerouslySetInnerHTML={{ __html: link.label }} 
                                                />
                                            )}
                                        </span>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
