import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Dashboard from './components/Dashboard';
import PolaroidCarousel from './components/PolaroidCarousel';
import HomePage from './pages/HomePage';
import RegisterForm from './pages/HomePage/components/RegisterForm';
import LoginForm from './pages/HomePage/components/LoginForm';


function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/signup",
      element: <RegisterForm />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/pol",
      element: <PolaroidCarousel />,
    },
  ]);
  
 

  return <RouterProvider router={router} />;
}

export default App;
