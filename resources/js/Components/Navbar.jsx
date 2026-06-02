import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-green-600">
                                MarrakechNutrition
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <>
                                <span className="text-gray-700">Bonjour, {auth.user.name}</span>
                                <Link href={route('profile.edit')} className="text-gray-500 hover:text-gray-700">
                                    Profil
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    Se déconnecter
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-gray-500 hover:text-gray-700">
                                    Connexion
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Inscription
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
