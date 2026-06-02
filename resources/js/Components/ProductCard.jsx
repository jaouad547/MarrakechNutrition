import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProductCard({ product }) {
    const price = Number(product.price).toFixed(2).replace('.', ',');

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <Link href={route('products.show', product.slug)}>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
                    {product.image ? (
                        <img src={`/storage/${product.image}`} alt={product.name} className="h-48 w-full object-cover" />
                    ) : (
                        <div className="h-48 flex items-center justify-center text-gray-400">No image</div>
                    )}
                </div>
            </Link>
            <div className="p-4">
                <Link href={route('products.show', product.slug)} className="block font-semibold text-gray-900 mb-1">
                    {product.name}
                </Link>
                <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">{price} DH</div>
                    <div className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
                    </div>
                </div>
            </div>
        </div>
    );
}
