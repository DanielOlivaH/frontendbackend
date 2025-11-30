import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import PaginaError from "./pages/Error";
import Help from "./pages/Help"

export default function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <PaginaError />
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <PaginaError />
    },
    {
      path: "/reports",
      element: <Reports />,
      errorElement: <PaginaError />
    },
    {
      path: "/help",
      element: <Help/>,
      errorElement: <PaginaError />
    },
    {
      path: "*",
      element: <PaginaError />
    }
  ]);

  return <RouterProvider router={router} />;
}
