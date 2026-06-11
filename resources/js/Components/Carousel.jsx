import React, { useCallback, useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '../Contexts/LanguageContext';

// Fallback background used for slides that don't have an image.
const DEFAULT_GRADIENT = 'from-red-700 via-red-600 to-orange-500';

export default function Carousel({ slides }) {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goTo = useCallback(
        (index) => {
            setActiveIndex((index + slides.length) % slides.length);
        },
        [slides.length],
    );

    useEffect(() => {
        if (isPaused || slides.length <= 1) return undefined;

        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [isPaused, slides.length]);

    return (
        <div
            className="relative mb-10 overflow-hidden rounded-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative h-[380px] sm:h-[400px]">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        aria-hidden={index !== activeIndex}
                        className={`absolute inset-0 flex items-center justify-center px-6 text-center text-white transition-opacity duration-700 ${
                            slide.image ? 'bg-cover bg-center' : `bg-gradient-to-br ${DEFAULT_GRADIENT}`
                        } ${index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'}`}
                        style={slide.image ? { backgroundImage: `url(/storage/${slide.image})` } : undefined}
                    >
                        {slide.image && <div className="absolute inset-0 bg-black/40" />}
                        <div className="relative max-w-2xl">
                            {slide.eyebrow && (
                                <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
                                    {slide.eyebrow}
                                </span>
                            )}
                            <h1 className="mb-4 text-2xl font-extrabold sm:text-5xl">{slide.title}</h1>
                            {slide.subtitle && (
                                <p className="mx-auto mb-8 max-w-xl text-white/90">{slide.subtitle}</p>
                            )}
                            {slide.cta_label && slide.cta_link && (
                                <Link
                                    href={slide.cta_link}
                                    className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-white px-6 py-3 font-semibold text-red-700 transition-colors hover:bg-red-50"
                                >
                                    {slide.cta_label}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {slides.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={() => goTo(activeIndex - 1)}
                        aria-label={t('Diapositive précédente')}
                        className="absolute left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 sm:left-4 sm:flex"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo(activeIndex + 1)}
                        aria-label={t('Diapositive suivante')}
                        className="absolute right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50 sm:right-4 sm:flex"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.id}
                                type="button"
                                onClick={() => goTo(index)}
                                aria-label={t('Aller à la diapositive {{n}}', { n: index + 1 })}
                                aria-current={index === activeIndex}
                                className={`h-2.5 rounded-full transition-all ${
                                    index === activeIndex ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/75'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
