import React, { useState } from "react";
import { ChevronDown, Globe, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

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

interface LanguageSwitcherProps {
    className?: string;
    variant?: "default" | "minimal";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    className,
    variant = "default"
}) => {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (language: Language) => {
        setSelectedLanguage(language);
        setIsOpen(false);
        // Here you would typically implement the actual language change logic
        console.log("Language changed to:", language.code);
    };

    if (variant === "minimal") {
        return (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-8 w-8 p-0 hover:bg-accent transition-all duration-300",
                            className
                        )}
                    >
                        <Globe className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="w-56 p-2 border-border/50 shadow-elegant animate-scale-in"
                >
                    {languages.map((language) => (
                        <DropdownMenuItem
                            key={language.code}
                            onClick={() => handleLanguageChange(language)}
                            className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-all duration-200 group cursor-pointer"
                        >
                            <span className="text-lg">{language.flag}</span>
                            <div className="flex-1">
                                <p className="font-medium text-sm">{language.name}</p>
                                <p className="text-xs text-muted-foreground">{language.nativeName}</p>
                            </div>
                            {selectedLanguage.code === language.code && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "h-10 px-4 gap-2 border-border/50 hover:border-primary hover:shadow-card transition-all duration-300 group",
                        className
                    )}
                >
                    <Globe className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="hidden sm:inline text-sm font-medium">
                        {selectedLanguage.nativeName}
                    </span>
                    <span className="text-lg">{selectedLanguage.flag}</span>
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 text-muted-foreground transition-all duration-300",
                            isOpen && "rotate-180"
                        )}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-64 p-2 border-border/50 shadow-elegant animate-scale-in"
            >
                <div className="px-3 py-2 mb-2">
                    <p className="text-sm font-medium text-foreground">Select Language</p>
                    <p className="text-xs text-muted-foreground">Choose your preferred language</p>
                </div>
                <div className="space-y-1">
                    {languages.map((language) => (
                        <DropdownMenuItem
                            key={language.code}
                            onClick={() => handleLanguageChange(language)}
                            className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-all duration-200 group cursor-pointer"
                        >
                            <span className="text-lg">{language.flag}</span>
                            <div className="flex-1">
                                <p className="font-medium text-sm">{language.name}</p>
                                <p className="text-xs text-muted-foreground">{language.nativeName}</p>
                            </div>
                            {selectedLanguage.code === language.code && (
                                <Check className="h-4 w-4 text-primary animate-scale-in" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};