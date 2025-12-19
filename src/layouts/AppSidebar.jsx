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
  { id: 'new-project', icon: FolderPlus, label: 'New Project', path: '/dashboard', isAction: true },
  { id: 'history', icon: History, label: 'History', path: '/history' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  { id: 'help', icon: HelpCircle, label: 'Help', path: '/help' },
];

export function AppSidebar() {
  const location = useLocation();

  const handleItemClick = (item, e) => {
    if (item.isAction && item.id === 'new-project') {
      e.preventDefault();
      // Dispatch custom event to open modal
      window.dispatchEvent(new CustomEvent('openPatentModal'));
    }
  };

  return (
    <Sidebar className="p-4 bg-sidebar-background">
      <SidebarHeader className="bg-sidebar-background">
        <h2 className="text-lg font-bold text-sidebar-foreground">Patent Gap AI</h2>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar-background">
        <SidebarGroup title="Main" className="gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path && !item.isAction;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={(e) => handleItemClick(item, e)}
                className={`flex items-center gap-3 pl-3 py-3 rounded-md transition-colors ${
                  isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-sidebar-background">
        <p className="text-sm text-sidebar-foreground/60">© 2025 Patent Gap AI</p>
      </SidebarFooter>
    </Sidebar>
  );
}
