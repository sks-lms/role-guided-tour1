import { useEffect, useMemo, useState } from "react";
import { useAPI } from "@/hooks/useAPI";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";

export function useTutorDashboard(): [State, Handlers] {
    const token = useAppSelector((state: RootState) => state.auth.token);
    const { GET } = useAPI();
    const { toast } = useToast();
    const [tutorData, setTutorData] = useState<{ name: string; avatarUrl?: string; } | null>(null);
    const [loading, setLoading] = useState(true);

    // Use useMemo for tutorId so it updates when token changes
    const tutorId = useMemo(() => {
        if (token) {
            try {
                const decoded = jwtDecode<{ id?: string; sub?: string; }>(token);
                return decoded.id || null;
            } catch (e) {
                return null;
            }
        }
        return null;
    }, [token]);

    useEffect(() => {
        if (!tutorId || !token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const fetchTutorData = async () => {
            try {
                const response = await GET<{ name: string; avatarUrl?: string; }>(`/api/tutors/${tutorId}`, token);
                if (!response) {
                    toast({
                        title: 'Something Went Wrong',
                        variant: 'destructive'
                    });
                }
                setTutorData(response);
            } catch (e) {
                toast({
                    title: 'Something Went Wrong',
                    description: e,
                    variant: 'destructive'
                });
            } finally {
                setLoading(false);
            }
        }
        fetchTutorData();
    }, [token, tutorId]);

    return [{ tutorData, loading }, {}];
}

interface State {
    tutorData: {
        name: string;
        avatarUrl?: string;
    } | null;
    loading: boolean;
};

interface Handlers {
};