import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";

describe("Login Page", () => {
    beforeEach(() => {
        const _router = createMemoryRouter(routerConfig, {
            initialEntries: ["/login"],
        });
        render(<RouterProvider router={_router} />);
    })

  it("should render Login Page", () => {
    expect(screen.getByText(/Log In To Your Account/i)).toBeInTheDocument();
  });

  it("should render Email Input Textbox", () => {
    expect(screen.getByRole("textbox", { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('id', 'email');
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('name', 'email');
    expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute('required');
  });

  it("should render Password Input Textbox", () => {
    expect(screen.getByLabelText(/password/i )).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('id', 'password');
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('name', 'password');
    expect(screen.getByLabelText(/password/i )).toHaveAttribute('required');
  });

  it("should render the Submit button", () => {
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toHaveAttribute("type", "submit");
  });

  it("should render the 'Forgot password' link", () => {
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument();
  });

  it("should render the 'Sign Up Now' link", () => {
    expect(screen.getByRole('link', { name: /sign up now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up now/i })).toHaveAttribute("href", "/register");
  });
  
});
