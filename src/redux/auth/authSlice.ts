import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: string;
    userType: string;
}

const initialState: AuthState = {
    token: "",
    userType: "tutor",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            if (typeof action.payload === 'string') {
                // Handle legacy login with just token
                state.token = action.payload;
                state.userType = "tutor";
            } else {
                // Handle new login with token and userType
                state.token = action.payload.token;
                state.userType = action.payload.userType || "tutor";
            }
        },
        logout: (state) => {
            state.token = "";
            state.userType = "tutor";
            sessionStorage.clear();
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;