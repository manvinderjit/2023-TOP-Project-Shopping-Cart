import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";
import { store } from "../src/application/store";
import { Provider } from "react-redux";

describe("Register Page", () => {
    beforeEach(() => {
        const _router = createMemoryRouter(routerConfig, {
            initialEntries: ["/register"],
        });
        render(
          <Provider store={store}>
            <RouterProvider router={_router} />
          </Provider>
      );
    })

  it("should render the Register Page", () => {
    expect(screen.getByText(/Sign Up For Our Website/i)).toBeInTheDocument();
  });

  it("should render the Email Input Textbox", () => {
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('id', 'userEmail');
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('name', 'userEmail');
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('required');
  });

  it("should render the Password Input Textbox", () => {
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toHaveAttribute('id', 'userPassword');
    expect(screen.getByLabelText("Password")).toHaveAttribute('name', 'userPassword');
    expect(screen.getByLabelText("Password")).toHaveAttribute('required');
  });

  it("should render the Confirm Passoword Input Textbox", () => {
    expect(screen.getByLabelText("Confirm Password" )).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password" )).toHaveAttribute('id', 'confirmPassword');
    expect(screen.getByLabelText("Confirm Password" )).toHaveAttribute('name', 'confirmPassword');
    expect(screen.getByLabelText("Confirm Password" )).toHaveAttribute('required');
  });

  it("should render the submit Sign Up button", () => {
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toHaveAttribute("type", "submit");
  });

  it("should render the 'Log In Here' link", () => {
    expect(screen.getByRole('link', { name: /Log In Here/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Log In Here/i })).toHaveAttribute("href", "/login");
  });
  
});
