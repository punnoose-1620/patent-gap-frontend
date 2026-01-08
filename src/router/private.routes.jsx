import Layout from '@/layouts/Layout';
import Dashboard from '@/pages/dashboard/Dashboard';
import Analysis from '@/pages/Analysis';
import Results from '@/pages/Results';
import Comparison from '@/pages/Comparison';
import Help from '@/pages/help/Help';
import History from '@/pages/history/History';
import NewProject from '@/pages/new-project/NewProject';
import Settings from '@/pages/settings/Settings';

export const privateRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { path: 'dashboard', element: <Dashboard /> },
    {
      path: 'analysis',
      element: <Analysis />,
    },
    {
      path: 'results/:resultId',
      element: <Results />,
    },
    {
      path: 'results/:resultId/comparison/:comparisonId',
      element: <Comparison />,
    },
    {
      path: 'new-project',
      element: <NewProject />,
    },
    {
      path: 'settings',
      element: <Settings />,
    },
    {
      path: 'history',
      element: <History />,
    },
    {
      path: 'help',
      element: <Help />,
    },
  ],
};
