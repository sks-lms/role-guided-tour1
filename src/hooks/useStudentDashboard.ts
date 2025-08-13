import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { useAPI } from "./useAPI";
import { useToast } from "./use-toast";
import { jwtDecode } from "jwt-decode";

export function useStudentDashboard(): [State, Handlers] {
    const token = useAppSelector((state: RootState) => state.auth.token);
    const { GET } = useAPI();
    const { toast } = useToast();
    const [studentData, setStudentData] = useState<{ name: string; avatarUrl?: string; } | null>(null);
    const [loading, setLoading] = useState(true);

    // Use useMemo for tutorId so it updates when token changes
    const studentId = useMemo(() => {
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
        if (!studentId || !token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const fetchStudentData = async () => {
            try {
                const response = await GET<{ name: string; avatarUrl?: string; }>(`/api/students/${studentId}`, token);
                if (!response) {
                    toast({
                        title: 'Something Went Wrong',
                        variant: 'destructive'
                    });
                }
                setStudentData(response);
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
        fetchStudentData();
    }, [token, studentId]);

    return [{ studentData, loading }, {}];
}

interface State {
    studentData: {
        name: string;
        avatarUrl?: string;
    } | null;
    loading: boolean;
};

interface Handlers {
};