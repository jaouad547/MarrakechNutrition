import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '../../../Components/Layout';

export default function Index() {
    const { products, filters } = usePage().props;

    return (
        <Layout>
            <Head title="Produits" />
            <div className="max-w-6xl mx-auto py-8">
                <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
                        <p className="text-gray-600">Gérez les produits disponibles en boutique.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <form method="get" action={route('admin.products.index')} className="flex items-center gap-2">
                            <input
                                type="search"
                                name="search"
                                defaultValue={filters.search}
                                placeholder="Rechercher un produit"
                                className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                            >
                                Rechercher
                            </button>
                        </form>
                        <Link
                            href={route('admin.products.create')}
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Nouveau produit
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Catégorie</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Prix</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {products.data.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-4 text-sm text-gray-900">{product.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500">{product.category}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{Number(product.price).toFixed(2).replace('.', ',')} DH</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{product.stock}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">
                                        {product.is_active ? 'Actif' : 'Inactif'}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-900 space-x-2">
                                        <Link
                                            href={route('admin.products.edit', product.id)}
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            Modifier
                                        </Link>
                                        <Link
                                            href={route('admin.products.destroy', product.id)}
                                            method="delete"
                                            as="button"
                                            onClick={(event) => {
                                                if (!window.confirm(`Supprimer le produit « ${product.name} » ?`)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Supprimer
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.links.length > 0 && (
                    <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                        <div>
                            Affichage de {products.from} à {products.to} sur {products.total} produits
                        </div>
                        <nav className="inline-flex items-center gap-1">
                            {products.links.map((link, index) => (
                                <span key={index}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            className={`inline-flex items-center justify-center rounded-md border px-3 py-1 ${link.active ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-gray-400" dangerouslySetInnerHTML={{ __html: link.label }} />
                                    )}
                                </span>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </Layout>
    );
}
