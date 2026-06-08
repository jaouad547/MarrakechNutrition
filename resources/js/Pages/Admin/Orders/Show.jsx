import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import OrderStatusBadge from '../../../Components/OrderStatusBadge';

function formatPrice(value) {
    return Number(value).toFixed(2).replace('.', ',') + ' DH';
}

const NEXT_STATUS_LABELS = {
    preparing: 'En préparation',
    'in delivery': 'En cours de livraison',
    delivered: 'Livré',
};

export default function Show({ order }) {
    const advanceStatus = () => {
        router.patch(route('admin.orders.update-status', order.id), {}, { preserveScroll: false });
    };

    const cancelOrder = () => {
        if (
            window.confirm(
                `Annuler la commande ${order.order_number} ?\n\nLes stocks seront restaurés automatiquement.`,
            )
        ) {
            router.post(route('admin.orders.cancel', order.id));
        }
    };

    return (
        <AdminLayout title={`Commande ${order.order_number}`}>
            <Head title={`Commande ${order.order_number}`} />

            {/* Back + Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                <div>
                    <Link
                        href={route('admin.orders.index')}
                        className="text-xs font-bold uppercase text-[#c5c8b7] hover:text-white border border-[#44483b]/30 px-3 py-1.5 transition inline-flex items-center gap-1 mb-3"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Retour aux commandes
                    </Link>
                    <h1 className="text-2xl font-black uppercase text-white font-serif tracking-tight">
                        Commande {order.order_number}
                    </h1>
                    <p className="text-[#c5c8b7] text-xs uppercase tracking-wider mt-1">
                        Passée le {order.created_at}
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                    {order.next_status && (
                        <button
                            onClick={advanceStatus}
                            className="px-5 py-2.5 bg-[#ceee93] text-[#243600] text-xs font-bold uppercase hover:brightness-110 transition flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            Passer à : {NEXT_STATUS_LABELS[order.next_status] ?? order.next_status}
                        </button>
                    )}
                    {order.can_cancel && (
                        <button
                            onClick={cancelOrder}
                            className="px-5 py-2.5 border border-red-500/40 text-red-400 text-xs font-bold uppercase hover:bg-red-500/10 transition flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Annuler la commande
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order items — spans 2 cols */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items table */}
                    <div className="bg-[#152031] border border-[#44483b]/20 overflow-hidden">
                        <div className="px-6 py-4 border-b border-[#44483b]/20">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-white">
                                Articles commandés
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#040e1f]">
                                    <tr>
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                            Produit
                                        </th>
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7] text-center">
                                            Qté
                                        </th>
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7] text-right">
                                            Prix unitaire
                                        </th>
                                        <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7] text-right">
                                            Total ligne
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#44483b]/10">
                                    {order.items.map((item) => (
                                        <tr key={item.id} className="hover:bg-[#1f2a3c]/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 flex-shrink-0 bg-[#2a3548] border border-[#44483b]/30 overflow-hidden">
                                                        {item.product_image ? (
                                                            <img
                                                                src={`/storage/${item.product_image}`}
                                                                alt={item.product_name}
                                                                className="w-full h-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-[#44483b]">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-semibold text-[#d8e3fb]">
                                                        {item.product_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-white text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#c5c8b7] text-right">
                                                {formatPrice(item.price)}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-[#ceee93] text-right">
                                                {formatPrice(item.line_total)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="border-t border-[#44483b]/20 bg-[#040e1f]">
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#c5c8b7] text-right"
                                        >
                                            Total commande
                                        </td>
                                        <td className="px-6 py-4 text-base font-black text-[#ceee93] text-right">
                                            {formatPrice(order.total)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Status timeline */}
                    <div className="bg-[#152031] border border-[#44483b]/20 p-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
                            Statut actuel
                        </h2>
                        <div className="flex items-center gap-0">
                            {[
                                { key: 'Pending payment on delivery', label: 'En attente' },
                                { key: 'preparing', label: 'Préparation' },
                                { key: 'in delivery', label: 'Livraison' },
                                { key: 'delivered', label: 'Livré' },
                            ].map((step, index, arr) => {
                                const statusLower = (order.status || '').toLowerCase().trim();
                                const stepLower = step.key.toLowerCase().trim();
                                const isCancelled = statusLower === 'cancelled';

                                const statusOrder = [
                                    'pending payment on delivery',
                                    'preparing',
                                    'in delivery',
                                    'delivered',
                                ];
                                const currentIdx = statusOrder.indexOf(statusLower);
                                const stepIdx = statusOrder.indexOf(stepLower);
                                const isDone = !isCancelled && currentIdx >= stepIdx;
                                const isCurrent = !isCancelled && currentIdx === stepIdx;

                                return (
                                    <React.Fragment key={step.key}>
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-8 h-8 flex items-center justify-center text-xs font-black rounded-full border-2 transition-all ${
                                                    isCancelled
                                                        ? 'bg-[#2a3548] border-[#44483b]/30 text-[#44483b]'
                                                        : isDone
                                                        ? isCurrent
                                                            ? 'bg-[#ceee93] border-[#ceee93] text-[#243600]'
                                                            : 'bg-[#ceee93]/20 border-[#ceee93]/40 text-[#ceee93]'
                                                        : 'bg-[#2a3548] border-[#44483b]/30 text-[#44483b]'
                                                }`}
                                            >
                                                {isDone && !isCurrent ? (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    index + 1
                                                )}
                                            </div>
                                            <span
                                                className={`mt-2 text-[10px] font-bold uppercase tracking-wider text-center max-w-[60px] leading-tight ${
                                                    isCancelled
                                                        ? 'text-[#44483b]'
                                                        : isCurrent
                                                        ? 'text-[#ceee93]'
                                                        : isDone
                                                        ? 'text-[#c5c8b7]'
                                                        : 'text-[#44483b]'
                                                }`}
                                            >
                                                {step.label}
                                            </span>
                                        </div>
                                        {index < arr.length - 1 && (
                                            <div
                                                className={`flex-1 h-0.5 mt-[-16px] mx-1 ${
                                                    isCancelled || !isDone
                                                        ? 'bg-[#44483b]/30'
                                                        : 'bg-[#ceee93]/40'
                                                }`}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })}

                            {/* Cancelled indicator */}
                            {(order.status || '').toLowerCase() === 'cancelled' && (
                                <>
                                    <div className="flex-1 h-0.5 mt-[-16px] mx-1 bg-red-500/20" />
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 flex items-center justify-center text-xs font-black rounded-full border-2 bg-red-500/10 border-red-500/40 text-red-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-red-400 text-center">
                                            Annulé
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right column: customer info + order summary */}
                <div className="space-y-6">
                    {/* Customer info */}
                    <div className="bg-[#152031] border border-[#44483b]/20 p-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-4 pb-2 border-b border-[#44483b]/20">
                            Informations client
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] text-[#c5c8b7] uppercase tracking-wider">Nom</p>
                                <p className="text-sm font-semibold text-white mt-0.5">
                                    {order.customer_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#c5c8b7] uppercase tracking-wider">Téléphone</p>
                                <p className="text-sm font-semibold text-[#ceee93] mt-0.5">
                                    {order.phone}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#c5c8b7] uppercase tracking-wider">
                                    Adresse de livraison
                                </p>
                                <p className="text-sm text-[#d8e3fb] mt-0.5 leading-relaxed whitespace-pre-line">
                                    {order.delivery_address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="bg-[#152031] border border-[#44483b]/20 p-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-4 pb-2 border-b border-[#44483b]/20">
                            Récapitulatif
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-[#c5c8b7] uppercase tracking-wider">
                                    Paiement
                                </span>
                                <span className="text-xs font-semibold text-[#d8e3fb]">
                                    {order.payment_method}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-[#c5c8b7] uppercase tracking-wider">
                                    Articles
                                </span>
                                <span className="text-xs font-semibold text-[#d8e3fb]">
                                    {order.items.length}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-[#44483b]/20">
                                <span className="text-[10px] text-[#c5c8b7] uppercase tracking-wider font-bold">
                                    Total
                                </span>
                                <span className="text-base font-black text-[#ceee93]">
                                    {formatPrice(order.total)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Current status badge */}
                    <div className="bg-[#152031] border border-[#44483b]/20 p-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
                            Statut
                        </h2>
                        <OrderStatusBadge status={order.status} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
