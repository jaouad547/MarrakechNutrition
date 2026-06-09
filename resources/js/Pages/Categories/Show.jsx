import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import Breadcrumb from '../../Components/Breadcrumb';

export default function Show({ category }) {
    const { appUrl } = usePage().props;
    const canonicalUrl = `${appUrl}/categories/${category.slug}`;

    const metaDescription = category.description
        ? category.description.slice(0, 160)
        : `Découvrez nos produits de la catégorie ${category.name} à Marrakech. Compléments alimentaires et nutrition sportive livrés à domicile.`;

    const formatPrice = (price) =>
        Number(price)
            .toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            .replace(/ /g, ' ');

    return (
        <Layout>
            <Head title={category.name}>
                <meta head-key="description" name="description" content={metaDescription} />
                <meta head-key="robots" name="robots" content="index, follow" />
                <link head-key="canonical" rel="canonical" href={canonicalUrl} />
                <meta head-key="og:title" property="og:title" content={`${category.name} — MarrakechNutrition`} />
                <meta head-key="og:description" property="og:description" content={metaDescription} />
                <meta head-key="og:type" property="og:type" content="website" />
                <meta head-key="og:url" property="og:url" content={canonicalUrl} />
            </Head>

            <div className="max-w-6xl mx-auto py-8 px-4">
                <Breadcrumb
                    items={[
                        { label: 'Accueil', href: route('home') },
                        { label: 'Produits', href: route('products.index') },
                        { label: category.name },
                    ]}
                />

                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
                    {category.description && (
                        <p className="text-gray-600 mt-2">{category.description}</p>
                    )}
                </header>

                {category.products.length === 0 ? (
                    <div className="rounded-lg border border-gray-200 bg-white p-6">
                        <p className="text-gray-700">
                            Aucun produit actif n'est disponible dans cette catégorie pour le moment.
                        </p>
                        <Link
                            href={route('products.index')}
                            className="mt-4 inline-block text-green-600 hover:text-green-700"
                        >
                            Voir tous les produits
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {category.products.map((product) => (
                            <article
                                key={product.id}
                                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                                itemScope
                                itemType="https://schema.org/Product"
                            >
                                <Link href={route('products.show', product.slug)}>
                                    <div className="h-40 w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                                        {product.image ? (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={`${product.name} — ${category.name}`}
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                                itemProp="image"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-gray-400">
                                                Image indisponible
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                <h2 className="text-lg font-semibold text-gray-900" itemProp="name">
                                    <Link
                                        href={route('products.show', product.slug)}
                                        className="hover:text-green-600"
                                    >
                                        {product.name}
                                    </Link>
                                </h2>

                                {product.description && (
                                    <p className="mt-2 text-sm text-gray-600 line-clamp-2" itemProp="description">
                                        {product.description}
                                    </p>
                                )}

                                <div
                                    className="mt-4 flex items-center justify-between"
                                    itemProp="offers"
                                    itemScope
                                    itemType="https://schema.org/Offer"
                                >
                                    <meta itemProp="priceCurrency" content="MAD" />
                                    <span className="font-bold text-gray-900" itemProp="price" content={product.price}>
                                        {formatPrice(product.price)} DH
                                    </span>
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                                            product.stock > 0
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                        }`}
                                    >
                                        {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
