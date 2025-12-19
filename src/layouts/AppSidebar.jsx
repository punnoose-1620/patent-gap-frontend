import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { FolderPlus, HelpCircle, History, LayoutDashboard, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { id: 'new-project', icon: FolderPlus, label: 'New Project', path: '/new-project' },
  { id: 'history', icon: History, label: 'History', path: '/history' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  { id: 'help', icon: HelpCircle, label: 'Help', path: '/help' },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="p-4 bg-slate-900">
      <SidebarHeader className="bg-slate-900">
        <h2 className="text-lg font-bold text-white">Patent Gap AI</h2>
      </SidebarHeader>
      <SidebarContent className="bg-slate-900">
        <SidebarGroup title="Main" className="gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 pl-3 py-3 rounded-md transition-colors ${
                  isActive ? 'bg-blue-600 ' : ' hover:bg-blue-500'
                }`}
              >
                <item.icon className={isActive ? 'text-white' : 'text-gray-300'} />
                <span className={isActive ? 'text-white' : 'text-gray-300'}>{item.label}</span>
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-slate-900">
        <p className="text-sm text-gray-400">© 2025 Patent Gap AI</p>
      </SidebarFooter>
    </Sidebar>
  );
}
