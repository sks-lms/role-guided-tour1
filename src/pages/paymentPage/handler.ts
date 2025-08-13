import { Dispatch, ForwardRefExoticComponent, RefAttributes, SetStateAction, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, LucideProps, Smartphone } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useToast } from "@/hooks/use-toast";
import { useAPI } from "@/hooks/useAPI";

export function useHandler(): [State, Handlers] {
    const [selectedPlan, setSelectedPlan] = useState("monthly");
    const [selectedPayment, setSelectedPayment] = useState("ipay");

    const { toast } = useToast();
    const { POST } = useAPI();

    const location = useLocation();
    const navigate = useNavigate();
    const token = useAppSelector((state: RootState) => state.auth.token);

    const params = new URLSearchParams(location.search);
    const plan = params.get('plan') as 'monthly' | 'annual' || 'monthly';
    const email = params.get('email') || '';

    const plans = {
        monthly: {
            name: "Monthly Plan",
            price: "$16.99",
            period: "per month",
            savings: null
        },
        annual: {
            name: "Annual Plan",
            price: "$179.99",
            period: "per year",
            savings: "Save $23.89"
        }
    };

    const paymentMethods = [
        {
            id: "stripe",
            name: "Credit Card (Stripe)",
            description: "Visa, Mastercard, American Express",
            icon: CreditCard,
            color: "text-blue-600"
        },
        {
            id: "ipay",
            name: "iPay (Local Payment)",
            description: "Credit Cards, LankaQR, iPay App",
            icon: Smartphone,
            color: "text-green-600"
        }
    ];

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        setSelectedPlan(plan);
    }, [token, history]);

    const handleProceedToPayment = async () => {
        if (!email) {
            console.error(`[usePayment => handleProceedToPayment], email is required`);
            return;
        }

        try {
            type responseDto = { url?: string; action?: string; fields?: Record<string, string>; data?: any; }
            console.log(`selectedPayment: ${selectedPayment}`)
            const response: responseDto = await POST<responseDto>('api/payments/checkout', { email, plan, gateway: selectedPayment }, token);
            const ipayData = response.action && response.fields ? response
                : response.data && response.data.action && response.data.fields ? response.data
                    : response.url && typeof response.url === 'object' && (response.url as any).action && (response.url as any).fields ? (response.url as any)
                        : null;
            if (selectedPayment === 'ipay' && ipayData) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = ipayData.action;
                Object.entries(ipayData.fields).forEach(([key, value]) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = String(value);
                    form.appendChild(input);
                });
                document.body.appendChild(form);
                form.submit();
            } else if (response.url && typeof response.url === 'string') {
                window.location.href = response.url;
            } else {
                toast({
                    title: "Payment Error",
                    description: "Failed to initiate payment. Please try again!!.",
                    variant: "destructive"
                });
            }
        } catch (e) {
            toast({
                title: "Payment Error",
                description: "Failed to create checkout session. Please try again!!.",
                variant: "destructive"
            });
        } finally {}
    };

    return [{ selectedPlan, selectedPayment, plans, paymentMethods }, { setSelectedPlan, setSelectedPayment, handleProceedToPayment }]
}

interface State {
    selectedPlan: string;
    selectedPayment: string;
    plans: {
        monthly: {
            name: string;
            price: string;
            period: string;
            savings: any;
        };
        annual: {
            name: string;
            price: string;
            period: string;
            savings: string;
        };
    };
    paymentMethods: {
        id: string;
        name: string;
        description: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
        color: string;
    }[];
};
interface Handlers {
    setSelectedPlan: Dispatch<SetStateAction<string>>;
    setSelectedPayment: Dispatch<SetStateAction<string>>;
    handleProceedToPayment: () => Promise<void>;
};