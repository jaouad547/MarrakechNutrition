import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Components/AdminLayout';
import { useTranslation } from '../../../Contexts/LanguageContext';

export default function Create() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        eyebrow: '',
        title: '',
        subtitle: '',
        cta_label: '',
        cta_link: '',
        sort_order: 0,
        is_active: true,
        image: null,
    });

    const maxImageSize = 5 * 1024 * 1024;

    const handleImageChange = (e) => {
        const file = e.target.files[0] ?? null;

        if (file && file.size > maxImageSize) {
            setError('image', t("L'image dépasse la taille maximale autorisée de 5 Mo."));
            e.target.value = '';
            setData('image', null);
            return;
        }

        clearErrors('image');
        setData('image', file);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.banners.store'));
    };

    const inputClass =
        'mt-1 block w-full bg-[#081425] border border-[#44483b]/30 text-[#d8e3fb] text-sm px-3 py-2 focus:outline-none focus:border-[#ceee93]/50 placeholder-[#44483b]';
    const labelClass = 'block text-xs font-bold uppercase tracking-wider text-[#c5c8b7]';
    const errorClass = 'text-red-400 text-xs mt-1';

    return (
        <AdminLayout title={t('Nouvelle bannière')}>
            <Head title={t('Nouvelle bannière')} />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black uppercase text-white font-serif tracking-tight">
                        {t('Créer une bannière')}
                    </h1>
                    <p className="text-[#c5c8b7] text-xs uppercase tracking-wider mt-1">
                        {t('Ajoutez une bannière avec image, texte et lien.')}
                    </p>
                </div>
                <Link
                    href={route('admin.banners.index')}
                    className="text-xs font-bold uppercase text-[#c5c8b7] hover:text-white border border-[#44483b]/30 px-3 py-1.5 transition"
                >
                    ← {t('Retour à la liste')}
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="space-y-6 bg-[#152031] border border-[#44483b]/20 p-8"
                encType="multipart/form-data"
            >
                {/* Eyebrow */}
                <div>
                    <label className={labelClass}>{t("Texte d'accroche")}</label>
                    <input
                        type="text"
                        value={data.eyebrow}
                        onChange={(e) => setData('eyebrow', e.target.value)}
                        className={inputClass}
                        placeholder="MarrakechNutrition"
                    />
                    {errors.eyebrow && <p className={errorClass}>{errors.eyebrow}</p>}
                </div>

                {/* Title */}
                <div>
                    <label className={labelClass}>{t('Titre *')}</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className={inputClass}
                        required
                    />
                    {errors.title && <p className={errorClass}>{errors.title}</p>}
                </div>

                {/* Subtitle */}
                <div>
                    <label className={labelClass}>{t('Sous-titre')}</label>
                    <textarea
                        value={data.subtitle}
                        onChange={(e) => setData('subtitle', e.target.value)}
                        className={inputClass}
                        rows={3}
                    />
                    {errors.subtitle && <p className={errorClass}>{errors.subtitle}</p>}
                </div>

                {/* CTA label + link */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>{t('Texte du bouton')}</label>
                        <input
                            type="text"
                            value={data.cta_label}
                            onChange={(e) => setData('cta_label', e.target.value)}
                            className={inputClass}
                            placeholder={t('Découvrir nos produits')}
                        />
                        {errors.cta_label && <p className={errorClass}>{errors.cta_label}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>{t('Lien du bouton')}</label>
                        <input
                            type="text"
                            value={data.cta_link}
                            onChange={(e) => setData('cta_link', e.target.value)}
                            className={inputClass}
                            placeholder="/categories/proteines"
                        />
                        {errors.cta_link && <p className={errorClass}>{errors.cta_link}</p>}
                        <p className="text-[#44483b] text-[10px] mt-1 uppercase">
                            {t('Ex : /, /products, /categories/proteines')}
                        </p>
                    </div>
                </div>

                {/* Image */}
                <div>
                    <label className={labelClass}>{t('Image')}</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-xs text-[#c5c8b7] file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:uppercase file:bg-[#2a3548] file:text-[#d8e3fb] hover:file:bg-[#1f2a3c] file:cursor-pointer"
                    />
                    <p className="text-[#44483b] text-[10px] mt-1 uppercase">
                        {t('JPEG, PNG, GIF, WEBP — 5 Mo max')}
                    </p>
                    {errors.image && <p className={errorClass}>{errors.image}</p>}
                </div>

                {/* Sort order */}
                <div>
                    <label className={labelClass}>{t("Ordre d'affichage")}</label>
                    <input
                        type="number"
                        min="0"
                        value={data.sort_order}
                        onChange={(e) => setData('sort_order', e.target.value)}
                        className={`${inputClass} max-w-[8rem]`}
                        required
                    />
                    {errors.sort_order && <p className={errorClass}>{errors.sort_order}</p>}
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
                        {t("Bannière active (visible sur l'accueil)")}
                    </label>
                </div>

                {/* Submit */}
                <div className="pt-2 flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 bg-[#ceee93] text-[#243600] text-xs font-bold uppercase hover:brightness-110 transition disabled:opacity-50"
                    >
                        {processing ? t('Enregistrement…') : t('Enregistrer la bannière')}
                    </button>
                    <Link
                        href={route('admin.banners.index')}
                        className="text-xs font-bold uppercase text-[#c5c8b7] hover:text-white transition"
                    >
                        {t('Annuler')}
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
