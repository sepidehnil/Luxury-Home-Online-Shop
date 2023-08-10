import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import Cart from "../pages/cart/Cart";
import Login from "../pages/dashboard/Login";
import HomeLayout from "../layout/HomeLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Orders from "../pages/dashboard/Orders";
import Products from "../pages/dashboard/Products";
import Instock from "../pages/dashboard/Instock";
import DashBoardLayout from "../layout/DashBoardLayout";
import ClientLayout from "../layout/ClientLayout";
import Shipping from "../pages/cart/Shipping";

function RootLayout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <DashBoardLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/instock",
          element: <Instock />,
        },
        {
          path: "/products",
          element: <Products />,
        },
      ],
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          path: "/shipping",
          element: <Shipping />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default RootLayout;
