import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import routerConfig from "./routerConfig";
import Login from "../src/components/Login";
import { store } from "../src/application/store";
import router from "../src/components/Router";

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe("Login Page", async () => {
    // beforeEach(async () => {
        const _router = createMemoryRouter(routerConfig, {
            initialEntries: ["/login"],
        });
    //     await render(<RouterProvider router={_router} />);
    //     screen.debug();
    // })
  beforeEach(() => {
    // const store = configureStore();
    // const store = createTestStore();
    // const _router = createMemoryRouter(routerConfig, {
    //     initialEntries: ["/login"],
    // });
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
    
  });

  it("should render Login Page", () => {
    expect(screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();
  });

  it("should render Email Input Textbox", () => {
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email address/i })).toHaveAttribute('id', 'userEmail');
    expect(screen.getByRole("textbox", { name: /email address/i })).toHaveAttribute('name', 'userEmail');
    expect(screen.getByRole("textbox", { name: /email address/i })).toHaveAttribute('required');
  });

  it("should render Password Input Textbox", () => {
    expect(screen.getByLabelText(/password/i )).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('id', 'userPassword');
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('name', 'userPassword');
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('required');
  });

  it("should render the Submit button", () => {
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toHaveAttribute("type", "button");
  });

  it("should render the 'Forgot password' link", () => {
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
  });

  it("should render the 'Sign Up Now' link", () => {
    expect(screen.getByRole('link', { name: /sign up now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up now/i })).toHaveAttribute("href", "/register");
  });
  
});
