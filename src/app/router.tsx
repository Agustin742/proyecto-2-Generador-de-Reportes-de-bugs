import { createBrowserRouter } from "react-router-dom"; // O "react-router"
import { RootLayout } from "@/shared/components/layout/RootLayout";
import { HomePage } from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    // El padre que contiene la barra de navegación
    element: <RootLayout />,
    children: [
      {
        // Indica que esta es la página por defecto al entrar a "/"
        index: true,
        element: <HomePage />, // El hijo que se va a meter adentro del <Outlet />
      },
    ],
  },
]);
