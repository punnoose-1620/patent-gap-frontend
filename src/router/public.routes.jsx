import Login from '@/components/LoginForm';
import Layout from '@/layouts/Layout';
import Home from '@/pages/Home';

export const publicRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'login', element: <Login /> },
  ],
};
