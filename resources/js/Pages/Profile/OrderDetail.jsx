import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import OrderStatusBadge from '../../Components/OrderStatusBadge';
import { useTranslation } from '../../Contexts/LanguageContext';

export default function OrderDetail({ order }) {
    const { t } = useTranslation();
    const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',');

    return (
        <Layout>
            <Head title={t('Commande {{number}}', { number: order.order_number })} />

            <div className="max-w-5xl mx-auto py-8 px-4">
                {/* Navigation Breadcrumbs / Back button */}
                <div className="mb-6">
                    <Link
                        href={route('profile.orders')}
                        className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition"
                    >
                        &larr; {t('Retour à mes commandes')}
                    </Link>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6 mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {t('Commande {{number}}', { number: order.order_number })}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {t('Passée le {{date}}', { date: order.created_at })}
                        </p>
                    </div>
                    <div>
                        <OrderStatusBadge status={order.status} />
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left: Order Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">{t('Articles commandés')}</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-6 flex items-center gap-4 hover:bg-gray-50/50 transition">
                                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                                            {item.image ? (
                                                <img 
                                                    src={`/storage/${item.image}`} 
                                                    alt={item.name} 
                                                    className="h-full w-full object-cover" 
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-[10px] text-gray-400 font-medium">
                                                    {t('Aucune')}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                {formatPrice(item.price)} DH &times; {item.quantity}
                                            </p>
                                        </div>

                                        <div className="text-sm font-bold text-gray-900">
                                            {formatPrice(item.line_total)} DH
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Order metadata (Delivery & Payment info) */}
                    <div className="space-y-6">
                        {/* Delivery Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-md font-bold text-gray-900 mb-4 pb-2 border-b">
                                {t('Informations de livraison')}
                            </h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <div>
                                    <span className="block text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                        {t('Destinataire')}
                                    </span>
                                    <span className="font-semibold text-gray-800">{order.customer_name}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                        {t('Téléphone')}
                                    </span>
                                    <span className="text-gray-800">{order.phone}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold uppercase text-gray-400 tracking-wider">
                                        {t('Adresse')}
                                    </span>
                                    <span className="text-gray-800 block whitespace-pre-line">{order.delivery_address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment summary Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-md font-bold text-gray-900 mb-4 pb-2 border-b">
                                {t('Résumé de paiement')}
                            </h3>
                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">{t('Mode de paiement')}</span>
                                    <span className="font-semibold text-gray-800">{order.payment_method}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">{t('Statut')}</span>
                                    <span className="font-semibold text-gray-800">
                                        <OrderStatusBadge status={order.status} />
                                    </span>
                                </div>
                                <div className="pt-3 border-t flex justify-between items-center text-base font-bold text-gray-900">
                                    <span>{t('Total payé')}</span>
                                    <span className="text-red-600">{formatPrice(order.total)} DH</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
