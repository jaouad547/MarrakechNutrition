import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';

export default function Edit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: product.name,
        description: product.description ?? '',
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        is_active: product.is_active,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    const inputClass =
        'mt-1 block w-full bg-[#081425] border border-[#44483b]/30 text-[#d8e3fb] text-sm px-3 py-2 focus:outline-none focus:border-[#ceee93]/50 placeholder-[#44483b]';
    const labelClass = 'block text-xs font-bold uppercase tracking-wider text-[#c5c8b7]';
    const errorClass = 'text-red-400 text-xs mt-1';

    return (
        <AdminLayout title="Modifier le produit">
            <Head title="Modifier le produit" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black uppercase text-white font-serif tracking-tight">
                        Modifier le produit
                    </h1>
                    <p className="text-[#c5c8b7] text-xs uppercase tracking-wider mt-1">
                        Mettez à jour les informations du produit.
                    </p>
                </div>
                <Link
                    href={route('admin.products.index')}
                    className="text-xs font-bold uppercase text-[#c5c8b7] hover:text-white border border-[#44483b]/30 px-3 py-1.5 transition"
                >
                    ← Retour à la liste
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="space-y-6 bg-[#152031] border border-[#44483b]/20 p-8"
                encType="multipart/form-data"
            >
                {/* Name */}
                <div>
                    <label className={labelClass}>Nom *</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={inputClass}
                        required
                    />
                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className={inputClass}
                        rows={4}
                    />
                    {errors.description && <p className={errorClass}>{errors.description}</p>}
                </div>

                {/* Price + Stock */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Prix (MAD) *</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className={inputClass}
                            required
                        />
                        {errors.price && <p className={errorClass}>{errors.price}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>Stock *</label>
                        <input
                            type="number"
                            min="0"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                            className={inputClass}
                            required
                        />
                        {errors.stock && <p className={errorClass}>{errors.stock}</p>}
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className={labelClass}>Catégorie *</label>
                    <select
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className={inputClass}
                        required
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <p className={errorClass}>{errors.category_id}</p>}
                </div>

                {/* Current image */}
                <div>
                    <label className={labelClass}>Image actuelle</label>
                    {product.image ? (
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="mt-2 h-32 w-auto border border-[#44483b]/30 object-cover"
                        />
                    ) : (
                        <div className="mt-2 border border-dashed border-[#44483b]/30 px-4 py-8 text-xs text-[#44483b] text-center uppercase tracking-wider">
                            Aucun visuel disponible
                        </div>
                    )}
                </div>

                {/* Replace image */}
                <div>
                    <label className={labelClass}>Remplacer l'image</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                        onChange={(e) => setData('image', e.target.files[0] ?? null)}
                        className="mt-1 block w-full text-xs text-[#c5c8b7] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:uppercase file:bg-[#2a3548] file:text-[#d8e3fb] hover:file:bg-[#1f2a3c] file:cursor-pointer"
                    />
                    <p className="text-[#44483b] text-[10px] mt-1 uppercase">
                        JPEG, PNG, GIF, WEBP — 2 Mo max
                    </p>
                    {errors.image && <p className={errorClass}>{errors.image}</p>}
                </div>

                {/* Active */}
                <div className="flex items-center gap-3">
                    <input
                        id="is_active"
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="h-4 w-4 border-[#44483b] bg-[#081425] text-[#ceee93] focus:ring-[#ceee93]/30"
                    />
                    <label htmlFor="is_active" className={labelClass}>
                        Produit actif (visible en boutique)
                    </label>
                </div>

                {/* Submit */}
                <div className="pt-2 flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 bg-[#ceee93] text-[#243600] text-xs font-bold uppercase hover:brightness-110 transition disabled:opacity-50"
                    >
                        {processing ? 'Enregistrement…' : 'Enregistrer les modifications'}
                    </button>
                    <Link
                        href={route('admin.products.index')}
                        className="text-xs font-bold uppercase text-[#c5c8b7] hover:text-white transition"
                    >
                        Annuler
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
