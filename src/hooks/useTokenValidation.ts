import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { jwtDecode } from 'jwt-decode';

export function useTokenValidation() {
  const token = useAppSelector((state) => state.auth.token);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Event to trigger session expired modal
  const triggerSessionExpired = () => {
    const event = new CustomEvent('sessionExpired');
    window.dispatchEvent(event);
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const checkTokenExpiration = () => {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decoded.exp && decoded.exp < currentTime) {
          triggerSessionExpired();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        triggerSessionExpired();
      }
    };

    // Check immediately
    checkTokenExpiration();

    // Set up interval to check every 30 seconds
    intervalRef.current = setInterval(checkTokenExpiration, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [token]);

  return null;
} 