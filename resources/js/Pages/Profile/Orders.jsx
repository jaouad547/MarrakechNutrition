import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { useTranslation } from '../../Contexts/LanguageContext';

export default function Orders({ orders }) {
    const { t } = useTranslation();
    const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',');

    return (
        <Layout>
            <Head title={t('Mes commandes')} />

            <div className="max-w-5xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-900">{t('Mes commandes')}</h1>
                {orders.length === 0 ? (
                    <p className="mt-4 text-gray-600">{t("Vous n'avez pas encore passé de commande.")}</p>
                ) : (
                    <div className="mt-6 space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="rounded-xl bg-white p-4 shadow-sm flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{order.order_number}</p>
                                    <p className="text-sm text-gray-600">{t('Le {{date}}', { date: order.created_at })} — {order.status}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">{formatPrice(order.total)} DH</p>
                                    <Link href={route('order.confirmation', order.id)} className="text-sm text-red-600">{t('Voir')}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
