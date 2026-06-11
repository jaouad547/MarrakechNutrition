import React from 'react';
import { useTranslation } from '../Contexts/LanguageContext';

export default function DeliveryForm({ data, setData, errors, processing, onSubmit }) {
    const { t } = useTranslation();

    return (
        <form onSubmit={onSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">{t('Informations de livraison')}</h2>
                <p className="text-sm text-gray-500">{t('Entrez vos coordonnées pour la livraison de la commande.')}</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">{t('Nom complet')}</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">{t('Téléphone')}</label>
                <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">{t('Adresse de livraison')}</label>
                <textarea
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-700">{t('Paiement à la livraison')}</p>
                <p className="text-sm text-green-700">{t('Vous ne payez qu’à la réception de votre commande.')}</p>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full rounded-md bg-red-600 px-4 py-3 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
                >
                    {t('Passer la commande')}
                </button>
            </div>
        </form>
    );
}
