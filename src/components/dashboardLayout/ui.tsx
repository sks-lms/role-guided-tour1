import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TutorSidebar } from "../tutorSidebar";
import { SessionExpiredModal } from "../modals/sessionExpired";
import { useHandler } from "./handler";
import { TourProvider } from "../tour/TourProvider";
import { TourButton } from "../tour/TourButton";
// import { useTokenValidation } from "@/hooks/useTokenValidation";

export function DashboardLayout() {
  const [state, handlers] = useHandler();
  const showSessionExpired = useAppSelector((state: RootState) => state.session.showSessionExpired);

  // Use token validation hook
  // useTokenValidation();

  return (
    <TourProvider>
      <SidebarProvider defaultOpen>
        <div className="min-h-screen flex w-full bg-gradient-subtle">
          <TutorSidebar />

          <div className="flex-1 flex flex-col">
            {/* Top Header */}
<<<<<<< Updated upstream
            <header 
=======
            <header
>>>>>>> Stashed changes
              className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-card"
              data-tour="dashboard-header"
            >
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-muted rounded-lg p-2 transition-colors" />
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students, courses, lessons..."
                    className="pl-10 bg-muted/50 border-0 focus:bg-background transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3" data-tour="profile-section">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted rounded-lg transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-glow-pulse"></span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <img
                    src={state.tutorData?.avatarUrl ?? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt={state.tutorData?.avatarUrl ?? 'Michael Chean'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
              <div className="animate-fade-in">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
      <SessionExpiredModal open={showSessionExpired} />
      <TourButton />
    </TourProvider>
  );
}