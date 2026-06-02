import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import ProductCard from '../../Components/ProductCard';

export default function Show({ product, related }) {
    const price = Number(product.price).toFixed(2).replace('.', ',');

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

                        <button className="bg-green-600 text-white px-4 py-2 rounded-md">Ajouter au panier</button>
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
