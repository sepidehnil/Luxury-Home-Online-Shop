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
import CartLayout from "../layout/CartLayout";
import Shipping from "../pages/cart/Shipping";
import Pay from "../pages/cart/Pay";
import SuccessPay from "../pages/cart/SuccessPay";
import FailedPay from "../pages/cart/FailedPay";

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
      element: <CartLayout />,
      children: [
        {
          path: "/shipping",
          element: <Shipping />,
        },
        {
          path: "/pay",
          element: <Pay />,
        },
        {
          path: "/successPay",
          element: <SuccessPay />,
        },
        {
          path: "/failedPay",
          element: <FailedPay />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default RootLayout;
