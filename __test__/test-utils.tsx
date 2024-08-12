import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// import { store } from "../src/application/store";
import cartReducer from "../src/features/cart/cartSlice";
import authReducer from "../src/features/auth/authSlice";
import toastReducer from "../src/features/toast/toastSlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  cart: cartReducer,
  toast: toastReducer,
  auth: authReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore['dispatch'];

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}