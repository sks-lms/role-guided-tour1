import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from 'redux-persist/lib/storage/session';
import { combineReducers } from "@reduxjs/toolkit";
import { tutorDashboardReducer } from "./tutorDashboardSlice";
import { sessionReducer } from "./sessionSlice";
import { tourReducer } from "./tourSlice";

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  tutorDashboard: tutorDashboardReducer,
  session: sessionReducer,
  tour: tourReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: import.meta.env.MODE !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;