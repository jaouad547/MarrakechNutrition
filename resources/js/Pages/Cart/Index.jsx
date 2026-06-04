import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import CartItem from '../../Components/CartItem';

export default function Index({ items, subtotal, total, itemCount }) {
    const { processing, put, delete: destroy } = useForm();

    const handleUpdate = (item, quantity) => {
        put(route('cart.update', item.slug), {
            data: { quantity },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleRemove = (item) => {
        destroy(route('cart.destroy', item.slug), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',');

    return (
        <Layout>
            <Head title="Panier" />

            <div className="max-w-5xl mx-auto py-8 px-4">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Mon panier</h1>
                        <p className="text-gray-600">{itemCount} article{s(itemCount)}</p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
                        <p className="text-lg font-semibold text-gray-900">Votre panier est vide.</p>
                        <p className="mt-2 text-gray-600">Ajoutez des produits depuis la page de détail.</p>
                        <Link href={route('products.index')} className="mt-4 inline-flex rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                            Voir les produits
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Produit</th>
                                    <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wide text-gray-500">Prix unitaire</th>
                                    <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Quantité</th>
                                    <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wide text-gray-500">Total ligne</th>
                                    <th className="py-3 px-6 text-right text-xs font-medium uppercase tracking-wide text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {items.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdate={handleUpdate}
                                        onRemove={handleRemove}
                                        processing={processing}
                                    />
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-6 rounded-b-xl border-t border-gray-200 bg-gray-50 p-6 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <div className="text-sm text-gray-500">Sous-total</div>
                                <div className="text-2xl font-semibold text-gray-900">{formatPrice(subtotal)} DH</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Total</div>
                                <div className="text-2xl font-semibold text-gray-900">{formatPrice(total)} DH</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

function s(value) {
    return value > 1 ? 's' : '';
}
