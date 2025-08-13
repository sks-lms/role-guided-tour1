import { useStudentDashboard } from "@/hooks/useStudentDashboard";

export function useHandler(): [State, Handlers] {
    const [studentDashboardState, studentDashboardHandlers] = useStudentDashboard();

    return [{ studentData: studentDashboardState.studentData, loading: studentDashboardState.loading }, {}];
}

interface State {
    studentData: {
        avatarUrl?: string;
    } | null;
    loading: boolean;
};

interface Handlers {
};