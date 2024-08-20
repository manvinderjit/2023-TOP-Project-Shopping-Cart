import { render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { store } from "../src/application/store.ts";
import routerConfig from "./routerConfig.tsx";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { apiSlice } from "../src/features/api/apiSlice.ts";
import { categoryList, productList, carouselImagesData } from "./mockdata";

describe("should render App", () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/"],
  });

  const handlers = [
    // Register request handler 
    http.get("https://ia.manvinderjit.com/api/products", async () => {
      return HttpResponse.json({
        categoryList: categoryList,
        productList: productList,
      });
    }),
    http.get("https://ia.manvinderjit.com/api/promos/carousel", async () => {
      return HttpResponse.json({
        carouselPromos: carouselImagesData,
      });
    }),
  ];

  const server = setupServer(...handlers);

  beforeEach(async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={_router} />
      </Provider>
    );
  });

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    server.resetHandlers();
    store.dispatch(apiSlice.util.resetApiState());
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should render 'loading' text when the component is loading", async () => {
    const compontentLoading = screen.getAllByText(/loading/i);
    expect(compontentLoading).toHaveLength(2);
  });

  it("should not render 'Hero Image Slider' when the component is loading", async () => {
    const compontentLoading = screen.getAllByText(/loading/i);
    expect(compontentLoading).toHaveLength(2);
    expect(screen.queryByRole("region", { name: "Hero Image Slider" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Our Products" })).not.toBeInTheDocument();
  });

  it("should not render 'loading' text when component has loaded", async () => {
    await waitFor(async() => {
      expect(screen.getByRole("region", { name: "Hero Image Slider" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Our Products" })).toBeInTheDocument();
      expect(screen.queryAllByText(/loading/i)).toHaveLength(0);
    });    
  });
});

