import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Components/AdminLayout';
import OrderStatusBadge from '../../Components/OrderStatusBadge';
import { useTranslation } from '../../Contexts/LanguageContext';

export default function Dashboard({ stats, recentOrders, lowStockProducts }) {
    const { t } = useTranslation();
    const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',');

    const statCards = [
        {
            title: t('Chiffre d\'affaires'),
            value: `${formatPrice(stats.total_revenue)} DH`,
            icon: (
                <svg className="w-6 h-6 text-[#ceee93]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            borderClass: 'border-l-4 border-[#ceee93]',
        },
        {
            title: t('Total Commandes'),
            value: stats.total_orders,
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            borderClass: 'border-l-4 border-[#44483b]',
        },
        {
            title: t('Total Produits'),
            value: stats.total_products,
            icon: (
                <svg className="w-6 h-6 text-[#bec6e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            borderClass: 'border-l-4 border-[#2a3548]',
        },
        {
            title: t('Clients Actifs'),
            value: stats.total_users,
            icon: (
                <svg className="w-6 h-6 text-[#bec6e0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            borderClass: 'border-l-4 border-[#2a3548]',
        },
    ];

    return (
        <AdminLayout title={t("Vue d'ensemble")}>
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, idx) => (
                    <div key={idx} className={`bg-[#152031] border border-[#44483b]/20 p-6 flex flex-col justify-between rounded-none shadow-[0_0_15px_rgba(255,255,255,0.01)] relative overflow-hidden group hover:bg-[#1f2a3c] transition-all ${card.borderClass}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] text-[#c5c8b7] uppercase font-bold tracking-widest mb-1">{card.title}</p>
                                <h3 className="text-2xl font-black text-white font-serif tracking-tight mt-1">{card.value}</h3>
                            </div>
                            <div className="p-2 bg-[#2a3548]/30 border border-[#44483b]/10 rounded-none">
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders List (col-span-2) */}
                <div className="lg:col-span-2 bg-[#152031] border border-[#44483b]/20 rounded-none overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.01)] flex flex-col">
                    <div className="px-6 py-5 border-b border-[#44483b]/20 flex justify-between items-center">
                        <h4 className="text-md font-bold uppercase tracking-wider text-white font-serif">{t('Commandes Récentes')}</h4>
                        <Link href={route('admin.orders.index')} className="text-[10px] font-bold text-[#ceee93] uppercase hover:underline tracking-wider border border-[#ceee93]/20 px-3 py-1.5 rounded-none transition">
                            {t('Toutes les commandes')}
                        </Link>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        {recentOrders.length === 0 ? (
                            <div className="p-6 text-center text-[#c5c8b7] text-sm">
                                {t('Aucune commande passée pour le moment.')}
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#040e1f] text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                        <th className="px-6 py-4">{t('ID Commande')}</th>
                                        <th className="px-6 py-4">{t('Client')}</th>
                                        <th className="px-6 py-4">{t('Montant')}</th>
                                        <th className="px-6 py-4">{t('Statut')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#44483b]/10">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-[#1f2a3c]/30 transition-colors text-sm text-[#d8e3fb]">
                                            <td className="px-6 py-4 font-bold text-white uppercase tracking-tight">
                                                {order.order_number}
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {order.customer_name}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-white">
                                                {formatPrice(order.total)} DH
                                            </td>
                                            <td className="px-6 py-4">
                                                <OrderStatusBadge status={order.status} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Low Stock Alerts & System Alert */}
                <div className="flex flex-col gap-6">
                    {/* Low Stock Alerts */}
                    <div className="bg-[#152031] border border-[#44483b]/20 rounded-none p-6 shadow-[0_0_15px_rgba(255,255,255,0.01)] flex flex-col">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#44483b]/20">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-white">{t('Alertes Stock Bas')}</h4>
                        </div>
                        <div className="space-y-4 flex-1">
                            {lowStockProducts.length === 0 ? (
                                <div className="text-xs text-[#c5c8b7] text-center py-4">
                                    {t('Aucune alerte. Tous les produits ont un stock suffisant.')}
                                </div>
                            ) : (
                                lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex justify-between items-center bg-[#040e1f] p-3 border border-red-500/10 rounded-none hover:border-red-500/30 transition">
                                        <div className="min-w-0 flex-1 pr-2">
                                            <p className="text-xs font-bold text-white uppercase tracking-wider truncate">
                                                {product.name}
                                            </p>
                                            <p className="text-[10px] text-[#c5c8b7] uppercase mt-0.5">
                                                {t('Quantité restante')}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block px-2.5 py-1 text-xs font-extrabold bg-red-93000a/20 text-red-400 border border-red-500/20 rounded-none uppercase">
                                                {product.stock} u
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Operational Alert */}
                    <div className="bg-[#ceee93] p-6 rounded-none relative overflow-hidden flex flex-col justify-between shadow-[0_0_15px_rgba(206,238,147,0.1)]">
                        <div className="relative z-10">
                            <h5 className="text-[10px] font-black text-[#243600] uppercase tracking-widest">{t('Contrôle Système')}</h5>
                            <p className="text-sm font-extrabold text-[#243600] mt-2">
                                {t('Tous les systèmes de commande sont opérationnels.')}
                            </p>
                        </div>
                        <div className="mt-6 relative z-10 flex gap-2">
                            <Link href={route('admin.products.index')} className="px-4 py-2 bg-[#243600] text-[#ceee93] text-[10px] font-bold uppercase hover:bg-[#131f00] transition rounded-none">
                                {t('Gérer Produits')}
                            </Link>
                            <Link href={route('admin.categories.index')} className="px-4 py-2 border border-[#243600] text-[#243600] text-[10px] font-bold uppercase hover:bg-[#243600]/10 transition rounded-none">
                                {t('Catégories')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
