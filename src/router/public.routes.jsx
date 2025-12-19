import Login from '@/components/LoginForm';
import Layout from '@/layouts/Layout';
import About from '@/pages/About';
import Home from '@/pages/Home';

export const publicRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: 'about', element: <About /> },
    { path: 'login', element: <Login /> },
  ],
};
