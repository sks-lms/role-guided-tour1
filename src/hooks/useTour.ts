import { useCallback, useRef } from 'react';
import Shepherd from 'shepherd.js';
import { useAppDispatch } from '@/redux/hooks';
import { tourActions } from '@/redux/tourSlice';
import { getTutorTourSteps, getStudentTourSteps } from '@/components/tour/TourSteps';

export function useTour() {
  const dispatch = useAppDispatch();
  const tourRef = useRef<any | null>(null);

  const startTour = useCallback((userType: 'tutor' | 'student') => {
    if (tourRef.current) {
      tourRef.current.complete();
    }

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shadow-elegant',
        scrollTo: true,
        cancelIcon: {
          enabled: true,
        },
      },
    });

    const steps = userType === 'tutor' ? getTutorTourSteps() : getStudentTourSteps();
    
    steps.forEach((step, index) => {
      tour.addStep({
        ...step,
        id: `step-${index}`,
        buttons: [
          ...(index > 0 ? [{
            text: 'Previous',
            classes: 'btn btn-secondary',
            action: tour.back,
          }] : []),
          {
            text: index === steps.length - 1 ? 'Finish' : 'Next',
            classes: 'btn btn-primary',
            action: index === steps.length - 1 ? () => {
              tour.complete();
            } : tour.next,
          },
          {
            text: 'Skip Tour',
            classes: 'btn btn-ghost',
            action: tour.cancel,
          },
        ],
      });
    });

    tour.on('complete', () => {
      dispatch(tourActions.setTourActive(false));
      dispatch(tourActions.resetTour());
      if (userType === 'tutor') {
        dispatch(tourActions.setTutorTourCompleted(true));
      } else {
        dispatch(tourActions.setStudentTourCompleted(true));
      }
    });

    tour.on('cancel', () => {
      dispatch(tourActions.setTourActive(false));
      dispatch(tourActions.resetTour());
    });

    tour.on('show', (event) => {
      dispatch(tourActions.setCurrentStep(event.step?.id ? parseInt(event.step.id.split('-')[1]) : 0));
    });

    tourRef.current = tour;
    dispatch(tourActions.setTourActive(true));
    tour.start();
  }, [dispatch]);

  const resetTour = useCallback((userType: 'tutor' | 'student') => {
    if (userType === 'tutor') {
      dispatch(tourActions.setTutorTourCompleted(false));
    } else {
      dispatch(tourActions.setStudentTourCompleted(false));
    }
  }, [dispatch]);

  return {
    startTour,
    resetTour,
  };
}