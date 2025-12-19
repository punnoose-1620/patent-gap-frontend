import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold p-4">Patent Gap AI</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup title="Main">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-200">
            Home
          </Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-200">
            About
          </Link>
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">
            Login
          </Link>
          <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">
            Dashboard
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
