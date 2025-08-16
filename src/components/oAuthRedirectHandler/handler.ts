import { useAPI } from "@/hooks/useAPI";
import { authActions } from "@/redux/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useHandler(): [State, Handlers] {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { GET } = useAPI();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');
        const email = params.get('email');

        if (error) {
            console.error('OAuth error:', error);
            navigate('/?error=' + encodeURIComponent(error));
            return;
        };

        const redirectToDashboard = (userType: string) => {
            if (userType === 'tutor') {
                navigate('/tutor-dashboard/home');
            } else {
                navigate('/student-dashboard/home');
            }
        };

        const handleTutorPaymentFlow = async (token: string) => {
            try {
                const decoded: any = jwtDecode(token);
                const tutorId = decoded.id;

                type responseDto = { id: string; email: string; subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'CANCELLED'; }
                const response: responseDto = await GET<responseDto>(`/api/tutors/${tutorId}`, token);

                if (response.subscriptionStatus === 'ACTIVE') {
                    navigate('/tutor-dashboard/home');
                } else {
                    // Redirect to payment selection page instead of directly to checkout
                    const plan = sessionStorage.getItem('selectedTutorPlan') || 'monthly';
                    navigate(`/payment?plan=${plan}&email=${response.email}`);
                }
            } catch (err: any) {
                console.error('Payment initiation failed:', err);
                navigate('/');
            }
        };

        if (token) {
            const userType = location.pathname.includes('/tutor/') ? 'tutor' : 'student';

            dispatch(authActions.login({ token, userType }));

            if (userType === 'tutor') {
                handleTutorPaymentFlow(token);
            } else {
                redirectToDashboard(userType);
            }
        } else if (email && location.pathname.includes('/student/')) {
            const redirectUri = window.location.origin + '/student/oauth/redirect';
            const oAuthUrl = `${import.meta.env.VITE_API_BASE_URL}/api/auth/student/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
            window.location.href = oAuthUrl;
        } else {
            navigate('/');
        }
    }, [location, history, dispatch]);

    return [{}, {}];
}

interface State {
};
interface Handlers {
};