import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NavUserAccountTools from "../src/components/nav/NavUserAccountTools";
import { describe, it, expect } from "vitest";
import { MemoryRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/application/store";

describe("Navigation Top", () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: "/" }]}>
            <NavUserAccountTools />
          </MemoryRouter>
        </Provider>
      );
    });
    it("renders Navigation", () => {
        screen.debug();
        
    })
});
