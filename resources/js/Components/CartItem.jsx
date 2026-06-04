import React, { useEffect, useState } from 'react';

export default function CartItem({ item, onUpdate, onRemove, processing }) {
    const [quantity, setQuantity] = useState(item.quantity);

    useEffect(() => {
        setQuantity(item.quantity);
    }, [item.quantity]);

    return (
        <tr className="border-b border-gray-200">
            <td className="py-4 pr-6">
                <div className="flex items-center gap-3">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        {item.image ? (
                            <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">Pas d'image</div>
                        )}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                </div>
            </td>
            <td className="py-4 text-right text-gray-700">{item.price.toFixed(2).replace('.', ',')} DH</td>
            <td className="py-4">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        onUpdate(item, Number(quantity));
                    }}
                    className="flex flex-col gap-2"
                >
                    <label className="sr-only">Quantité</label>
                    <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                        className="w-20 rounded-md border border-gray-300 px-2 py-1"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                    >
                        Mettre à jour
                    </button>
                </form>
            </td>
            <td className="py-4 text-right font-semibold text-gray-900">{item.line_total.toFixed(2).replace('.', ',')} DH</td>
            <td className="py-4 text-right">
                <button
                    type="button"
                    onClick={() => onRemove(item)}
                    disabled={processing}
                    className="rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                    Supprimer
                </button>
            </td>
        </tr>
    );
}
