import React from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import DeliveryForm from '../../Components/DeliveryForm';
import OrderSummary from '../../Components/OrderSummary';

export default function Index({ items, subtotal, deliveryFee, total, user }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || auth.user?.name || '',
        phone: user?.phone || auth.user?.phone || '',
        address: user?.address || auth.user?.address || '',
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <Layout>
            <Head title="Validation de la commande" />

            <div className="max-w-6xl mx-auto py-8 px-4">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Validation de la commande</h1>
                        <p className="text-gray-600">Vérifiez vos informations de livraison et le récapitulatif de commande.</p>
                    </div>
                    <Link href={route('cart.index')} className="inline-flex items-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Retour au panier
                    </Link>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                    <DeliveryForm data={data} setData={setData} errors={errors} processing={processing} onSubmit={submit} />
                    <OrderSummary items={items} subtotal={subtotal} deliveryFee={deliveryFee} total={total} />
                </div>
            </div>
        </Layout>
    );
}
