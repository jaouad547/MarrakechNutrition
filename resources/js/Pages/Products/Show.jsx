import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import ProductCard from '../../Components/ProductCard';
import Breadcrumb from '../../Components/Breadcrumb';
import { useTranslation } from '../../Contexts/LanguageContext';

export default function Show({ product, related }) {
    const { appUrl } = usePage().props;
    const { t } = useTranslation();
    const price = Number(product.price).toFixed(2).replace('.', ',');
    const { data, setData, post, processing, errors } = useForm({ quantity: 1 });

    const description = product.description
        ? product.description.slice(0, 160)
        : t('Achetez {{name}} en ligne à Marrakech. Livraison à domicile, paiement à la livraison.', { name: product.name });

    const imageUrl = product.image ? `${appUrl}/storage/${product.image}` : null;
    const canonicalUrl = `${appUrl}/products/${product.slug}`;

    const submit = (event) => {
        event.preventDefault();
        post(route('cart.store', product.slug), { preserveScroll: true });
    };

    return (
        <Layout>
            <Head title={product.name}>
                <meta head-key="description" name="description" content={description} />
                <meta head-key="robots" name="robots" content="index, follow" />
                <link head-key="canonical" rel="canonical" href={canonicalUrl} />

                {/* Open Graph */}
                <meta head-key="og:type" property="og:type" content="product" />
                <meta head-key="og:site_name" property="og:site_name" content="MarrakechNutrition" />
                <meta head-key="og:title" property="og:title" content={`${product.name} — MarrakechNutrition`} />
                <meta head-key="og:description" property="og:description" content={description} />
                <meta head-key="og:url" property="og:url" content={canonicalUrl} />
                {imageUrl && <meta head-key="og:image" property="og:image" content={imageUrl} />}
                <meta head-key="og:price:amount" property="product:price:amount" content={product.price} />
                <meta head-key="og:price:currency" property="product:price:currency" content="MAD" />

                {/* Twitter Card */}
                <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
                <meta head-key="twitter:title" name="twitter:title" content={`${product.name} — MarrakechNutrition`} />
                <meta head-key="twitter:description" name="twitter:description" content={description} />
                {imageUrl && <meta head-key="twitter:image" name="twitter:image" content={imageUrl} />}
            </Head>

            <div className="max-w-5xl mx-auto py-8 px-4">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: t('Accueil'), href: route('home') },
                        { label: t('Produits'), href: route('products.index') },
                        product.category_slug && {
                            label: product.category,
                            href: route('categories.show', product.category_slug),
                        },
                        { label: product.name },
                    ].filter(Boolean)}
                />

                {/* Product content */}
                <article itemScope itemType="https://schema.org/Product">
                    <meta itemProp="name" content={product.name} />
                    {product.description && <meta itemProp="description" content={product.description} />}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image */}
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-gray-100">
                            {product.image ? (
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={`${product.name} — MarrakechNutrition`}
                                    className="h-full w-full object-cover"
                                    loading="eager"
                                    itemProp="image"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    {t('Image non disponible')}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div>
                            {product.category && (
                                <div className="text-sm text-gray-500 mb-2" itemProp="category">
                                    {product.category_slug ? (
                                        <Link
                                            href={route('categories.show', product.category_slug)}
                                            className="hover:text-red-600"
                                        >
                                            {product.category}
                                        </Link>
                                    ) : (
                                        product.category
                                    )}
                                </div>
                            )}

                            <h1 className="text-2xl font-bold mb-3" itemProp="name">
                                {product.name}
                            </h1>

                            <div
                                itemProp="offers"
                                itemScope
                                itemType="https://schema.org/Offer"
                            >
                                <meta itemProp="priceCurrency" content="MAD" />
                                <meta itemProp="price" content={product.price} />
                                <meta
                                    itemProp="availability"
                                    content={
                                        product.stock > 0
                                            ? 'https://schema.org/InStock'
                                            : 'https://schema.org/OutOfStock'
                                    }
                                />

                                <p className="text-2xl font-bold text-gray-900 mb-3">{price} DH</p>

                                <div
                                    className={`mb-5 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                        product.stock > 0
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {product.stock > 0 ? t('En stock') : t('Rupture de stock')}
                                </div>
                            </div>

                            {product.description && (
                                <p className="text-gray-600 mb-6 leading-relaxed" itemProp="description">
                                    {product.description}
                                </p>
                            )}

                            <form
                                onSubmit={submit}
                                className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-3"
                            >
                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {t('Quantité')}
                                    </label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        max={product.stock}
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', Number(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-600 focus:ring-red-600"
                                    />
                                    {errors.quantity && (
                                        <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        type="submit"
                                        disabled={product.stock <= 0 || processing}
                                        className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50 min-h-[44px]"
                                    >
                                        {t('Ajouter au panier')}
                                    </button>
                                    {product.stock <= 0 && (
                                        <p className="text-sm text-red-600">
                                            {t('Ce produit est en rupture de stock.')}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </article>

                {/* Related products */}
                {related.length > 0 && (
                    <section className="mt-12" aria-label={t('Produits similaires')}>
                        <h2 className="text-xl font-semibold mb-4">{t('Produits similaires')}</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {related.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
}
