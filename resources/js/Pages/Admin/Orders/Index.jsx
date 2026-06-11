import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import OrderStatusBadge from '../../../Components/OrderStatusBadge';
import { useTranslation } from '../../../Contexts/LanguageContext';

function formatPrice(value) {
    return Number(value).toFixed(2).replace('.', ',') + ' DH';
}

const getStatusLabels = (t) => ({
    'Pending payment on delivery': t('En attente'),
    preparing: t('En préparation'),
    'in delivery': t('En cours de livraison'),
    delivered: t('Livré'),
    cancelled: t('Annulé'),
});

export default function Index({ orders, filters, statuses }) {
    const { t } = useTranslation();
    const STATUS_LABELS = getStatusLabels(t);

    const toggleSort = () => {
        const params = new URLSearchParams(window.location.search);
        params.set('sort', filters.sort === 'asc' ? 'desc' : 'asc');
        if (filters.status) params.set('status', filters.status);
        window.location.href = route('admin.orders.index') + '?' + params.toString();
    };

    return (
        <AdminLayout title={t('Commandes')}>
            <Head title={t('Commandes')} />

            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black uppercase text-white font-serif tracking-tight">
                        {t('Gestion des Commandes')}
                    </h1>
                    <p className="text-[#c5c8b7] text-xs uppercase tracking-wider mt-1">
                        {t('Suivez et gérez les commandes clients.')}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <form
                method="get"
                action={route('admin.orders.index')}
                className="flex flex-wrap gap-3 mb-6"
            >
                <input type="hidden" name="sort" value={filters.sort} />

                <select
                    name="status"
                    defaultValue={filters.status ?? ''}
                    className="bg-[#152031] border border-[#44483b]/30 text-[#d8e3fb] text-xs px-3 py-2 focus:outline-none focus:border-[#ceee93]/50"
                    onChange={(e) => e.target.form.submit()}
                >
                    <option value="">{t('Tous les statuts')}</option>
                    {statuses.map((s) => (
                        <option key={s} value={s}>
                            {STATUS_LABELS[s] ?? s}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={toggleSort}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2a3548] text-[#d8e3fb] text-xs font-bold uppercase hover:bg-[#1f2a3c] transition"
                >
                    {t('Date')}
                    {filters.sort === 'asc' ? (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                        </svg>
                    ) : (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </button>

                {filters.status && (
                    <a
                        href={route('admin.orders.index')}
                        className="px-4 py-2 border border-[#44483b]/30 text-[#c5c8b7] text-xs font-bold uppercase hover:text-white transition"
                    >
                        {t('Réinitialiser')}
                    </a>
                )}
            </form>

            {/* Table */}
            <div className="bg-[#152031] border border-[#44483b]/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#040e1f]">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('N° Commande')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Client')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Date')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Total')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Statut')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7] text-right">
                                    {t('Actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#44483b]/10">
                            {orders.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-[#c5c8b7] text-sm"
                                    >
                                        {t('Aucune commande trouvée.')}
                                    </td>
                                </tr>
                            ) : (
                                orders.data.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-[#1f2a3c]/30 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-white uppercase tracking-tight">
                                                {order.order_number}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-semibold text-[#d8e3fb]">
                                                    {order.customer_name}
                                                </p>
                                                <p className="text-[10px] text-[#c5c8b7] mt-0.5">
                                                    {order.phone}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[#c5c8b7]">
                                            {order.created_at}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#ceee93]">
                                            {formatPrice(order.total)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <OrderStatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={route('admin.orders.show', order.id)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#44483b]/30 hover:border-[#ceee93]/50 text-[#c5c8b7] hover:text-white text-[10px] font-bold uppercase transition"
                                            >
                                                {t('Voir détail')}
                                                <svg
                                                    className="w-3 h-3"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {orders.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-[#44483b]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] text-[#c5c8b7] uppercase tracking-wider">
                            {t('{{from}}–{{to}} sur {{total}} commandes', { from: orders.from, to: orders.to, total: orders.total })}
                        </p>
                        <nav className="flex gap-1">
                            {orders.links.map((link, index) =>
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-1.5 text-xs font-bold uppercase transition ${
                                            link.active
                                                ? 'bg-[#ceee93] text-[#243600]'
                                                : 'bg-[#2a3548] text-[#c5c8b7] hover:text-white'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 text-xs font-bold uppercase text-[#44483b]/50 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ),
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
