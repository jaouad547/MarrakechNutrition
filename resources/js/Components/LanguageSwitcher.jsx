import { Link } from '@inertiajs/react';
import { useTranslation } from '../Contexts/LanguageContext';

export default function LanguageSwitcher({ className = '' }) {
    const { locale } = useTranslation();

    return (
        <div className={`flex items-center gap-1 text-xs font-bold tracking-wide ${className}`}>
            <Link
                href={route('locale.set', 'fr')}
                preserveScroll
                className={`px-1.5 py-0.5 rounded transition ${
                    locale === 'fr' ? 'text-red-500' : 'text-zinc-400 hover:text-white'
                }`}
            >
                FR
            </Link>
            <span className="text-zinc-600">|</span>
            <Link
                href={route('locale.set', 'en')}
                preserveScroll
                className={`px-1.5 py-0.5 rounded transition ${
                    locale === 'en' ? 'text-red-500' : 'text-zinc-400 hover:text-white'
                }`}
            >
                EN
            </Link>
        </div>
    );
}
