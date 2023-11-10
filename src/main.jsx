import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './app/store';

import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/404';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Dash from './components/Dash';
import Logout from './components/Logout';
import Orders from './components/Orders.jsx';
import Profile from './components/Profile.jsx';

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

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);
