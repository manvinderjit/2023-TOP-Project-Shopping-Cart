import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";
import { Provider } from "react-redux";
import { store } from "../src/application/store";

describe("Cart Page", () => {
  beforeEach(() => {
    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/cart"],
    });
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });

  it("should render the Cart", () => {
    screen.debug();
    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();    
  });

});
