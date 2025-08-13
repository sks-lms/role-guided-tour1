import { LayoutDashboard, BookOpen, FileText, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../ui/sidebar";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";

export function useHandler(): [State, Handlers] {
    const [studentState, studentHandlers] = useStudentDashboard();
    const navigate = useNavigate();
    const { state } = useSidebar();
    const location = useLocation();
    const currentPath = location.pathname;
    const collapsed = state === "collapsed";

    const menuItems = [
        { title: "Dashboard", url: "/student-dashboard/home", icon: LayoutDashboard },
        { title: "Courses", url: "/student-dashboard/courses", icon: BookOpen },
        { title: "Lessons", url: "/student-dashboard/lessons", icon: FileText },
    ];

    const isActive = (path: string) => {
        if (path === "/student/dashboard") return currentPath === "/student/dashboard";
        return currentPath.startsWith(path);
    };

    const getNavClass = (path: string) => {
        const baseClass = "transition-all duration-300 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
        if (isActive(path)) {
            return `${baseClass} bg-sidebar-primary text-sidebar-primary-foreground shadow-glow`;
        }
        return baseClass;
    };

    return [{ menuItems, collapsed, profileData: studentState.studentData, loading: studentState.loading }, { getNavClass, navigate }];
}

interface State {
    menuItems: {
        title: string;
        url: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[];
    collapsed: boolean;
    profileData: {
        name?: string;
        avatarUrl?: string;
    } | null;
    loading: boolean;
};

interface Handlers {
    getNavClass: (path: string) => "transition-all duration-300 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" | "transition-all duration-300 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground bg-sidebar-primary text-sidebar-primary-foreground shadow-glow";
    navigate: NavigateFunction;
};