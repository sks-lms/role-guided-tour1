import { useTutorDashboard } from "@/hooks/useTutorDashboard";
import { Users, BookOpen, FileText, TrendingUp, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function useHandler(): [State, Handlers] {
    const [tutorDashboardState, tutorDashboardHandlers] = useTutorDashboard();

    const stats = [
        {
            title: "Total Students",
            value: "248",
            change: "+12%",
            icon: Users,
            color: "text-primary"
        },
        {
            title: "Active Courses",
            value: "12",
            change: "+2",
            icon: BookOpen,
            color: "text-secondary"
        },
        {
            title: "Lessons Created",
            value: "156",
            change: "+8",
            icon: FileText,
            color: "text-accent"
        },
        {
            title: "Completion Rate",
            value: "87%",
            change: "+5%",
            icon: TrendingUp,
            color: "text-primary"
        }
    ];

    const recentActivities = [
        {
            id: 1,
            student: "Emma Johnson",
            action: "Completed lesson",
            course: "React Fundamentals",
            time: "2 hours ago",
            type: "completion"
        },
        {
            id: 2,
            student: "Michael Chen",
            action: "Started course",
            course: "Advanced TypeScript",
            time: "4 hours ago",
            type: "enrollment"
        },
        {
            id: 3,
            student: "Sarah Williams",
            action: "Submitted assignment",
            course: "UI/UX Design",
            time: "6 hours ago",
            type: "submission"
        },
        {
            id: 4,
            student: "David Rodriguez",
            action: "Asked question",
            course: "Node.js Backend",
            time: "8 hours ago",
            type: "question"
        }
    ];

    const upcomingTasks = [
        {
            id: 1,
            title: "Grade Assignment Submissions",
            course: "React Fundamentals",
            due: "Today, 4:00 PM",
            priority: "high"
        },
        {
            id: 2,
            title: "Prepare Lesson Materials",
            course: "Advanced TypeScript",
            due: "Tomorrow, 10:00 AM",
            priority: "medium"
        },
        {
            id: 3,
            title: "Student Progress Review",
            course: "UI/UX Design",
            due: "Dec 10, 2:00 PM",
            priority: "low"
        }
    ];

    return [{ stats, recentActivities, upcomingTasks, tutorData: tutorDashboardState.tutorData }, {}];
}

interface State {
    stats: Stat[];
    recentActivities: RecentActivity[];
    upcomingTasks: UpcomingTask[];
    tutorData: { name: string; };
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