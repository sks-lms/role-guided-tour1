import { useToast } from "@/hooks/use-toast";
import { useAPI } from "@/hooks/useAPI";
import { useTutorDashboard } from "@/hooks/useTutorDashboard";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { jwtDecode } from "jwt-decode";
import { Users, BookOpen, FileText, TrendingUp, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useEffect, useMemo, useState } from "react";

export function useHandler(): [State, Handlers] {
    const token = useAppSelector((state: RootState) => state.auth.token);
    const [tutorDashboardState, tutorDashboardHandlers] = useTutorDashboard();
    const [dashboardData, setDashboardData] = useState<TutorDashboardOverviewData>(null);
    const [loading, setLoading] = useState(true);
    const { GET, POST } = useAPI();
    const { toast } = useToast();

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

    const stats = useMemo(() => {
        if (!dashboardData) {
            return [
                {
                    title: "Total Students",
                    value: "0",
                    change: "0%",
                    icon: Users,
                    color: "text-primary"
                },
                {
                    title: "Active Courses",
                    value: "0",
                    change: "0",
                    icon: BookOpen,
                    color: "text-secondary"
                },
                {
                    title: "Lessons Created",
                    value: "0",
                    change: "0",
                    icon: FileText,
                    color: "text-accent"
                },
                {
                    title: "Completion Rate",
                    value: "0%",
                    change: "0%",
                    icon: TrendingUp,
                    color: "text-primary"
                }
            ];
        }

        return [
            {
                title: "Total Students",
                value: dashboardData.stats.totalStudents.toString(),
                change: "+0%", // This could be calculated from historical data
                icon: Users,
                color: "text-primary"
            },
            {
                title: "Active Courses",
                value: "0", // This would need to be added to the API response
                change: "0",
                icon: BookOpen,
                color: "text-secondary"
            },
            {
                title: "Lessons Created",
                value: dashboardData.stats.totalLessons.toString(),
                change: "0",
                icon: FileText,
                color: "text-accent"
            },
            {
                title: "Completion Rate",
                value: "0%", // This would need to be calculated
                change: "0%",
                icon: TrendingUp,
                color: "text-primary"
            }
        ];
    }, [dashboardData]);

    const recentActivities = useMemo(() => {
        if (!dashboardData?.activity) {
            return [];
        }

        return dashboardData.activity.slice(-5).map((item, index) => {
            const studentName = item.studentProfile?.name || item.metadata?.studentName || 'Unknown Student';
            const action = item.title || 'Activity';
            const time = new Date(item.createdAt).toLocaleDateString();
            
            return {
                id: index,
                student: studentName,
                action: action,
                course: item.metadata?.lessonTitle || 'Course',
                time: time,
                type: item.type || 'activity'
            };
        });
    }, [dashboardData]);

    const upcomingTasks = useMemo(() => {
        // For now, we'll show placeholder tasks since this data isn't available in the API
        // In the future, this could be fetched from a separate endpoint
        return [
            {
                id: 1,
                title: "Review Student Progress",
                course: "All Courses",
                due: "This Week",
                priority: "medium"
            },
            {
                id: 2,
                title: "Create New Lessons",
                course: "Active Courses",
                due: "Next Week",
                priority: "low"
            }
        ];
    }, []);

    useEffect(() => {
        if (!tutorId || !token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const fetchDashboard = async () => {
            try {
                const response = await GET<TutorDashboardOverviewData>(`/api/tutors/dashboard/${tutorId}/dashboard`, token);
                if (!response) {
                    toast({
                        title: 'Something Went Wrong',
                        variant: 'destructive'
                    });
                }
                setDashboardData(response);
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
        fetchDashboard();
    }, [tutorId, token]);

    const tutorData = useMemo(() => {
        if (dashboardData?.tutor) {
            return {
                name: dashboardData.tutor.name,
                email: dashboardData.tutor.email,
                avatarUrl: dashboardData.tutor.avatarUrl,
                subscriptionStatus: dashboardData.tutor.subscriptionStatus,
                subscriptionEndDate: dashboardData.tutor.subscriptionEndDate,
                studentCount: dashboardData.tutor.studentCount,
                lessonCount: dashboardData.tutor.lessonCount
            };
        }
        return tutorDashboardState.tutorData;
    }, [dashboardData, tutorDashboardState.tutorData]);

    return [{ stats, recentActivities, upcomingTasks, tutorData, loading }, {}];
}

interface State {
    stats: Stat[];
    recentActivities: RecentActivity[];
    upcomingTasks: UpcomingTask[];
    tutorData: { 
        name: string; 
        email?: string;
        avatarUrl?: string;
        subscriptionStatus?: string;
        subscriptionEndDate?: string;
        studentCount?: number;
        lessonCount?: number;
    };
    loading: boolean;
};

interface Handlers {
};

interface Stat {
    title: string;
    value: string;
    change: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    color: string;
}

interface RecentActivity {
    id: number;
    student: string;
    action: string;
    course: string;
    time: string;
    type: string;
}

interface UpcomingTask {
    id: number;
    title: string;
    course: string;
    due: string;
    priority: string;
}

interface TutorDashboardOverviewData {
    tutor: TutorData;
    stats: StatsData;
    activity: any[];
    invitationHistory: InvitationDetailResponseDto[];
}

interface TutorData {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | 'CANCELLED';
    subscriptionType: 'Free' | 'Premium';
    subscriptionEndDate?: string;
    studentCount: number;
    lessonCount: number;
}

interface StatsData {
    totalStudents: number;
    totalLessons: number;
    subscriptionStatus: string;
    youtubeQuotaUsage: number;
}

interface InvitationDetailResponseDto {
    id: string;
    tutorId: string;
    email: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    token: string;
    invitedAt: string;
    acceptedAt?: string;
    studentId?: string;
}