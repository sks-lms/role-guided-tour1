import { LayoutDashboard, Users, BookOpen, FileText, LucideProps } from "lucide-react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../ui/sidebar";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useTutorDashboard } from "@/hooks/useTutorDashboard";

export function useHandler(): [State, Handlers] {
    const [tutorState, tutorHandlers] = useTutorDashboard();
    const navigate = useNavigate();
    const { state } = useSidebar();
    const location = useLocation();
    const currentPath = location.pathname;
    const collapsed = state === "collapsed";

    const menuItems = [
        { title: "Dashboard", url: "/tutor-dashboard/home", icon: LayoutDashboard },
        { title: "Students", url: "/tutor-dashboard/students", icon: Users },
        { title: "Courses", url: "/tutor-dashboard/courses", icon: BookOpen },
        { title: "Lessons", url: "/tutor-dashboard/lessons", icon: FileText },
    ];

    const isActive = (path: string) => {
        if (path === "/") return currentPath === "/";
        return currentPath.startsWith(path);
    };

    const getNavClass = (path: string) => {
        const baseClass = "transition-all duration-300 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
        if (isActive(path)) {
            return `${baseClass} bg-sidebar-primary text-sidebar-primary-foreground shadow-glow`;
        }
        return baseClass;
    };

    return [{ collapsed, menuItems, profileData: tutorState.tutorData, loading: tutorState.loading }, { getNavClass, navigate }];
}

interface State {
    collapsed: boolean;
    menuItems: {
        title: string;
        url: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[];
    profileData: {
        name: string;
        avatarUrl?: string;
    } | null;
    loading: boolean;
};

interface Handlers {
    getNavClass: (path: string) => "transition-all duration-300 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" | "transition-all duration-300 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground bg-sidebar-primary text-sidebar-primary-foreground shadow-glow";
    navigate: NavigateFunction;
};