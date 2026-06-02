import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';

export default function Show({ category }) {
    return (
        <Layout>
            <Head title={`Catégorie : ${category.name}`} />
            <div className="max-w-6xl mx-auto py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
                    {category.description && <p className="text-gray-600 mt-2">{category.description}</p>}
                </div>

                {category.products.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <p className="text-gray-700">Aucun produit actif n'est disponible dans cette catégorie pour le moment.</p>
                        <Link href={route('home')} className="mt-4 inline-block text-green-600 hover:text-green-700">
                            Retour à l'accueil
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-3">
                        {category.products.map((product) => (
                            <div key={product.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-gray-400">Image indisponible</div>
                                    )}
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                                <div className="mt-4 flex items-center justify-between text-gray-900">
                                    <span className="font-bold">{Number(product.price).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\u202F/g, ' ')} DH</span>
                                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
