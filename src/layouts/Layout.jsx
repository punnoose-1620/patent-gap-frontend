import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';

function Layout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      {location.pathname !== '/login' && <AppSidebar />}
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
