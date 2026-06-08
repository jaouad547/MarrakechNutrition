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

            <div className="max-w-5xl mx-auto py-6 px-4">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Mon panier</h1>
                        <p className="text-gray-600">{itemCount} article{itemCount > 1 ? 's' : ''}</p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
                        <p className="text-lg font-semibold text-gray-900">Votre panier est vide.</p>
                        <p className="mt-2 text-gray-600">Ajoutez des produits depuis la page de détail.</p>
                        <Link
                            href={route('products.index')}
                            className="mt-4 inline-flex items-center justify-center rounded-md bg-green-600 px-5 py-3 text-white hover:bg-green-700 min-h-[44px]"
                        >
                            Voir les produits
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* ── Mobile cards (hidden on sm+) ─────────────────────── */}
                        <div className="sm:hidden space-y-4">
                            {items.map((item) => (
                                <MobileCartCard
                                    key={item.id}
                                    item={item}
                                    onUpdate={handleUpdate}
                                    onRemove={handleRemove}
                                    processing={processing}
                                    formatPrice={formatPrice}
                                />
                            ))}

                            <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Sous-total</span>
                                    <span className="font-semibold text-gray-900">{formatPrice(subtotal)} DH</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-900">
                                    <span>Total</span>
                                    <span className="text-lg">{formatPrice(total)} DH</span>
                                </div>
                                <Link
                                    href={route('checkout.index')}
                                    className="mt-2 w-full flex items-center justify-center rounded-md bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 min-h-[44px]"
                                >
                                    Passer à la livraison
                                </Link>
                            </div>
                        </div>

                        {/* ── Desktop table (hidden below sm) ──────────────────── */}
                        <div className="hidden sm:block overflow-hidden rounded-xl bg-white shadow-sm">
                            <div className="overflow-x-auto">
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
                            </div>

                            <div className="border-t border-gray-200 bg-gray-50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <div className="text-sm text-gray-500">Sous-total</div>
                                    <div className="text-2xl font-semibold text-gray-900">{formatPrice(subtotal)} DH</div>
                                </div>
                                <div className="space-y-3 sm:text-right">
                                    <div>
                                        <div className="text-sm text-gray-500">Total</div>
                                        <div className="text-2xl font-semibold text-gray-900">{formatPrice(total)} DH</div>
                                    </div>
                                    <Link
                                        href={route('checkout.index')}
                                        className="inline-flex items-center justify-center rounded-md bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 min-h-[44px]"
                                    >
                                        Passer à la livraison
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}

function MobileCartCard({ item, onUpdate, onRemove, processing, formatPrice }) {
    const [quantity, setQuantity] = React.useState(item.quantity);

    React.useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex gap-3 mb-3">
                {/* Product image */}
                <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    {item.image ? (
                        <img
                            src={`/storage/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs text-center leading-tight p-1">
                            Pas d'image
                        </div>
                    )}
                </div>
                {/* Name + category */}
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm font-semibold text-gray-700 mt-0.5">
                        {formatPrice(item.price)} DH / u
                    </p>
                </div>
            </div>

            {/* Qty + remove row */}
            <div className="flex items-center justify-between gap-3">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onUpdate(item, Number(quantity));
                    }}
                    className="flex items-center gap-2"
                >
                    <label className="sr-only">Quantité</label>
                    <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-16 rounded-md border border-gray-300 px-2 py-2 text-sm text-center min-h-[44px]"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 min-h-[44px]"
                    >
                        Mettre à jour
                    </button>
                </form>

                <div className="text-right">
                    <p className="text-xs text-gray-500">Total ligne</p>
                    <p className="font-bold text-gray-900">{formatPrice(item.line_total)} DH</p>
                </div>
            </div>

            <div className="mt-3 flex justify-end">
                <button
                    type="button"
                    onClick={() => onRemove(item)}
                    disabled={processing}
                    className="flex items-center gap-1 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50 min-h-[44px]"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer
                </button>
            </div>
        </div>
    );
}
