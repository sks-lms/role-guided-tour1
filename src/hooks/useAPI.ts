import axios, { AxiosError } from 'axios';
import { useToast } from './use-toast';

export function useAPI() {
    const { toast } = useToast();

    // Event to trigger session expired modal
    const triggerSessionExpired = () => {
        const event = new CustomEvent('sessionExpired');
        window.dispatchEvent(event);
    };

    const API = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Separate axios instance for file uploads (no default Content-Type)
    const FileAPI = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
    });

    // Response interceptor to handle unauthorized responses
    API.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                triggerSessionExpired();
            }
            return Promise.reject(error);
        }
    );

    FileAPI.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                triggerSessionExpired();
            }
            return Promise.reject(error);
        }
    );

    const GET = async <T>(url: string, token?: string): Promise<T> => {
        try {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await API.get(url, { headers });
            return response.data.data as T;
        } catch (e) {
            if ((e as AxiosError).response) {
                toast({
                    title: "Something Went Wrong!!",
                    description: e.response.data.message,
                    variant: 'destructive'
                });
                throw (e as AxiosError).response as unknown as ApiErrorResponse;
            }
            else {
                toast({
                    title: "Something Went Wrong!!",
                    description: "Something went wrong, please try again",
                    variant: 'destructive'
                });
                throw { data: { message: "Something went wrong, please try again" } };
            }
        }
    };

    const POST = async <T>(url: string, payload: any, token: string): Promise<T> => {
        try {
            const headers: { Authorization: string; } = { Authorization: `Bearer ${token}` };
            const response = await API.post(url, payload, { headers });
            return response.data.data as T;
        } catch (e) {
            if ((e as AxiosError).response) {
                toast({
                    title: "Something Went Wrong!!",
                    description: e.response.data.message,
                    variant: 'destructive'
                });
                throw (e as AxiosError).response as unknown as ApiErrorResponse;
            }
            else {
                toast({
                    title: "Something Went Wrong!!",
                    description: "Something went wrong, please try again",
                    variant: 'destructive'
                });
                throw { data: { message: "Something went wrong, please try again" } };
            }
        }
    };

    return { GET, POST }
};

interface ApiErrorResponse {
    status: number;
    data: ApiErrorResponseWrapper;
}

interface ApiErrorResponseWrapper {
    status: string;
    message: string;
    errorCode: number;
}