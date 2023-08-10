import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import Cart from "../pages/cart/Cart";
import Login from "../pages/dashboard/Login";
import HomeLayout from "../layout/HomeLayout";

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
  ]);
  return <RouterProvider router={router} />;
}
export default RootLayout;
