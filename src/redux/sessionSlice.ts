import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    showSessionExpired: boolean;
}

const initialState: State = {
    showSessionExpired: false,
}

const slice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setShowSessionExpired(state, action: PayloadAction<boolean>) {
            state.showSessionExpired = action.payload;
        },
    },
});

export const sessionActions = slice.actions;
export const sessionReducer = slice.reducer;