import React from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from './Navbar';

export default function Layout({ children }) {
    const { flash } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            {flash?.status && (
                <div className="bg-green-50 border-b border-green-200 text-green-700 px-4 py-3">
                    <div className="max-w-7xl mx-auto">{flash.status}</div>
                </div>
            )}
            <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 min-w-0">
                {children}
            </main>
        </div>
    );
}
