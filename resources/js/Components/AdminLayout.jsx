import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, title }) {
    const { url, props } = usePage();
    const adminName = props.auth?.user?.name || 'Administrateur';
    const flash = props.flash || {};

    const navItems = [
        {
            name: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
            ),
            route: 'admin.dashboard',
            activePattern: /^\/admin$/,
        },
        {
            name: 'Produits',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            route: 'admin.products.index',
            activePattern: /^\/admin\/products/,
        },
        {
            name: 'Catégories',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
            ),
            route: 'admin.categories.index',
            activePattern: /^\/admin\/categories/,
        },
        {
            name: 'Commandes',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
            route: 'admin.orders.index',
            activePattern: /^\/admin\/orders/,
        },
        {
            name: 'Utilisateurs',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            route: 'admin.users.index',
            activePattern: /^\/admin\/users/,
        },
    ];

    const isActive = (item) => {
        return item.activePattern.test(url);
    };

    return (
        <div className="bg-[#081425] text-[#d8e3fb] font-sans min-h-screen flex selection:bg-[#ceee93] selection:text-[#243600]">
            <Head>
                <title>{title ? `${title} - Admin Panel` : 'MarrakechNutrition Admin'}</title>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
            </Head>

            {/* Side Navigation Bar */}
            <aside className="w-64 border-r border-[#44483b]/30 bg-[#152031] flex flex-col h-screen fixed left-0 top-0 z-50 rounded-none">
                <div className="p-6 flex flex-col gap-2">
                    <Link href={route('admin.dashboard')} className="text-xl font-extrabold tracking-tighter text-white font-serif uppercase">
                        MARRAKECH NUTRITION
                    </Link>
                    <div className="flex items-center gap-3 mt-4 p-3 bg-[#2a3548]/20 border border-[#44483b]/10 rounded-none">
                        <div className="w-10 h-10 bg-[#2a3548] flex items-center justify-center font-bold text-[#ceee93] text-lg rounded-none uppercase">
                            {adminName.slice(0, 2)}
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white uppercase tracking-wider">{adminName}</p>
                            <p className="text-[10px] text-[#c5c8b7] uppercase tracking-widest">Admin Control</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navItems.map((item, index) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={index}
                                href={route(item.route)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-none font-medium transition-all uppercase tracking-wider text-xs ${
                                    active
                                        ? 'bg-white text-[#243600] font-bold border-l-4 border-[#ceee93] bg-gradient-to-r from-white to-[#ceee93]/10'
                                        : 'text-[#c5c8b7] hover:text-white hover:bg-[#2a3548]/50'
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#44483b]/20">
                    <Link
                        href={route('admin.products.create')}
                        className="w-full py-3 bg-[#ceee93] text-[#243600] text-xs font-bold uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 rounded-none shadow-[0_0_10px_rgba(206,238,147,0.1)]"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                        Nouveau Produit
                    </Link>
                </div>
            </aside>

            {/* Main Canvas */}
            <div className="ml-64 flex-1 flex flex-col min-h-screen">
                {/* Header / Top Bar */}
                <header className="flex justify-between items-center w-full px-10 py-6 border-b border-[#44483b]/30 bg-[#081425]/80 backdrop-blur-md sticky top-0 z-40">
                    <h2 className="text-xl font-extrabold uppercase text-white font-serif tracking-tight">
                        {title || 'Overview'}
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-xs uppercase font-bold text-[#c5c8b7] hover:text-white border border-[#44483b]/30 px-3 py-1.5 rounded-none transition">
                                Boutique
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-xs uppercase font-bold text-red-400 hover:text-red-300 border border-red-500/20 px-3 py-1.5 rounded-none transition"
                            >
                                Déconnexion
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-10 max-w-7xl w-full mx-auto">
                    {flash?.status && (
                        <div className="mb-6 bg-[#ceee93]/10 border border-[#ceee93]/30 text-[#ceee93] px-4 py-3 rounded-none text-sm font-semibold">
                            {flash.status}
                        </div>
                    )}
                    {children}
                </main>

                {/* Footer */}
                <footer className="w-full py-6 px-10 border-t border-[#44483b]/20 bg-[#040e1f] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-semibold tracking-widest text-[#c5c8b7]">
                    <p>© 2026 MARRAKECH NUTRITION. PANNEAU D'ADMINISTRATION.</p>
                    <div className="flex gap-6">
                        <Link href="/" className="hover:text-white">Retour à l'accueil</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
