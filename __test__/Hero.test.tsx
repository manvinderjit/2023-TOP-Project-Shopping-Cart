import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import Hero from '../src/components/layout/Hero.tsx';
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { store } from "../src/application/store";
import routerConfig from "./routerConfig";

describe("Render Hero", () => {
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/"],
  });
  beforeEach(() => {
    <Provider store={store}>
      <RouterProvider router={_router} />
    </Provider>;
  });
  it("should show render hero", () => {
    // TODO
  });
  // it("should show '...loading' when component is loading", () => {
  //  TODO
  // });
});

