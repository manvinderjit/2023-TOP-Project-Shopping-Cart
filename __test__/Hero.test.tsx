import { render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import Hero from "../src/components/layout/Hero.tsx";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../src/application/store";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { carouselImagesData } from "./mockdata.tsx";
import { apiSlice } from "../src/features/api/apiSlice.ts";

describe("should render Hero", () => {

  const handlers = [
    // Register request handler
    http.get("https://ia.manvinderjit.com/api/promos/carousel",() => {
        return HttpResponse.json({
          carouselPromos: carouselImagesData,
        });
      }
    ),
  ];

  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    server.resetHandlers();
    store.dispatch(apiSlice.util.resetApiState());
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());


  it("should render 'loading' when the component is loading", async () => {
    // Register request handler with infinite delay
    server.use(http.get("https://ia.manvinderjit.com/api/promos/carousel", async () => {
      await delay("infinite");
    }));

    // Render Component
    render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    // Post Expectations
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should not render Hero Image Slider when the component is loading", async () => {
    // Register request handler with infinite delay
    server.use(http.get("https://ia.manvinderjit.com/api/promos/carousel", async () => {
      await delay("infinite");
    }));

    // Render Component
    render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    // Pre Expectations
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Post Expectations
    expect(screen.queryByRole("region", { name: "Hero Image Slider" })).not.toBeInTheDocument();
  });

  it("should render the error when the backend returns error", async () => {

    // Register request handler that returns error
    server.use(http.get("https://ia.manvinderjit.com/api/promos/carousel", async () => {
        return HttpResponse.json('Something went wrong!', { status: 401 });
    }));

    // Render Component
    render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );
    
    // Post Expectations
    await waitFor(() => {
        screen.debug();
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        expect(screen.queryByRole("region", { name: "Hero Image Slider" })).not.toBeInTheDocument();
    });
    
  });

  it("should not render 'loading' text when the component has loaded", async () => {

    // Render Component
    render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    // Post Expectations
    await waitFor(async() => {
      expect(screen.getByRole("region", { name: "Hero Image Slider" })).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });    
  });
});
