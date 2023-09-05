import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import Cart from "../pages/cart/Cart";
import Login from "../pages/login/Login";
import HomeLayout from "../layout/HomeLayout";
import Orders from "../pages/dashboard/Orders";
import Products from "../pages/dashboard/Products";
import Instock from "../pages/dashboard/Instock";
import DashBoardLayout from "../layout/DashBoardLayout";
import CartLayout from "../layout/CartLayout";
import Shipping from "../pages/cart/Shipping";
import Pay from "../pages/cart/Pay";
import SuccessPay from "../pages/cart/SuccessPay";
import FailedPay from "../pages/cart/FailedPay";
import ProtectedRoute from "./protectedRoute";
import PrivateRoute from "./privateRoute";
import ProductDetail from "../pages/products/ProductDetail";
import CategoriesProduct from "../pages/categories/CategoriesProduct";
import UserLogin from "../pages/login/UserLogin";
import UserPrivateRoute from "./userPrivateRoute";
import UserProtectedRoute from "./userProtectedRoute";

function RootLayout() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        { path: "/products/:productId", element: <ProductDetail /> },
        { path: "/categories/:categoryId", element: <CategoriesProduct /> },
      ],
    },
    {
      path: "/login",
      element: (
        <ProtectedRoute>
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <DashBoardLayout />
        </PrivateRoute>
      ),
      children: [
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
      path: "/userlogin",
      element: (
        <UserProtectedRoute>
          <UserLogin />
        </UserProtectedRoute>
      ),
    },
    {
      path: "/",
      element: (
        <UserPrivateRoute>
          <CartLayout />
        </UserPrivateRoute>
      ),
      children: [
        {
          path: "/shipping",
          element: <Shipping />,
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
    {
      path: "/pay",
      element: <Pay />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export default RootLayout;
