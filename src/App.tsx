import { Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboardLayout";
import { StudentDashboardLayout } from "@/components/studentDashboardLayout";
import { DashboardOverview } from "@/components/dashboard/dashboardOverview";
import { StudentDashboardOverview } from "@/components/dashboard/studentDashboardOverview";
import { StudentsView } from "./components/students";
import { CoursesView } from "@/components/courses/CoursesView";
import { StudentCoursesView } from "@/components/courses/StudentCoursesView";
import { LessonsView } from "@/components/lessons/LessonsView";
import { StudentLessonsView } from "@/components/lessons/StudentLessonsView";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { sessionActions } from "./redux/sessionSlice";
import { tourActions } from "./redux/tourSlice";
import { useTokenValidation } from "./hooks/useTokenValidation";

interface AppProps { role: 'tutor' | 'student' };

export default function App({ role }: AppProps) {
  const dispatch = useAppDispatch();
  
  // Use token validation hook
  useTokenValidation();

  useEffect(() => {
    // Initialize tour state from localStorage
    dispatch(tourActions.initializeTourFromStorage());

    const handleSessionExpired = () => {
      dispatch(sessionActions.setShowSessionExpired(true));
    };
    window.addEventListener('sessionExpired', handleSessionExpired);
    return () => { window.removeEventListener('sessionExpired', handleSessionExpired); };
  }, [dispatch]);

  return (
    <Routes>
      {role === "tutor" ? (
        <Route path="/" element={<DashboardLayout />}>
          <Route path="home" element={<DashboardOverview />} />
          <Route path="students" element={<StudentsView />} />
          <Route path="courses" element={<CoursesView />} />
          <Route path="lessons" element={<LessonsView />} />
        </Route>
      ) : (
        <Route path="/" element={<StudentDashboardLayout />}>
          <Route path="home" element={<StudentDashboardOverview />} />
          <Route path="courses" element={<StudentCoursesView />} />
          <Route path="lessons" element={<StudentLessonsView />} />
        </Route>
      )}
    </Routes>
  );
}