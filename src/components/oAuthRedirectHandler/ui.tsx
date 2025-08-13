import { useHandler } from "./handler";

export function OAuthRedirectHandler() {
    const [state, handlers] = useHandler();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <div>Processing authentication...</div>
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                Please wait while we complete your login.
            </div>
        </div>
    );
};