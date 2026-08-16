import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { Register } from "./pages/auth/Register";
import Layout from "./pages/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Reservations from "./pages/reservations/Reservations";
import NewReservation from "./pages/reservations/NewReservation";
import Rooms from "./pages/rooms/Rooms";
import Guests from "./pages/guests/Guests";
import Reports from "./pages/reports/Reports";
import GuestCreate from "./pages/guests/GuestCreate";
import PropertyCreate from "./pages/properties/PropertyCreate";

let router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <Navigate to={"/dashboard"} />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/reservations",
            element: <Reservations />,
          },
          {
            path: "/reservations/new",
            element: <NewReservation />,
          },
          {
            path: "/rooms",
            element: <Rooms />,
          },
          {
            path: "/guests",
            element: <Guests />,
          },
          {
            path: "/guests/create",
            element: <GuestCreate />,
          },
          {
            path: "/reports",
            element: <Reports />,
          },
          {
            path: "/properties/create",
            element: <PropertyCreate />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
