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
import Properties from "./pages/properties/Properties";
import RoomTypeCreate from "./pages/rooms/RoomTypeCreate";
import RoomType from "./pages/rooms/RoomType";
import RoomCreate from "./pages/rooms/RoomCreate";
import RatePlanCreate from "./pages/rateplan/RatePlanCreate";
import RatePlan from "./pages/rateplan/RatePlan";

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
            path: "/properties",
            element: <Properties />,
          },
          {
            path: "/properties/create",
            element: <PropertyCreate />,
          },
          {
            path: "/room-types/create",
            element: <RoomTypeCreate />,
          },
          {
            path: "/room-types",
            element: <RoomType />,
          },
          {
            path: "/rooms/create",
            element: <RoomCreate />,
          },
          {
            path: "/rate-plans/create",
            element: <RatePlanCreate />,
          },
          {
            path: "/rate-plans",
            element: <RatePlan />,
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
