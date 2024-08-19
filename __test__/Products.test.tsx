import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import { Provider } from "react-redux";
import { store } from "../src/application/store";
import Products from "../src/components/products/Products";
import { setupServer } from "msw/node";
import { apiSlice } from "../src/features/api/apiSlice";
import { http, HttpResponse } from "msw";

// Mock Data
const categoryList = [
  {
    _id: "65bdbd33510f8ff65f52e1c4",
    name: "Computer Keyboards",
    description:
      "A wide selection of keyboards ranging from entry-level to top-of-the-line mechanical ones.",
    __v: 0,
  },
  {
    _id: "65d267a1ee7fe43422036973",
    name: "Computer Monitor",
    description: "All types of computer monitors are available for sale.",
    __v: 0,
  },
];

const productList = [
    {
        _id: "65d26877ee7fe43422036983",
        name: "ABC 27G2SP Monitor",
        description: "The new ABC 27G2SP Monitor for offices.",
        imageUrl: "api/images/products/abc-27g2sp-monitor.jpg",
        imageFilename: "abc-27g2sp-monitor.jpg",
        category: {
            _id: "65d267a1ee7fe43422036973",
            name: "Computer Monitor",
        },
        price: "150.00",
        stock: 25,
        __v: 0,
        url: "/allproducts/65d26877ee7fe43422036983",
        id: "65d26877ee7fe43422036983",
    },
    {
        _id: "65c2d11b9b446c7905bcaad2",
        name: "Cool Keyboards",
        description: "An entry level ergonomic keyboard from Cool Keyboards",
        imageUrl: "api/images/products/cool-keyboards.jpg",
        imageFilename: "cool-keyboards.jpg",
        category: {
            _id: "65bdbd33510f8ff65f52e1c4",
            name: "Computer Keyboards",
        },
        price: "10.00",
        stock: 15,
        __v: 0,
        url: "/allproducts/65c2d11b9b446c7905bcaad2",
        id: "65c2d11b9b446c7905bcaad2",
    },
    {
        _id: "65c945183e1a54b49df1d49b",
        name: "Cool Keys RGB Keyboard",
        description: "This is an RGB keyboard from cool keys",
        imageUrl: "api/images/products/cool-keys-rgb-keyboard.jpg",
        imageFilename: "cool-keys-rgb-keyboard.jpg",
        category: {
            _id: "65bdbd33510f8ff65f52e1c4",
            name: "Computer Keyboards",
        },
        price: "36.00",
        stock: 10,
        __v: 0,
        url: "/allproducts/65c945183e1a54b49df1d49b",
        id: "65c945183e1a54b49df1d49b",
    },
];

// Use msw to intercept the network request during the test,
export const handlers = [
  // Product request handler
  http.get('https://ia.manvinderjit.com/api/products', async () => {
    return HttpResponse.json({
        categoryList,
        productList,
    });
  })
];

describe("should render all Products", () => {

    beforeEach(() =>
      render(
        <Provider store={store}>
          <Products />
        </Provider>
      )
    );

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
    
    it("should render first Product: 'ABC 27G2SP Monitor'", async() => {
        await waitFor(() => {
            const imageProduct = screen.getByRole("img", { name: "ABC 27G2SP Monitor" });
            expect(imageProduct).toBeInTheDocument();
            expect(imageProduct).toHaveAttribute("src","https://ia.manvinderjit.com/api/products/image/abc-27g2sp-monitor.jpg");
            expect(imageProduct).toHaveAttribute("alt", "ABC 27G2SP Monitor");

            const headingProductName = screen.getByRole("heading", {  name: "ABC 27G2SP Monitor"});
            expect(headingProductName).toBeInTheDocument();
    
            const textProductPrice = screen.getByLabelText("Price for ABC 27G2SP Monitor");
            expect(textProductPrice).toBeInTheDocument();
            expect(textProductPrice.innerHTML).toEqual("$150.00");

            const textProductDescription = screen.getByLabelText("Description for ABC 27G2SP Monitor");
            expect(textProductDescription).toBeInTheDocument();
            expect(textProductDescription.innerHTML).toEqual("The new ABC 27G2SP Monitor for offices.");

            const buttonAddToCart = screen.getByRole("button", { name: "Add ABC 27G2SP Monitor to cart"});
            expect(buttonAddToCart).toBeInTheDocument();
            expect(buttonAddToCart).toHaveAttribute("aria-label", "Add ABC 27G2SP Monitor to cart");
            expect(buttonAddToCart.innerHTML).toEqual("Add to Cart");

        });
    });

    it("should render second Product: 'Cool Keyboards'", async() => {
        await waitFor(() => {
            const imageProduct = screen.getByRole("img", { name: "Cool Keyboards" });
            expect(imageProduct).toBeInTheDocument();
            expect(imageProduct).toHaveAttribute("src","https://ia.manvinderjit.com/api/products/image/cool-keyboards.jpg");
            expect(imageProduct).toHaveAttribute("alt", "Cool Keyboards");

            const headingProductName = screen.getByRole("heading", {  name: "Cool Keyboards"});
            expect(headingProductName).toBeInTheDocument();
    
            const textProductPrice = screen.getByLabelText("Price for Cool Keyboards");
            expect(textProductPrice).toBeInTheDocument();
            expect(textProductPrice.innerHTML).toEqual("$10.00");

            const textProductDescription = screen.getByLabelText("Description for Cool Keyboards");
            expect(textProductDescription).toBeInTheDocument();
            expect(textProductDescription.innerHTML).toEqual("An entry level ergonomic keyboard from Cool Keyboards");

            const buttonAddToCart = screen.getByRole("button", { name: "Add Cool Keyboards to cart"});
            expect(buttonAddToCart).toBeInTheDocument();
            expect(buttonAddToCart).toHaveAttribute("aria-label", "Add Cool Keyboards to cart");
            expect(buttonAddToCart.innerHTML).toEqual("Add to Cart");

        });
    });

    it("should render third Product: 'Cool Keys RGB Keyboard'", async() => {
        await waitFor(() => {
            const imageProduct = screen.getByRole("img", { name: "Cool Keys RGB Keyboard" });
            expect(imageProduct).toBeInTheDocument();
            expect(imageProduct).toHaveAttribute("src","https://ia.manvinderjit.com/api/products/image/cool-keys-rgb-keyboard.jpg");
            expect(imageProduct).toHaveAttribute("alt", "Cool Keys RGB Keyboard");

            const headingProductName = screen.getByRole("heading", {  name: "Cool Keys RGB Keyboard"});
            expect(headingProductName).toBeInTheDocument();
    
            const textProductPrice = screen.getByLabelText("Price for Cool Keys RGB Keyboard");
            expect(textProductPrice).toBeInTheDocument();
            expect(textProductPrice.innerHTML).toEqual("$36.00");

            const textProductDescription = screen.getByLabelText("Description for Cool Keys RGB Keyboard");
            expect(textProductDescription).toBeInTheDocument();
            expect(textProductDescription.innerHTML).toEqual("This is an RGB keyboard from cool keys");

            const buttonAddToCart = screen.getByRole("button", { name: "Add Cool Keys RGB Keyboard to cart"});
            expect(buttonAddToCart).toBeInTheDocument();
            expect(buttonAddToCart).toHaveAttribute("aria-label", "Add Cool Keys RGB Keyboard to cart");
            expect(buttonAddToCart.innerHTML).toEqual("Add to Cart");

        });
    });

    

});