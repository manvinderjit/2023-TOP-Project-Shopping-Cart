import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import UserDashboard from "../pages/UserDashboard";
import Checkout from "../pages/Checkout";

export const routerConfig = [
  {
    id: "root",
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      // {
      //     path: "orders",
      //     element: <Orders />,
      //     loader: () => orders.userOrders,
      //     children: [
      //     {
      //         path: "orders/:orderId",
      //         element: <OrderDetails />,
      //     },
      //     ],
      // },
      // {
      //     path: "order/:orderId",
      //     element: <OrderDetails />,
      // },
      // {
      //     path: "profile",
      //     element: <Profile />,
      // },
      // {
      //     path: "logout",
      //     element: <Logout />,
      // },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
