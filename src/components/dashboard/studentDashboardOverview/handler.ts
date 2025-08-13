import { useStudentDashboard } from "@/hooks/useStudentDashboard";

export function useHandler(): [State, Handlers] {
    const [studentDashboardState, studentDashboardHandlers] = useStudentDashboard();

    const enrolledCourses = [
        {
            id: 1,
            title: "Web Development",
            instructor: "Michael Johnson",
            progress: 75,
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
            lessons: 12,
            duration: "8 weeks"
        },
        {
            id: 2,
            title: "Data Science",
            instructor: "Sarah Wilson",
            progress: 45,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
            lessons: 15,
            duration: "10 weeks"
        },
        {
            id: 3,
            title: "Mobile Development",
            instructor: "David Chen",
            progress: 20,
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
            lessons: 10,
            duration: "6 weeks"
        }
    ];

    const recentLessons = [
        {
            id: 1,
            title: "Introduction to React Hooks",
            course: "Web Development",
            duration: "25 min",
            completed: true
        },
        {
            id: 2,
            title: "Data Visualization with Python",
            course: "Data Science",
            duration: "30 min",
            completed: false
        },
        {
            id: 3,
            title: "Flutter Widgets Basics",
            course: "Mobile Development",
            duration: "20 min",
            completed: false
        }
    ];

    const recommendations = [
        {
            id: 1,
            title: "Complete your React course",
            description: "You're 75% done! Finish the remaining lessons.",
            course: "Web Development"
        },
        {
            id: 2,
            title: "Try Data Science fundamentals",
            description: "Based on your interests in programming.",
            course: "Data Science"
        }
    ];

    return [{ enrolledCourses, recentLessons, recommendations, studentData: studentDashboardState.studentData }, {}];
}

interface State {
    enrolledCourses: {
        id: number;
        title: string;
        instructor: string;
        progress: number;
        image: string;
        lessons: number;
        duration: string;
    }[];
    recentLessons: {
        id: number;
        title: string;
        course: string;
        duration: string;
        completed: boolean;
    }[];
    recommendations: {
        id: number;
        title: string;
        description: string;
        course: string;
    }[];
    studentData: { name: string; }; 
};

interface Handlers {
};

interface Course {
    id: number;
    title: string;
    instructor: string;
    progress: number;
    image: string;
    lessons: number;
    duration: string;
}

interface Lesson {
    id: number;
    title: string;
    course: string;
    duration: string;
    completed: boolean;
}

interface Recommendation {
    id: number;
    title: string;
    description: string;
    course: string;
}