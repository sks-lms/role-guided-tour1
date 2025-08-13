import { useTutorDashboard } from "@/hooks/useTutorDashboard";

export function useHandler(): [State, Handlers] {
    const [tutorDashboardState, tutorDashboardHandlers] = useTutorDashboard();

    return [{ tutorData: tutorDashboardState.tutorData, loading: tutorDashboardState.loading }, {}];
}

interface State {
    tutorData: {
        avatarUrl?: string;
    } | null;
    loading: boolean;
};

interface Handlers {
};