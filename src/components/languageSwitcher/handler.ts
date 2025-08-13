import { SetStateAction, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

export function useHandler(): [State, Handlers] {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    // Ensure `selectedLanguage` always matches the `i18n.language`
    const [selectedLanguage, setSelectedLanguage] = useState<Language>({
        code: i18n.language || 'en',
        name: "English",  // Default name (can be improved)
        nativeName: "English",  // Default native name
        flag: "🇺🇸",  // Default flag
    });

    const languages: Language[] = [
        { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
        { code: "si", name: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰" },
        { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
        // { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
        // { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
        // { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
        // { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
        // { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
        // { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
        // { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
        // { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
        // { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
    ];

    useEffect(() => {
        // Listen for language changes and update the selected language state
        const handleLanguageChange = () => {
            setSelectedLanguage({
                code: i18n.language,
                name: languages.find((lang) => lang.code === i18n.language)?.name || "English",
                nativeName: languages.find((lang) => lang.code === i18n.language)?.nativeName || "English",
                flag: languages.find((lang) => lang.code === i18n.language)?.flag || "🇺🇸",
            });
        };
        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange); // Cleanup listener
        };
    }, [i18n]);

    const handleLanguageChange = (language: Language) => {
        i18n.changeLanguage(language.code);
        // setSelectedLanguage(language);
        setIsOpen(false);
    };

    return [{ languages, isOpen, selectedLanguage }, { setIsOpen, handleLanguageChange }];
}

interface State {
    languages: Language[],
    isOpen: boolean,
    selectedLanguage: Language;
    // currentLang: string,
};

interface Handlers {
    setIsOpen: (value: SetStateAction<boolean>) => void;
    handleLanguageChange: (language: Language) => void;
};

interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

export interface LanguageSwitcherProps {
    className?: string;
    variant?: "default" | "minimal";
}