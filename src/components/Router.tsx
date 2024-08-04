import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import Register from "./Register";
import ErrorPage from "./ErrorPage";
import UserDashboard from "./UserDashboard";
import { useAppDispatch } from "../application/reduxHooks";
import Checkout from "./Checkout";

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
