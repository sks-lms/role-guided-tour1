import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAPI } from "@/hooks/useAPI";

export function useHandler(): [State, Handlers] {
    const [email, setEmail] = useState("");
    const [tutorId, setTutorId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { POST } = useAPI();
    const navigate = useNavigate();
    const location = useLocation();

    const formSchema = z.object({
        // email: z.string().email("Please enter a valid email address"),
        firstName: z.string().min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // email: "",
            firstName: "",
            lastName: "",
        },
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const decoded: any = jwtDecode(token);
        setEmail(decoded.email);
        setTutorId(decoded.tutorId);
    }, [location, history]);

    const handleAccept = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            // Simulate API call
            // await new Promise(resolve => setTimeout(resolve, 1500));
            const { firstName, lastName } = form.getValues();
            const response = await POST<{ message: string; redirectUrl: string; }>('/api/students/onboard', { email, name: firstName + ' ' + lastName, tutorId }, '');
            const url = new URL(response.redirectUrl);
            if (response) {
                toast({
                    title: "Invitation Accepted!",
                    description: response.message + "Welcome to the Learning Management System. You can now access your courses.",
                    variant: "success"
                });
                // Navigate to student dashboard
                setTimeout(() => {
                    navigate(url.pathname + url.search);
                }, 5500);
            }
        } catch (error: any) {
            // Handle specific error cases
            let errorMessage = "Failed to accept invitation. Please try again.";
            
            if (error?.response?.data?.message) {
                const message = error.response.data.message;
                if (message.includes('Invitation not found')) {
                    errorMessage = "Invitation not found. It may have expired or been removed.";
                } else if (message.includes('already been accepted')) {
                    errorMessage = "This invitation has already been accepted and cannot be used again.";
                } else if (message.includes('already been rejected')) {
                    errorMessage = "This invitation has already been rejected and cannot be accepted.";
                } else if (message.includes('Invalid invitation state')) {
                    errorMessage = "This invitation is in an invalid state and cannot be processed.";
                } else {
                    errorMessage = message;
                }
            }
            
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            const response = await POST<{}>('/api/invitations/reject-invitation', { email, tutorId }, '');
            if (response) {
                toast({
                    title: "Invitation Rejected",
                    description: "You have declined the invitation to join this course.",
                    variant: 'default'
                });
                setTimeout(() => {
                    navigate("/");
                }, 5500);
            }
        } catch (error: any) {
            // Handle specific error cases
            let errorMessage = "Failed to reject invitation. Please try again.";
            
            if (error?.response?.data?.message) {
                const message = error.response.data.message;
                if (message.includes('Invitation not found')) {
                    errorMessage = "Invitation not found. It may have expired or been removed.";
                } else if (message.includes('already been accepted')) {
                    errorMessage = "This invitation has already been accepted and cannot be rejected.";
                } else if (message.includes('already been rejected')) {
                    errorMessage = "This invitation has already been rejected.";
                } else {
                    errorMessage = message;
                }
            }
            
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    return [{ email, form, isLoading }, { handleAccept, handleReject }]
}

interface State {
    email: string;
    form: UseFormReturn<{
        email?: string;
        firstName?: string;
        lastName?: string;
    }, any, {
        email?: string;
        firstName?: string;
        lastName?: string;
    }>;
    isLoading: boolean;
};
interface Handlers {
    handleAccept: (values: {
        email?: string;
        firstName?: string;
        lastName?: string;
    }) => Promise<void>;
    handleReject: () => Promise<void>;
};