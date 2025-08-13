import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    invitatiotionHistory: { email: string; status: 'PENDING' | 'ACCEPTED' | 'REJECTED'; date: Date}[];
}

const initialState: State = {
    invitatiotionHistory: [],
}

const slice = createSlice({
    name: "tutorDashboard",
    initialState,
    reducers: {
        setInvitationHistory(state, action: PayloadAction<{ email: string; status: 'PENDING' | 'ACCEPTED' | 'REJECTED'; date: Date}[]>) {
            state.invitatiotionHistory = action.payload;
        },
    },
});

export const tutorDashboardActions = slice.actions;
export const tutorDashboardReducer = slice.reducer;