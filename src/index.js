import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserDashboard from './Components/UserDashboard';
import Home from './Components/Home';
import AdminDashboard from './Components/AdminDashboard';
import NewPassword from './Components/Recovery/NewPassword';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/home",
    element:<Home/>
  },
  {
    path:"/dashboard",
    element:<UserDashboard/>
  },
  {
    path:"/admin",
    element:<AdminDashboard/>
  },
  {
    path:"/recover/:token",
    element:<NewPassword/>
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
