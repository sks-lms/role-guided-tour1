import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export function useHandler(onOpenChange: (open: boolean) => void, prefillEmail?: string): [State, Handlers] {
    const [step, setStep] = useState<"email" | "code">("email");
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>();
    const { toast } = useToast();

    const email = watch("email");

    // Pre-fill email if provided
    useEffect(() => {
        if (prefillEmail) {
            setValue("email", prefillEmail);
        }
    }, [prefillEmail, setValue]);

    const handleEmailSubmit = async (data: FormData) => {
        setIsLoading(true);

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/login/request-login-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email, 
                redirectUri: import.meta.env.VITE_APP_BASE_URL + '/student/oauth/redirect' 
            }),
        });

        if (!await response.json()) {
            toast({
                title: 'Something Went Wrong!!',
                description: 'Failed to send code',
                variant: 'destructive'
            });
        } else {
            setStep("code");
        }
        setIsLoading(false);
    };

    const handleCodeSubmit = async (data: FormData) => {
        onOpenChange(false);
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/students/login/verify-login-code?email=${email}&code=${data.code}`;
    };

    const resetForm = () => {
        setStep("email");
    };

    const handleStudentGoogleLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        const redirectUri = import.meta.env.VITE_APP_BASE_URL + '/student/oauth/redirect';
        window.location.href = import.meta.env.VITE_API_BASE_URL + '/api/auth/student/google?redirect_uri=' + redirectUri;
    };

    return [{ step, register, errors, isLoading, email }, { handleSubmit, handleEmailSubmit, handleCodeSubmit, resetForm, handleStudentGoogleLogin }]
}

interface State {
    step: "email" | "code";
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    isLoading: boolean;
    email: string;
};
interface Handlers {
    handleSubmit: UseFormHandleSubmit<FormData, FormData>;
    handleEmailSubmit: (data: FormData) => Promise<void>;
    handleCodeSubmit: (data: FormData) => Promise<void>;
    resetForm: () => void;
    handleStudentGoogleLogin: (e: React.MouseEvent) => void;
};

export interface StudentLoginModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    prefillEmail?: string;
}

interface FormData {
    email: string;
    code: string;
}