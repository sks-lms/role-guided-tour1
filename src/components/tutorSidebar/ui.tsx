import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { authActions } from "@/redux/auth/authSlice";
import { useHandler } from "./handler";
import { useAppDispatch } from "@/redux/hooks";

export function TutorSidebar() {
  const [state, handlers] = useHandler();
  const dispatch = useAppDispatch();

  if (state.loading) return null;

  return (
    <Sidebar
      className={`${state.collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r-0 shadow-elegant`}
      collapsible="icon"
      data-tour="sidebar"
    >
      <SidebarContent className="bg-sidebar border-r border-sidebar-border">
        {/* Header */}
        <div className={`px-4 py-6 border-b border-sidebar-border ${state.collapsed ? "px-2" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!state.collapsed && (
              <div className="animate-fade-in">
                <h2 className="text-lg font-bold text-sidebar-foreground">SK Solutions</h2>
                <p className="text-xs text-sidebar-foreground/70">Learning Management</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className={`text-sidebar-foreground/70 text-xs font-medium mb-2 ${state.collapsed ? "sr-only" : ""}`}>
            MAIN MENU
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {state.menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={handlers.getNavClass(item.url)}
                      data-tour={`nav-${item.title.toLowerCase()}`}
                    >
                      <item.icon className={`h-5 w-5 ${state.collapsed ? "mx-auto" : "mr-3"}`} />
                      {!state.collapsed && (
                        <span className="font-medium animate-fade-in">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          {!state.collapsed && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex justify-center items-center" onClick={() => {
                  dispatch(authActions.logout());
                  handlers.navigate("/");
                }}>
                  <img
                    src={state.profileData?.avatarUrl ?? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                    alt={state.profileData?.name ?? 'Michael Chean'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {state.profileData?.name ?? 'Loading...'}
                  </p>
                  <p className="text-xs text-sidebar-foreground/70 truncate">Teacher</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}