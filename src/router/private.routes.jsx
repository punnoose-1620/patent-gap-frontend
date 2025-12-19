import Layout from '@/layouts/Layout';
import Dashboard from '@/pages/dashboard/Dashboard';

export const privateRoutes = {
  path: '/',
  element: <Layout />,
  children: [{ path: 'dashboard', element: <Dashboard /> }],
};
