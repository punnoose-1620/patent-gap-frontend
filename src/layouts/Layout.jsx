import {SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Layout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      {location.pathname !== '/login' && <AppSidebar />}
      <main className="flex-1 overflow-auto">
        {location.pathname !== '/login' && (
          <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 flex-shrink-0">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patents, reports..."
                className="pl-9 h-9 bg-muted/50 border-transparent focus:border-border"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm hover:bg-primary/20">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </header>
        )}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
