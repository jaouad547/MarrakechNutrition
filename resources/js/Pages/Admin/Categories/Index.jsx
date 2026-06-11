import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '../../../Components/Layout';
import { useTranslation } from '../../../Contexts/LanguageContext';

export default function Index() {
    const { categories } = usePage().props;
    const { t } = useTranslation();

    return (
        <Layout>
            <Head title={t('Liste des catégories')} />
            <div className="max-w-6xl mx-auto py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{t('Catégories')}</h1>
                        <p className="text-gray-600">{t('Gérez les catégories produits et leurs descriptifs.')}</p>
                    </div>
                    <Link
                        href={route('admin.categories.create')}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        {t('Nouvelle catégorie')}
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('Nom')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('Produits actifs')}</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {categories.map(category => (
                                <tr key={category.id}>
                                    <td className="px-4 py-4 text-sm text-gray-900">{category.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-500">{category.slug}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{category.products_count}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900 space-x-2">
                                        <Link
                                            href={route('admin.categories.edit', category.id)}
                                            className="text-green-600 hover:text-green-700"
                                        >
                                            {t('Modifier')}
                                        </Link>
                                        <Link
                                            href={route('admin.categories.destroy', category.id)}
                                            method="delete"
                                            as="button"
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            {t('Supprimer')}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
