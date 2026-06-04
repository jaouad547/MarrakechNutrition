import React from 'react';

export default function OrderSummary({ items, subtotal, deliveryFee, total }) {
    const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',');

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Résumé de la commande</h2>
            <div className="mt-4 space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                            {item.image ? (
                                <img src={`/storage/${item.image}`} alt={item.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-400">No image</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">Quantité : {item.quantity}</div>
                        </div>
                        <div className="text-right text-gray-900 font-semibold">{formatPrice(item.line_total)} DH</div>
                    </div>
                ))}
            </div>
            <div className="mt-6 space-y-2 border-t border-gray-200 pt-4 text-sm text-gray-700">
                <div className="flex justify-between"> <span>Sous-total</span> <span>{formatPrice(subtotal)} DH</span> </div>
                <div className="flex justify-between"> <span>Frais de livraison</span> <span>{formatPrice(deliveryFee)} DH</span> </div>
                <div className="flex justify-between text-base font-semibold text-gray-900"> <span>Total</span> <span>{formatPrice(total)} DH</span> </div>
            </div>
        </div>
    );
}
