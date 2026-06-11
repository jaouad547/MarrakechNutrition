import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { useTranslation } from '../../Contexts/LanguageContext';

export default function Confirmation({ order }) {
    const { t } = useTranslation();
    const formatPrice = (value) => Number(value).toFixed(2).replace('.', ',');

    return (
        <Layout>
            <Head title={t('Confirmation de commande')} />

            <div className="max-w-5xl mx-auto py-8 px-4">
                <div className="rounded-xl bg-white p-8 shadow-sm">
                    <h1 className="text-3xl font-bold text-gray-900">{t('Commande confirmée')}</h1>
                    <p className="mt-2 text-gray-600">{t('Merci pour votre commande !')}</p>
                    <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
                        <p className="text-sm text-green-700">{t('Numéro de commande')}</p>
                        <p className="text-2xl font-semibold text-green-900">{order.order_number}</p>
                    </div>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
                        <div className="space-y-6">
                            <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                                <h2 className="text-xl font-semibold text-gray-900">{t('Détails de la livraison')}</h2>
                                <p className="mt-4 text-gray-700"><span className="font-semibold">{t('Nom :')}</span> {order.customer_name}</p>
                                <p className="mt-2 text-gray-700"><span className="font-semibold">{t('Téléphone :')}</span> {order.phone}</p>
                                <p className="mt-2 text-gray-700"><span className="font-semibold">{t('Adresse :')}</span> {order.delivery_address}</p>
                            </section>

                            <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                                <h2 className="text-xl font-semibold text-gray-900">{t('Articles commandés')}</h2>
                                <div className="mt-4 space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="rounded-xl bg-white p-4 shadow-sm">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-600">{t('Quantité : {{quantity}}', { quantity: item.quantity })}</p>
                                                </div>
                                                <p className="text-gray-900 font-semibold">{formatPrice(item.line_total)} DH</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-6">
                            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900">{t('Résumé de paiement')}</h2>
                                <div className="mt-4 space-y-2 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>{t('Total')}</span>
                                        <span>{formatPrice(order.total)} DH</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t('Méthode')}</span>
                                        <span>{order.payment_method}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t('Statut')}</span>
                                        <span>{order.status}</span>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                                <h2 className="text-xl font-semibold text-gray-900">{t('Livraison')}</h2>
                                <p className="mt-4 text-gray-700">{t('Votre commande sera livrée sous 2 à 4 jours ouvrés.')}</p>
                            </section>

                            <div className="space-y-3">
                                <Link href={route('home')} className="block rounded-md bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-red-700">
                                    {t('Retour à l’accueil')}
                                </Link>
                                {order.user_id && (
                                    <Link href={route('profile.edit')} className="block rounded-md border border-gray-200 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50">
                                        {t('Voir mes commandes')}
                                    </Link>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
