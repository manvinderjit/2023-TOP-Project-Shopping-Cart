import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import Register from "./Register";
import ErrorPage from "./ErrorPage";

export const routerConfig = [
  {
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
      // {
      //     path: "dash",
      //     element: <Dash />,
      // },
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
