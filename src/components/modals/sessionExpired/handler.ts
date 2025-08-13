import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { authActions } from "@/redux/auth/authSlice";
import { sessionActions } from "@/redux/sessionSlice";

export function useHandler(): [State, Handlers] {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLoginAgain = () => {
        // Clear any stored tokens
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        // Clear Redux store
        dispatch(authActions.logout());
        dispatch(sessionActions.setShowSessionExpired(false));

        // Redirect to root path
        navigate("/");
    };

    return [{}, { handleLoginAgain }]
}

interface State {
};

interface Handlers {
    handleLoginAgain: () => void;
};

export interface SessionExpiredModalProps {
    open: boolean;
}