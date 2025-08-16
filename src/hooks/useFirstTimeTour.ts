import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { tourActions } from '@/redux/tourSlice';

export function useFirstTimeTour() {
<<<<<<< Updated upstream
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userType = useAppSelector((state) => state.auth.userType);
  const { tutorTourCompleted, studentTourCompleted } = useAppSelector((state) => state.tour);

  useEffect(() => {
    // Initialize tour completion status from localStorage
    dispatch(tourActions.initializeTourFromStorage());
  }, [dispatch]);

  const shouldShowTour = (): boolean => {
    const currentPath = location.pathname;
    
    // Check if user is on dashboard home page
    const isTutorHome = currentPath === '/tutor-dashboard/home';
    const isStudentHome = currentPath === '/student-dashboard/home';
    
    if (userType === 'tutor' && isTutorHome) {
      return !tutorTourCompleted;
    }
    
    if (userType === 'student' && isStudentHome) {
      return !studentTourCompleted;
    }
    
    return false;
  };

  const markTourAsCompleted = () => {
    if (userType === 'tutor') {
      dispatch(tourActions.setTutorTourCompleted(true));
    } else if (userType === 'student') {
      dispatch(tourActions.setStudentTourCompleted(true));
    }
  };

  const resetTourForRole = () => {
    if (userType === 'tutor') {
      dispatch(tourActions.setTutorTourCompleted(false));
    } else if (userType === 'student') {
      dispatch(tourActions.setStudentTourCompleted(false));
    }
  };

  return {
    shouldShowTour: shouldShowTour(),
    markTourAsCompleted,
    resetTourForRole,
    userType,
  };
=======
    const location = useLocation();
    const dispatch = useAppDispatch();
    const userType = useAppSelector((state) => state.auth.userType);
    const { tutorTourCompleted, studentTourCompleted } = useAppSelector((state) => state.tour);

    useEffect(() => {
        // Initialize tour completion status from localStorage
        dispatch(tourActions.initializeTourFromStorage());
    }, [dispatch]);

    const shouldShowTour = (): boolean => {
        const currentPath = location.pathname;

        // Check if user is on dashboard home page
        const isTutorHome = currentPath === '/tutor-dashboard/home';
        const isStudentHome = currentPath === '/student-dashboard/home';

        if (userType === 'tutor' && isTutorHome) {
            return !tutorTourCompleted;
        }

        if (userType === 'student' && isStudentHome) {
            return !studentTourCompleted;
        }

        return false;
    };

    const markTourAsCompleted = () => {
        if (userType === 'tutor') {
            dispatch(tourActions.setTutorTourCompleted(true));
        } else if (userType === 'student') {
            dispatch(tourActions.setStudentTourCompleted(true));
        }
    };

    const resetTourForRole = () => {
        if (userType === 'tutor') {
            dispatch(tourActions.setTutorTourCompleted(false));
        } else if (userType === 'student') {
            dispatch(tourActions.setStudentTourCompleted(false));
        }
    };

    return {
        shouldShowTour: shouldShowTour(),
        markTourAsCompleted,
        resetTourForRole,
        userType,
    };
>>>>>>> Stashed changes
}