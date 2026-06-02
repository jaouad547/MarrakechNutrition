import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import ProductCard from '../../Components/ProductCard';

export default function Index({ products, categories, filters }) {
    return (
        <Layout>
            <Head title="Produits" />
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Produits</h1>
                    <form method="get" action={route('products.index')} className="flex items-center gap-2">
                        <input type="search" name="search" defaultValue={filters.search} placeholder="Rechercher" className="rounded-md border px-3 py-2" />
                        <button className="bg-gray-100 px-3 py-2 rounded-md">Rechercher</button>
                    </form>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-6">
                    {products.links.map((link, idx) => (
                        <span key={idx} className="mx-1" dangerouslySetInnerHTML={{ __html: link.label }} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
