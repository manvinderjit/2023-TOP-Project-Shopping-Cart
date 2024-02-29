import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import App from '../App.jsx';
import ErrorPage from '../components/404';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Cart from '../components/Cart';
import Dash from '../components/Dash';
import Logout from '../components/Logout';
import Orders from '../components/Orders.jsx';
import Profile from '../components/Profile.jsx';
import OrderDetails from '../components/OrderDetails.jsx';

const Router = () => {
    const orders = useSelector((state) => state.orders);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: 'login',
                    element: <Login />,
                },
                {
                    path: 'register',
                    element: <Register />,
                },
                {
                    path: 'cart',
                    element: <Cart />,
                },
                {
                    path: 'dash',
                    element: <Dash />,
                },
                {
                    path: 'orders',
                    element: <Orders />,
                    loader: () => orders.userOrders,
                    children: [
                        {
                            path: 'orders/:orderId',
                            element: <OrderDetails />,
                        },
                    ],
                },
                {
                    path: 'order/:orderId',
                    element: <OrderDetails />,
                },
                {
                    path: 'profile',
                    element: <Profile />,
                },
                {
                    path: 'logout',
                    element: <Logout />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
