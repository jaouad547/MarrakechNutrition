import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { useTranslation } from '../../Contexts/LanguageContext';

export default function Register() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <Layout>
            <Head title={t('Inscription')} />
            <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">{t('Créer un compte')}</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Nom complet')}</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            required
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Téléphone')}</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={e => setData('phone', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            required
                        />
                        {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Adresse de livraison')}</label>
                        <textarea
                            value={data.address}
                            onChange={e => setData('address', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            rows="3"
                            required
                        ></textarea>
                        {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Mot de passe')}</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            required
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Confirmer le mot de passe')}</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                            {t("S'inscrire")}
                        </button>
                    </div>

                    <div className="text-center mt-4 text-sm text-gray-600">
                        {t('Déjà inscrit ?')} <Link href={route('login')} className="text-red-600 hover:text-red-500">{t('Connectez-vous')}</Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
