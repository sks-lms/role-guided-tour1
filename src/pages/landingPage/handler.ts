import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

export function useHandler(): [State, Handlers] {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const { t } = useTranslation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleTutorSubscriptionLogin = (e: React.MouseEvent, plan: 'monthly' | 'annual') => {
        e.preventDefault();
        sessionStorage.setItem('selectedTutorPlan', plan);
        const redirectUri = import.meta.env.VITE_APP_BASE_URL + '/tutor/oauth/redirect';
        window.location.href = import.meta.env.VITE_API_BASE_URL + '/api/auth/tutor/google?redirect_uri=' + redirectUri;
    }

    const handleTutorLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        const redirectUri = import.meta.env.VITE_APP_BASE_URL + '/tutor/oauth/redirect';
        window.location.href = import.meta.env.VITE_API_BASE_URL + '/api/auth/tutor/google?redirect_uri=' + redirectUri;
    }

    return [{ isMobileMenuOpen, t, isStudentModalOpen }, { setIsMobileMenuOpen, toggleMobileMenu, handleTutorSubscriptionLogin, handleTutorLogin, setIsStudentModalOpen }]
}

interface State {
    isMobileMenuOpen: boolean;
    t: TFunction<"translation", undefined>;
    isStudentModalOpen: boolean;
};
interface Handlers {
    setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
    toggleMobileMenu: () => void;
    handleTutorSubscriptionLogin: (e: React.MouseEvent, plan: "monthly" | "annual") => void;
    handleTutorLogin: (e: React.MouseEvent) => void;
    setIsStudentModalOpen: Dispatch<SetStateAction<boolean>>;
};