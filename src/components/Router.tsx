import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import UserDashboard from "../pages/UserDashboard";
import Checkout from "../pages/Checkout";
import UserOrders from "../pages/UserOrders";
import ManageOrder from "../pages/ManageOrder";

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
      {
          path: "orders",
          element: <UserOrders />,
          // loader: () => orders.userOrders,
          // children: [
          // {
          //     path: "orders/:orderId",
          //     element: <OrderDetails />,
          // },
          // ],
      },
      {
          path: "order/:orderId",
          element: <ManageOrder />,
      },
      // {
      //     path: "profile",
      //     element: <Profile />,
      // },      
    ],
  },
];

const router = createBrowserRouter(routerConfig);

export default router;
