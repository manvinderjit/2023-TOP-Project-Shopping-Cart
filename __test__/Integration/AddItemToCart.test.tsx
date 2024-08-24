import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import React from "react";
import { Provider } from "react-redux";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { store } from "../../src/application/store.ts";
import routerConfig from "../routerConfig.tsx";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { apiSlice } from "../../src/features/api/apiSlice.ts";
import { categoryList, productList, carouselImagesData } from "../mockdata";
import { apiURL } from "../../src/features/api/apiSlice.ts";

describe("add items to cart", () => {
  // Setup
  const _router = createMemoryRouter(routerConfig, {
    initialEntries: ["/"],
  });

  const handlers = [
    // Register request handler
    http.get(`${apiURL}/api/products`, async () => {
      return HttpResponse.json({
        categoryList: categoryList,
        productList: productList,
      });
    }),
    http.get(`${apiURL}/api/promos/carousel`, async () => {
      return HttpResponse.json({
        carouselPromos: carouselImagesData,
      });
    }),
  ];

  const server = setupServer(...handlers);

  beforeEach(() => {
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

  it("should add an item to cart", async () => {
    await waitFor(async() => {
        // Pre Expectations
        expect(_router.state.location.pathname).toEqual('/');
        expect(screen.getByRole("region", { name: "Hero Image Slider" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Our Products" })).toBeInTheDocument();
        expect(screen.queryAllByText(/loading/i)).toHaveLength(0);

        // Actions
        const buttonAddToCartABC27G2SPMonitor = screen.getByRole('button', { name : /ABC 27G2SP Monitor/i})
        expect(buttonAddToCartABC27G2SPMonitor).toBeInTheDocument();
        fireEvent.click(buttonAddToCartABC27G2SPMonitor);

        // Post Expectations
        expect(screen.getByText(/ABC 27G2SP Monitor added to cart/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('link', { name: /cart/i }));
        expect(_router.state.location.pathname).toEqual("/cart");
         
        expect(screen.getByRole("heading", { name: 'Shopping Cart' })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: 'ABC 27G2SP Monitor' })).toBeInTheDocument();
    
        const img = screen.getByAltText("abc-27g2sp-monitor.jpg");
        expect(img).toBeInTheDocument();
        expect(img.getAttribute("src")).toContain('abc-27g2sp-monitor.jpg');

        const price = screen.getByText("$150.00");
        expect(price).toBeInTheDocument();    
    
        const qtyDropDown = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });
        expect(qtyDropDown).toBeInTheDocument();
        expect(qtyDropDown).toHaveValue("1");
    
        const removeButton = screen.getByRole("button", { name: "Remove Item ABC 27G2SP Monitor" });
        expect(removeButton).toBeInTheDocument();
    });
  });

  it("should update item quantity in cart", async () => {
    await waitFor(async() => {
        // Pre Expectations: Previous test already added item to cart        
        fireEvent.click(screen.getByRole('link', { name: /cart/i }));
        expect(_router.state.location.pathname).toEqual("/cart");
         
        expect(screen.getByRole("heading", { name: 'Shopping Cart' })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: 'ABC 27G2SP Monitor' })).toBeInTheDocument();
    
        const img = screen.getByAltText("abc-27g2sp-monitor.jpg");
        expect(img).toBeInTheDocument();
        expect(img.getAttribute("src")).toContain('abc-27g2sp-monitor.jpg');
    
        const qtyDropDown = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });
        expect(qtyDropDown).toBeInTheDocument();
        expect(qtyDropDown).toHaveValue("1");

        // Actions
        // Action 1: Go to Home Page
        fireEvent.click(screen.getByRole("link", { name: /home/i }));
        expect(_router.state.location.pathname).toEqual("/");
        
        // Action 2: Click on Add Item to Cart for the same item x2
        const buttonAddToCartABC27G2SPMonitor = screen.getByRole('button', { name : /ABC 27G2SP Monitor/i})
        expect(buttonAddToCartABC27G2SPMonitor).toBeInTheDocument();
        fireEvent.click(buttonAddToCartABC27G2SPMonitor);
        fireEvent.click(buttonAddToCartABC27G2SPMonitor);
        
        // Action 3: Go To The Cart Page
        fireEvent.click(screen.getByRole("link", { name: /cart/i }));
        expect(_router.state.location.pathname).toEqual("/cart");
        
        // Post Expectations 
        expect(screen.getByRole("heading", { name: 'Shopping Cart' })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: 'ABC 27G2SP Monitor' })).toBeInTheDocument();
    
        const imgAfter = screen.getByAltText("abc-27g2sp-monitor.jpg");
        expect(imgAfter).toBeInTheDocument();
        expect(imgAfter.getAttribute("src")).toContain('abc-27g2sp-monitor.jpg');
    
        const qtyDropDownAfter = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });
        expect(qtyDropDownAfter).toBeInTheDocument();
        expect(qtyDropDownAfter).toHaveValue("3");
        
    });    
  });
  
});
