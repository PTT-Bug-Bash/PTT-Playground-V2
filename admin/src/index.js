// import node modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import pages
import ErrorPage from './pages/error';
import Dashboard from './pages/dashboards/dashboard';
import ResetPasswordComponent from "./components/User/ResetPasswordComponent";
import EmailVerification from "./components/User/EmailVerification";

// import style
import './assets/style/index.css';
import "./assets/style/main.css"

// import other
import reportWebVitals from './reportWebVitals';


const router = createBrowserRouter([
  {
    path: "/", 
    element:<Dashboard />,
    errorElement: <ErrorPage />
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordComponent />,
    errorElement: <ErrorPage />
  },
  {
    path: "/verify/:token",
    element: <EmailVerification />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
