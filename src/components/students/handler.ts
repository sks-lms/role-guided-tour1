import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAPI } from "@/hooks/useAPI";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { jwtDecode } from "jwt-decode";
import { tutorDashboardActions } from "@/redux/tutorDashboardSlice";

export function useHandler(): [State, Handlers] {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [accessDuration, setAccessDuration] = useState("1_month");
    const [customDuration, setCustomDuration] = useState("");
    const [inviteEmail, setInviteEmail] = useState("");

    const { toast } = useToast();
    const { GET, POST } = useAPI();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state: RootState) => state.auth.token);
    const invitationHistory = useAppSelector((state: RootState) => state.tutorDashboard.invitatiotionHistory);

    const students = [
        {
            id: 1,
            name: "Emma Johnson",
            email: "emma.johnson@email.com",
            phone: "+1 (555) 123-4567",
            joinDate: "2024-01-15",
            status: "active",
            courses: ["React Fundamentals", "UI/UX Design"],
            progress: 85,
            lastActive: "2 hours ago",
            inviteStatus: "accepted"
        },
        {
            id: 2,
            name: "Michael Chen",
            email: "michael.chen@email.com",
            phone: "+1 (555) 234-5678",
            joinDate: "2024-02-20",
            status: "active",
            courses: ["Advanced TypeScript", "Node.js Backend"],
            progress: 72,
            lastActive: "1 day ago",
            inviteStatus: "accepted"
        },
        {
            id: 3,
            name: "Sarah Williams",
            email: "sarah.williams@email.com",
            phone: "+1 (555) 345-6789",
            joinDate: "2024-01-10",
            status: "inactive",
            courses: ["React Fundamentals"],
            progress: 45,
            lastActive: "1 week ago",
            inviteStatus: "pending"
        },
        {
            id: 4,
            name: "David Rodriguez",
            email: "david.rodriguez@email.com",
            phone: "+1 (555) 456-7890",
            joinDate: "2024-03-05",
            status: "active",
            courses: ["UI/UX Design", "Advanced TypeScript"],
            progress: 91,
            lastActive: "30 minutes ago",
            inviteStatus: "accepted"
        }
    ];

    const availableCourses = [
        "React Fundamentals",
        "Advanced TypeScript",
        "UI/UX Design",
        "Node.js Backend",
        "Python for Data Science",
        "Mobile App Development"
    ];

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
        const fetchInvitationHistory = async () => {
            if (!token) return; // Don't make API call if no token
            const response = await GET<{ invitations: { email: string; status: 'pending' | 'accepted' | 'rejected'; invitedAt: Date; acceptedAt?: Date; }[] }>('/api/invitations', token);
            if (response) {
                dispatch(tutorDashboardActions.setInvitationHistory(
                    response.invitations.map(invite => ({
                        ...invite,
                        status: invite.status.toUpperCase() as 'PENDING' | 'ACCEPTED' | 'REJECTED',
                        date: invite.acceptedAt ?? invite.invitedAt
                    }))
                ));
            }
        }
        fetchInvitationHistory();
    }, [token, history, dispatch]);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCourseAccess = (student: {
        id: number; name: string; email: string; phone: string; joinDate: string; status: string; courses: string[]; progress: number; lastActive: string; inviteStatus: string;
    }) => {
        setSelectedStudent(student);
        setSelectedCourses(student.courses);
        setIsDialogOpen(true);
    };

    const toggleCourse = (course: string) => {
        setSelectedCourses(prev =>
            prev.includes(course)
                ? prev.filter(c => c !== course)
                : [...prev, course]
        );
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('');
    };

    const onSendInvite = async (e: React.MouseEvent) => {
        const response: { link: string; } = await POST<{ link: string; }>('/api/tutors/students/invite', { email: inviteEmail, tutorId }, token);
        if (response.link !== '') {
            setInviteEmail('');
            toast({ title: "Invitation Sent", description: "Successfully sent the invitation", variant: "success" });
        }
    };

    return [{ students, filteredStudents, isInviteDialogOpen, searchTerm, isDialogOpen, accessDuration, customDuration, selectedStudent, availableCourses, selectedCourses, inviteEmail, invitationHistory }, { getInitials, setIsInviteDialogOpen, setSearchTerm, setIsDialogOpen, setAccessDuration, setCustomDuration, handleCourseAccess, toggleCourse, setInviteEmail, onSendInvite }];
}

interface State {
    students: Student[];
    filteredStudents: Student[];
    isInviteDialogOpen: boolean;
    searchTerm: string;
    isDialogOpen: boolean;
    accessDuration: string;
    customDuration: string;
    selectedStudent: Student;
    availableCourses: string[];
    selectedCourses: string[];
    inviteEmail: string;
    invitationHistory: INVITATION[];
};
interface Handlers {
    getInitials: (name: string) => string;
    setIsInviteDialogOpen: Dispatch<SetStateAction<boolean>>;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    setAccessDuration: Dispatch<SetStateAction<string>>;
    setCustomDuration: Dispatch<SetStateAction<string>>;
    handleCourseAccess: (student: Student) => void;
    toggleCourse: (course: string) => void;
    setInviteEmail: Dispatch<SetStateAction<string>>;
    onSendInvite: (e: React.MouseEvent<Element, MouseEvent>) => Promise<void>;
};

interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    joinDate: string;
    status: string;
    courses: string[];
    progress: number;
    lastActive: string;
    inviteStatus: string;
}

interface INVITATION {
    email: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    date: Date;
};