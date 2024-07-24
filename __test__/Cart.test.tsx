import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";

describe("Cart Page", () => {
  beforeEach(() => {
    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/cart"],
    });
    render(<RouterProvider router={_router} />);
  });

  it("should render the Cart", () => {
    screen.debug();
    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
    // expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
  });

//   it("should render the Email Input Textbox", () => {
//     expect(
//       screen.getByRole("textbox", { name: /email address/i })
//     ).toBeInTheDocument();
//     expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
//       "id",
//       "email"
//     );
//     expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
//       "name",
//       "email"
//     );
//     expect(screen.getByRole("textbox", { name: /email/i })).toHaveAttribute(
//       "required"
//     );
//   });

//   it("should render the Password Input Textbox", () => {
//     expect(screen.getByLabelText("Password")).toBeInTheDocument();
//     expect(screen.getByLabelText("Password")).toHaveAttribute("id", "password");
//     expect(screen.getByLabelText("Password")).toHaveAttribute(
//       "name",
//       "password"
//     );
//     expect(screen.getByLabelText("Password")).toHaveAttribute("required");
//   });

//   it("should render the Confir Passoword Input Textbox", () => {
//     expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
//     expect(screen.getByLabelText("Confirm Password")).toHaveAttribute(
//       "id",
//       "confirm-password"
//     );
//     expect(screen.getByLabelText("Confirm Password")).toHaveAttribute(
//       "name",
//       "confirm-password"
//     );
//     expect(screen.getByLabelText("Confirm Password")).toHaveAttribute(
//       "required"
//     );
//   });

//   it("should render the submit Sign Up button", () => {
//     expect(
//       screen.getByRole("button", { name: /sign up/i })
//     ).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /sign up/i })).toHaveAttribute(
//       "type",
//       "submit"
//     );
//   });

//   it("should render the 'Log In Here' link", () => {
//     expect(
//       screen.getByRole("link", { name: /Log In Here/i })
//     ).toBeInTheDocument();
//     expect(screen.getByRole("link", { name: /Log In Here/i })).toHaveAttribute(
//       "href",
//       "/login"
//     );
//   });
});
