import React from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '../Contexts/LanguageContext';

/**
 * Breadcrumb navigation component.
 * @param {{ label: string, href?: string }[]} items - Crumbs from left to right; last item has no href.
 */
export default function Breadcrumb({ items }) {
    const { t } = useTranslation();

    return (
        <nav aria-label={t("Fil d'Ariane")} className="mb-4">
            <ol
                className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
            >
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-1.5"
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                    >
                        {index > 0 && (
                            <svg
                                className="w-3 h-3 text-gray-400 shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:text-red-600 transition-colors"
                                itemProp="item"
                            >
                                <span itemProp="name">{item.label}</span>
                            </Link>
                        ) : (
                            <span
                                className="text-gray-900 font-medium"
                                itemProp="name"
                                aria-current="page"
                            >
                                {item.label}
                            </span>
                        )}
                        <meta itemProp="position" content={String(index + 1)} />
                    </li>
                ))}
            </ol>
        </nav>
    );
}
