import React from 'react';
import AdminLayout from '../../Components/AdminLayout';

export default function Placeholder({ title }) {
    return (
        <AdminLayout title={title}>
            <div className="bg-[#152031] border border-[#44483b]/20 p-8 text-center rounded-none shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                <h3 className="text-xl font-bold text-white mb-2 font-serif uppercase tracking-tight">{title}</h3>
                <p className="text-sm text-[#c5c8b7] mb-6">
                    Cette section est actuellement en cours de développement et sera disponible prochainement.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#ceee93]/30 bg-[#ceee93]/5 text-[#ceee93] text-xs font-bold uppercase tracking-wider rounded-none">
                    <span className="w-2 h-2 rounded-full bg-[#ceee93] animate-ping" />
                    Bientôt Disponible
                </div>
            </div>
        </AdminLayout>
    );
}
