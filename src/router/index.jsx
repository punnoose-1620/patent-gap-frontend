import NotFound from '@/pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import { privateRoutes } from './private.routes';
import { publicRoutes } from './public.routes';

export const router = createBrowserRouter([
  publicRoutes,
  privateRoutes,
  { path: '*', element: <NotFound /> },
]);
