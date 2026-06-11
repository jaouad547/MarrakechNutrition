import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import { useTranslation } from '../../../Contexts/LanguageContext';

function formatPrice(value) {
    return Number(value).toFixed(2).replace('.', ',') + ' DH';
}

export default function Index({ products, filters, categories }) {
    const { t } = useTranslation();
    const [editingStock, setEditingStock] = useState(null);

    const toggleActive = (product) => {
        router.patch(route('admin.products.toggle-active', product.id), {}, { preserveScroll: true });
    };

    const startEditStock = (product) => {
        setEditingStock({ id: product.id, value: String(product.stock) });
    };

    const saveStock = (productId) => {
        router.patch(
            route('admin.products.update-stock', productId),
            { stock: editingStock.value },
            { preserveScroll: true, onSuccess: () => setEditingStock(null) },
        );
    };

    return (
        <AdminLayout title={t('Produits')}>
            <Head title={t('Produits')} />

            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black uppercase text-white font-serif tracking-tight">
                        {t('Gestion des Produits')}
                    </h1>
                    <p className="text-[#c5c8b7] text-xs uppercase tracking-wider mt-1">
                        {t('Gérez les produits disponibles en boutique.')}
                    </p>
                </div>
                <Link
                    href={route('admin.products.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#ceee93] text-[#243600] text-xs font-bold uppercase hover:brightness-110 transition self-start sm:self-auto"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    {t('Nouveau produit')}
                </Link>
            </div>

            {/* Filters */}
            <form
                method="get"
                action={route('admin.products.index')}
                className="flex flex-wrap gap-3 mb-6"
            >
                <input
                    type="search"
                    name="search"
                    defaultValue={filters.search ?? ''}
                    placeholder={t('Rechercher un produit...')}
                    className="bg-[#152031] border border-[#44483b]/30 text-[#d8e3fb] text-xs px-3 py-2 focus:outline-none focus:border-[#ceee93]/50 placeholder-[#44483b]"
                />
                <select
                    name="category"
                    defaultValue={filters.category ?? ''}
                    className="bg-[#152031] border border-[#44483b]/30 text-[#d8e3fb] text-xs px-3 py-2 focus:outline-none focus:border-[#ceee93]/50"
                    onChange={(e) => e.target.form.submit()}
                >
                    <option value="">{t('Toutes les catégories')}</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <select
                    name="status"
                    defaultValue={filters.status ?? ''}
                    className="bg-[#152031] border border-[#44483b]/30 text-[#d8e3fb] text-xs px-3 py-2 focus:outline-none focus:border-[#ceee93]/50"
                    onChange={(e) => e.target.form.submit()}
                >
                    <option value="">{t('Tous les statuts')}</option>
                    <option value="active">{t('Actif')}</option>
                    <option value="inactive">{t('Inactif')}</option>
                </select>
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#2a3548] text-[#d8e3fb] text-xs font-bold uppercase hover:bg-[#1f2a3c] transition"
                >
                    {t('Filtrer')}
                </button>
                {(filters.search || filters.category || filters.status) && (
                    <a
                        href={route('admin.products.index')}
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
                                    {t('Produit')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Catégorie')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Prix')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Stock')}
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
                            {products.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-[#c5c8b7] text-sm"
                                    >
                                        {t('Aucun produit trouvé.')}
                                    </td>
                                </tr>
                            ) : (
                                products.data.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-[#1f2a3c]/30 transition-colors"
                                    >
                                        {/* Product + thumbnail */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 flex-shrink-0 bg-[#2a3548] border border-[#44483b]/30 overflow-hidden">
                                                    {product.image ? (
                                                        <img
                                                            src={`/storage/${product.image}`}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[#44483b]">
                                                            <svg
                                                                className="w-5 h-5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="1.5"
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="text-sm font-semibold text-white uppercase tracking-wide">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-[#2a3548] text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                                {product.category ?? '—'}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4 text-sm font-bold text-[#ceee93]">
                                            {formatPrice(product.price)}
                                        </td>

                                        {/* Stock — inline edit */}
                                        <td className="px-6 py-4">
                                            {editingStock?.id === product.id ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={editingStock.value}
                                                        onChange={(e) =>
                                                            setEditingStock({
                                                                ...editingStock,
                                                                value: e.target.value,
                                                            })
                                                        }
                                                        className="w-20 bg-[#081425] border border-[#ceee93]/50 text-[#d8e3fb] text-xs px-2 py-1 focus:outline-none"
                                                        autoFocus
                                                    />
                                                    <button
                                                        onClick={() => saveStock(product.id)}
                                                        className="px-2 py-1 bg-[#ceee93] text-[#243600] text-[10px] font-bold"
                                                        title={t('Enregistrer')}
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingStock(null)}
                                                        className="px-2 py-1 border border-[#44483b]/30 text-[#c5c8b7] text-[10px] font-bold"
                                                        title={t('Annuler')}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                                            product.stock > 10
                                                                ? 'bg-[#ceee93] animate-pulse'
                                                                : product.stock > 0
                                                                ? 'bg-yellow-400'
                                                                : 'bg-red-400'
                                                        }`}
                                                    />
                                                    <span
                                                        className={`text-sm font-bold ${
                                                            product.stock === 0
                                                                ? 'text-red-400'
                                                                : 'text-[#d8e3fb]'
                                                        }`}
                                                    >
                                                        {product.stock}
                                                    </span>
                                                    <button
                                                        onClick={() => startEditStock(product)}
                                                        className="text-[#c5c8b7] hover:text-white transition"
                                                        title={t('Modifier le stock')}
                                                    >
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
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </td>

                                        {/* Active status — inline toggle */}
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleActive(product)}
                                                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition ${
                                                    product.is_active
                                                        ? 'bg-[#ceee93]/10 text-[#ceee93] border border-[#ceee93]/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
                                                        : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-[#ceee93]/10 hover:text-[#ceee93] hover:border-[#ceee93]/30'
                                                }`}
                                            >
                                                {product.is_active ? t('Actif') : t('Inactif')}
                                            </button>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('admin.products.edit', product.id)}
                                                    className="p-2 border border-[#44483b]/30 hover:border-[#ceee93]/50 text-[#c5c8b7] hover:text-white transition"
                                                    title={t('Modifier')}
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={route('admin.products.destroy', product.id)}
                                                    method="delete"
                                                    as="button"
                                                    onClick={(e) => {
                                                        if (
                                                            !window.confirm(
                                                                t('Supprimer le produit « {{name}} » ?', { name: product.name }),
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    className="p-2 border border-[#44483b]/30 hover:border-red-500/50 text-[#c5c8b7] hover:text-red-400 transition"
                                                    title={t('Supprimer')}
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-[#44483b]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] text-[#c5c8b7] uppercase tracking-wider">
                            {t('{{from}}–{{to}} sur {{total}} produits', { from: products.from, to: products.to, total: products.total })}
                        </p>
                        <nav className="flex gap-1">
                            {products.links.map((link, index) =>
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
