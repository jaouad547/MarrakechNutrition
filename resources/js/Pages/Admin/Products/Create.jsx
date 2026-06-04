import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '../../../Components/Layout';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: 0,
        category_id: categories.length > 0 ? categories[0].id : '',
        is_active: true,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <Layout>
            <Head title="Nouveau produit" />
            <div className="max-w-3xl mx-auto py-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Créer un produit</h1>
                        <p className="text-gray-600">Ajoutez un produit avec image, catégorie et disponibilité.</p>
                    </div>
                    <Link href={route('admin.products.index')} className="text-green-600 hover:text-green-700">
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

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prix (MAD)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                required
                            />
                            {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock</label>
                            <input
                                type="number"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                min="0"
                                required
                            />
                            {errors.stock && <div className="text-red-500 text-sm mt-1">{errors.stock}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <select
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                            required
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="mt-1 block w-full text-gray-700"
                        />
                        {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                            Produit actif
                        </label>
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
