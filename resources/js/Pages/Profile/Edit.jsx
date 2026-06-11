import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { useTranslation } from '../../Contexts/LanguageContext';

export default function Edit({ user }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
    });

    const { data: pwdData, setData: setPwdData, post: postPwd, processing: pwdProcessing, errors: pwdErrors } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('profile.update'));
    }

    function submitPassword(e) {
        e.preventDefault();
        postPwd(route('profile.password'));
    }

    return (
        <Layout>
            <Head title={t('Mon profil')} />

            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('Informations du compte')}</h2>
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Nom complet')}</label>
                        <input value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input value={data.email} onChange={e => setData('email', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Téléphone')}</label>
                        <input value={data.phone} onChange={e => setData('phone', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                        {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Adresse')}</label>
                        <textarea value={data.address} onChange={e => setData('address', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" rows="3"></textarea>
                        {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={processing} className="px-4 py-2 bg-red-600 text-white rounded">{t('Sauvegarder')}</button>
                    </div>
                </form>

                <hr className="my-8" />

                <h3 className="text-xl font-semibold mb-4">{t('Changer le mot de passe')}</h3>
                <form onSubmit={submitPassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Mot de passe actuel')}</label>
                        <input type="password" value={pwdData.current_password} onChange={e => setPwdData('current_password', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                        {pwdErrors.current_password && <div className="text-red-500 text-sm mt-1">{pwdErrors.current_password}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Nouveau mot de passe')}</label>
                        <input type="password" value={pwdData.password} onChange={e => setPwdData('password', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                        {pwdErrors.password && <div className="text-red-500 text-sm mt-1">{pwdErrors.password}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Confirmer le mot de passe')}</label>
                        <input type="password" value={pwdData.password_confirmation} onChange={e => setPwdData('password_confirmation', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 p-2" />
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={pwdProcessing} className="px-4 py-2 bg-red-600 text-white rounded">{t('Changer le mot de passe')}</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
