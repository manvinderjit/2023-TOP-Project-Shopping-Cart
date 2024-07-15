import React from "react";
import App from "../src/App";
import Home from "../src/components/Home";
import Login from "../src/components/Login";
import Cart from "../src/components/Cart";
import Register from "../src/components/Register";
import ErrorPage from "../src/components/ErrorPage";

const routerConfig = [
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
    ],
  },
];

export default routerConfig;
