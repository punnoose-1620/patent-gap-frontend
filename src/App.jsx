import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './routes/Layout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
