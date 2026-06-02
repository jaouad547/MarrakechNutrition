import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../../../Components/Layout';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.categories.update', category.id));
    };

    return (
        <Layout>
            <Head title="Modifier la catégorie" />
            <div className="max-w-3xl mx-auto py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Modifier la catégorie</h1>
                        <p className="text-gray-600">Mettez à jour le nom et la description.</p>
                    </div>
                    <Link href={route('admin.categories.index')} className="text-green-600 hover:text-green-700">
                        Retour à la liste
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            rows="4"
                        />
                        {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
