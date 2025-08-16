import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAPI } from "@/hooks/useAPI";

// Helper function to check if email is Gmail
const isGmail = (email: string): boolean => {
    return email.toLowerCase().endsWith('@gmail.com');
};

export function useHandler(): [State, Handlers] {
    const [email, setEmail] = useState("");
    const [tutorId, setTutorId] = useState("");
    const [invitationId, setInvitationId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
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
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setEmail(decoded.email);
                setTutorId(decoded.tutorId);
                // Extract invitation ID from token (new format)
                if (decoded.invitationId) {
                    setInvitationId(decoded.invitationId);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                toast({
                    title: "Invalid Invitation",
                    description: "The invitation link is invalid or has expired.",
                    variant: "destructive"
                });
                navigate("/");
            }
        }
    }, [location, navigate, toast]);

    const handleAccept = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            // Simulate API call
            // await new Promise(resolve => setTimeout(resolve, 1500));
            const { firstName, lastName } = form.getValues();
            
            // Use invitation ID for acceptance (new approach)
            if (!invitationId) {
                throw new Error('Invitation ID not found in token');
            }

            const response = await POST<{ message: string; redirectUrl: string; }>('/api/students/onboard', { 
                email, 
                name: firstName + ' ' + lastName, 
                tutorId,
                invitationId 
            }, '');
            
            if (response) {
                toast({
                    title: "Invitation Accepted!",
                    description: response.message + "Welcome to the Learning Management System. You can now access your courses.",
                    variant: "success"
                });

                // Check if email is Gmail type
                if (isGmail(email)) {
                    // For Gmail emails, redirect to student dashboard with OAuth token
                    const url = new URL(response.redirectUrl);
                    setTimeout(() => {
                        navigate(url.pathname + url.search);
                    }, 2000);
                } else {
                    // For non-Gmail emails, show login modal
                    setShowLoginModal(true);
                }
            }
        } catch (error: any) {
            // Handle specific error cases
            let errorMessage = "Failed to accept invitation. Please try again.";
            
            if (error?.data?.message) {
                const message = error.data.message;
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
            } else if (error?.message === 'Invitation ID not found in token') {
                errorMessage = "Invalid invitation link. Please check the link and try again.";
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
        setIsLoading(true);
        try {
            // Use invitation ID for rejection (new approach)
            if (!invitationId) {
                throw new Error('Invitation ID not found in token');
            }

            const response = await POST<{}>('/api/invitations/reject-invitation', { invitationId }, '');
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
            
            if (error?.data?.message) {
                const message = error.data.message;
                if (message.includes('Invitation not found')) {
                    errorMessage = "Invitation not found. It may have expired or been removed.";
                } else if (message.includes('already been accepted')) {
                    errorMessage = "This invitation has already been accepted and cannot be rejected.";
                } else if (message.includes('already been rejected')) {
                    errorMessage = "This invitation has already been rejected.";
                } else if (message.includes('Invalid invitation state')) {
                    errorMessage = "This invitation is in an invalid state and cannot be rejected.";
                } else {
                    errorMessage = message;
                }
            } else if (error?.message === 'Invitation ID not found in token') {
                errorMessage = "Invalid invitation link. Please check the link and try again.";
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

    return [{ email, form, isLoading, showLoginModal }, { handleAccept, handleReject, setShowLoginModal }]
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
    showLoginModal: boolean;
};
interface Handlers {
    handleAccept: (values: {
        email?: string;
        firstName?: string;
        lastName?: string;
    }) => Promise<void>;
    handleReject: () => Promise<void>;
    setShowLoginModal: (show: boolean) => void;
};