import NotFound from '@/pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import { publicRoutes } from './public.routes';

export const router = createBrowserRouter([publicRoutes, { path: '*', element: <NotFound /> }]);
