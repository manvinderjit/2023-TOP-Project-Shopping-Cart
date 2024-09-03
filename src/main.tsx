import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './application/store.ts';
import router from './components/Router.tsx';
import { ThemeContextProvider } from './contexts/ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeContextProvider>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </Provider>
  </React.StrictMode>
);
