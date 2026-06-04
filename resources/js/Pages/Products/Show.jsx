import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import ProductCard from '../../Components/ProductCard';

export default function Show({ product, related }) {
    const price = Number(product.price).toFixed(2).replace('.', ',');
    const { data, setData, post, processing, errors } = useForm({
        quantity: 1,
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('cart.store', product.slug), {
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <Head title={product.name} />
            <div className="max-w-5xl mx-auto py-8 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                        {product.image ? (
                            <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-96 object-cover rounded-md" />
                        ) : (
                            <div className="w-full h-96 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">No image</div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                        <div className="text-gray-500 mb-4">{product.category}</div>
                        <div className="text-2xl font-bold mb-4">{price} DH</div>
                        <div className={`mb-4 inline-block px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
                        </div>

                        <div className="prose mb-6">{product.description}</div>

                        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-3">
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                    Quantité
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max={product.stock}
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', Number(e.target.value))}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                                />
                                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    type="submit"
                                    disabled={product.stock <= 0 || processing}
                                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                                >
                                    Ajouter au panier
                                </button>
                                {product.stock <= 0 && (
                                    <div className="text-sm text-red-600">Ce produit est en rupture de stock.</div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-semibold mb-4">Produits similaires</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {related.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
