import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import ProductCard from '../Components/ProductCard';
import Carousel from '../Components/Carousel';
import { useTranslation } from '../Contexts/LanguageContext';

export default function Home({ featuredProducts, banners }) {
    const { appUrl } = usePage().props;
    const { t } = useTranslation();
    const canonicalUrl = `${appUrl}/`;
    const metaDescription = t('MarrakechNutrition — Compléments alimentaires et produits de nutrition sportive à Marrakech. Livraison à domicile, paiement à la livraison.');

    return (
        <Layout>
            <Head title={t('Accueil')}>
                <meta head-key="description" name="description" content={metaDescription} />
                <meta head-key="robots" name="robots" content="index, follow" />
                <link head-key="canonical" rel="canonical" href={canonicalUrl} />
                <meta head-key="og:title" property="og:title" content="MarrakechNutrition" />
                <meta head-key="og:description" property="og:description" content={metaDescription} />
                <meta head-key="og:type" property="og:type" content="website" />
                <meta head-key="og:url" property="og:url" content={canonicalUrl} />
            </Head>

            {banners.length > 0 && <Carousel slides={banners} />}

            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">{t('Produits populaires')}</h2>
                    <Link href={route('products.index')} className="text-red-600 hover:text-red-700 text-sm font-medium">
                        {t('Voir tout')}
                    </Link>
                </div>

                {featuredProducts.length === 0 ? (
                    <p className="text-gray-600 py-8 text-center">{t('Aucun produit disponible pour le moment.')}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </Layout>
    );
}
