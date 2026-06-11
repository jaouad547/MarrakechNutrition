import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import { useTranslation } from '../../../Contexts/LanguageContext';

export default function Index({ banners }) {
    const { t } = useTranslation();

    const toggleActive = (banner) => {
        router.patch(route('admin.banners.toggle-active', banner.id), {}, { preserveScroll: true });
    };

    return (
        <AdminLayout title={t('Bannières')}>
            <Head title={t('Bannières')} />

            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-black uppercase text-white font-serif tracking-tight">
                        {t('Gestion des Bannières')}
                    </h1>
                    <p className="text-[#c5c8b7] text-xs uppercase tracking-wider mt-1">
                        {t("Gérez les bannières affichées sur la page d'accueil.")}
                    </p>
                </div>
                <Link
                    href={route('admin.banners.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#ceee93] text-[#243600] text-xs font-bold uppercase hover:brightness-110 transition self-start sm:self-auto"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    {t('Nouvelle bannière')}
                </Link>
            </div>

            {/* Table */}
            <div className="bg-[#152031] border border-[#44483b]/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#040e1f]">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Bannière')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Lien')}
                                </th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#c5c8b7]">
                                    {t('Ordre')}
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
                            {banners.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-[#c5c8b7] text-sm">
                                        {t('Aucune bannière trouvée.')}
                                    </td>
                                </tr>
                            ) : (
                                banners.map((banner) => (
                                    <tr key={banner.id} className="hover:bg-[#1f2a3c]/30 transition-colors">
                                        {/* Banner + thumbnail */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 flex-shrink-0 bg-[#2a3548] border border-[#44483b]/30 overflow-hidden">
                                                    {banner.image ? (
                                                        <img
                                                            src={`/storage/${banner.image}`}
                                                            alt={banner.title}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[#44483b]">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                                <div className="min-w-0">
                                                    {banner.eyebrow && (
                                                        <span className="block text-[10px] font-bold uppercase tracking-widest text-[#ceee93]">
                                                            {banner.eyebrow}
                                                        </span>
                                                    )}
                                                    <span className="block text-sm font-semibold text-white truncate max-w-xs">
                                                        {banner.title}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Link */}
                                        <td className="px-6 py-4 text-xs text-[#c5c8b7]">
                                            {banner.cta_link || '—'}
                                        </td>

                                        {/* Sort order */}
                                        <td className="px-6 py-4 text-sm font-bold text-[#d8e3fb]">
                                            {banner.sort_order}
                                        </td>

                                        {/* Active status — inline toggle */}
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleActive(banner)}
                                                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition ${
                                                    banner.is_active
                                                        ? 'bg-[#ceee93]/10 text-[#ceee93] border border-[#ceee93]/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
                                                        : 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-[#ceee93]/10 hover:text-[#ceee93] hover:border-[#ceee93]/30'
                                                }`}
                                            >
                                                {banner.is_active ? t('Actif') : t('Inactif')}
                                            </button>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('admin.banners.edit', banner.id)}
                                                    className="p-2 border border-[#44483b]/30 hover:border-[#ceee93]/50 text-[#c5c8b7] hover:text-white transition"
                                                    title={t('Modifier')}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={route('admin.banners.destroy', banner.id)}
                                                    method="delete"
                                                    as="button"
                                                    onClick={(e) => {
                                                        if (!window.confirm(t('Supprimer la bannière « {{title}} » ?', { title: banner.title }))) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    className="p-2 border border-[#44483b]/30 hover:border-red-500/50 text-[#c5c8b7] hover:text-red-400 transition"
                                                    title={t('Supprimer')}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>
        </AdminLayout>
    );
}
