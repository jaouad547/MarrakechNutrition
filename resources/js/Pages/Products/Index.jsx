import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import ProductCard from '../../Components/ProductCard';
import Breadcrumb from '../../Components/Breadcrumb';

export default function Index({ products, categories, filters }) {
    const { appUrl } = usePage().props;
    const canonicalUrl = `${appUrl}/products`;

    const metaDescription = filters.search
        ? `Résultats pour "${filters.search}" — Compléments alimentaires et produits de nutrition à Marrakech.`
        : 'Découvrez notre catalogue de produits de nutrition, compléments alimentaires et suppléments sportifs à Marrakech. Livraison à domicile.';

    return (
        <Layout>
            <Head title="Catalogue produits">
                <meta head-key="description" name="description" content={metaDescription} />
                <meta head-key="robots" name="robots" content="index, follow" />
                <link head-key="canonical" rel="canonical" href={canonicalUrl} />
                <meta head-key="og:title" property="og:title" content="Catalogue produits — MarrakechNutrition" />
                <meta head-key="og:description" property="og:description" content={metaDescription} />
                <meta head-key="og:type" property="og:type" content="website" />
                <meta head-key="og:url" property="og:url" content={canonicalUrl} />
            </Head>

            <div className="max-w-7xl mx-auto py-8 px-4">
                <Breadcrumb
                    items={[
                        { label: 'Accueil', href: route('home') },
                        { label: 'Produits' },
                    ]}
                />

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold">Produits</h1>
                    <form method="get" action={route('products.index')} className="flex items-center gap-2">
                        <input
                            type="search"
                            name="search"
                            defaultValue={filters.search}
                            placeholder="Rechercher un produit"
                            className="rounded-md border px-3 py-2 w-full sm:w-auto min-h-[44px] text-sm"
                        />
                        <button className="bg-gray-100 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 min-h-[44px] shrink-0">
                            Rechercher
                        </button>
                    </form>
                </div>

                {products.data.length === 0 ? (
                    <p className="text-gray-600 py-8 text-center">Aucun produit trouvé.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.data.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {products.last_page > 1 && (
                    <nav aria-label="Pagination" className="mt-6 flex gap-1">
                        {products.links.map((link, idx) =>
                            link.url ? (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    className={`inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm min-h-[36px] ${
                                        link.active
                                            ? 'bg-green-600 border-green-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    key={idx}
                                    className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-sm text-gray-400 min-h-[36px]"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ),
                        )}
                    </nav>
                )}
            </div>
        </Layout>
    );
}
