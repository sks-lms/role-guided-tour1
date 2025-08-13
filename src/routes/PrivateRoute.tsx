import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    role: 'tutor' | 'student';
}

export default function PrivateRoute({ component: Component, role }: PrivateRouteProps) {
    const token = useAppSelector((state) => state.auth.token);
    const userType = useAppSelector((state) => (state.auth && 'userType' in state.auth) ? state.auth.userType : "");
    const location = useLocation();

    // Log the token and user type for debugging
    React.useEffect(() => {
        console.log(`token: ${token}, userType: ${userType}`);
    }, [token, userType]);

    // Check if the user is authorized to view the page
    if (token === "" || userType !== role) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return <Component role={role} />;
}
