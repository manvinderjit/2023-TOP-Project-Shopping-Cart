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
import Header from './components/Header';
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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            {/* <Header/> */}
        </Provider>
    </React.StrictMode>,
);
