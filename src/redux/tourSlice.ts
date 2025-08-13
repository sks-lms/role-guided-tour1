import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TourState {
  tutorTourCompleted: boolean;
  studentTourCompleted: boolean;
  isActive: boolean;
  currentStep: number;
}

const initialState: TourState = {
  tutorTourCompleted: false,
  studentTourCompleted: false,
  isActive: false,
  currentStep: 0,
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTutorTourCompleted: (state, action: PayloadAction<boolean>) => {
      state.tutorTourCompleted = action.payload;
      localStorage.setItem('tutorTourCompleted', JSON.stringify(action.payload));
    },
    setStudentTourCompleted: (state, action: PayloadAction<boolean>) => {
      state.studentTourCompleted = action.payload;
      localStorage.setItem('studentTourCompleted', JSON.stringify(action.payload));
    },
    setTourActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    initializeTourFromStorage: (state) => {
      const tutorTourCompleted = localStorage.getItem('tutorTourCompleted');
      const studentTourCompleted = localStorage.getItem('studentTourCompleted');
      
      if (tutorTourCompleted) {
        state.tutorTourCompleted = JSON.parse(tutorTourCompleted);
      }
      if (studentTourCompleted) {
        state.studentTourCompleted = JSON.parse(studentTourCompleted);
      }
    },
    resetTour: (state) => {
      state.isActive = false;
      state.currentStep = 0;
    },
  },
});

export const tourActions = tourSlice.actions;
export const tourReducer = tourSlice.reducer;