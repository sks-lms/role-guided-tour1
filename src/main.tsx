import './translation/i18n';
import { createRoot } from 'react-dom/client'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoutesWrapper from './routes/Routes';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
    <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <RoutesWrapper />
                    </PersistGate>
                </Provider>
            </TooltipProvider>
        </QueryClientProvider>
    </ErrorBoundary>
);