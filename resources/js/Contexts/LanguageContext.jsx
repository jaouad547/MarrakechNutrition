import { createContext, useContext, useMemo } from 'react';
import en from '../lang/en.json';

const LanguageContext = createContext({
    locale: 'fr',
    t: (str) => str,
});

export function LanguageProvider({ locale, children }) {
    const value = useMemo(() => {
        const t = (str, vars) => {
            let result = locale === 'en' && en[str] ? en[str] : str;

            if (vars) {
                for (const [key, val] of Object.entries(vars)) {
                    result = result.replaceAll(`{{${key}}}`, val);
                }
            }

            return result;
        };

        return { locale, t };
    }, [locale]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    return useContext(LanguageContext);
}
