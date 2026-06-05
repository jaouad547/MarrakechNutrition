import React from 'react';

export default function OrderStatusBadge({ status }) {
    // Map database status to French label and color classes
    const getStatusProps = (status) => {
        const cleanedStatus = (status || '').toLowerCase().trim();
        
        switch (cleanedStatus) {
            case 'pending payment on delivery':
            case 'pending':
            case 'en attente':
                return {
                    label: 'En attente',
                    bgClass: 'bg-amber-100 text-amber-800 border-amber-200',
                };
            case 'preparing':
            case 'en préparation':
                return {
                    label: 'En préparation',
                    bgClass: 'bg-blue-100 text-blue-800 border-blue-200',
                };
            case 'in delivery':
            case 'en cours de livraison':
                return {
                    label: 'En cours de livraison',
                    bgClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                };
            case 'delivered':
            case 'livré':
                return {
                    label: 'Livré',
                    bgClass: 'bg-green-100 text-green-800 border-green-200',
                };
            case 'cancelled':
            case 'annulé':
            case 'annulée':
                return {
                    label: 'Annulé',
                    bgClass: 'bg-red-100 text-red-800 border-red-200',
                };
            default:
                return {
                    label: status || 'Inconnu',
                    bgClass: 'bg-gray-100 text-gray-800 border-gray-200',
                };
        }
    };

    const { label, bgClass } = getStatusProps(status);

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${bgClass}`}>
            {label}
        </span>
    );
}
