import { render, screen } from "@testing-library/react";
import UserOrders from "./UserOrders";
import { expect } from "vitest";
import { http, HttpResponse } from "msw";
import { apiURL, apiSlice } from "../../features/api/apiSlice";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { store } from "../../application/store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routerConfig from "../../../__test__/routerConfig";

// Mock Orders List Data
const ordersList = [
  {
    _id: "65c919bb015b6fe503fa7869",
    customerId: "65c919a5015b6fe503fa7852",
    items: [
      {
        itemId: "65c2d11b9b446c7905bcaad2",
        itemQuantity: 2,
        itemPrice: 10,
        _id: "65c2d11b9b446c7905bcaad2",
        id: "65c2d11b9b446c7905bcaad2",
        itemDetails: {
          _id: "65c2d11b9b446c7905bcaad2",
          name: "Cool Keyboards",
          description: "An entry level ergonomic keyboard from Cool Keyboards",
          imageFilename: "cool-keyboards.jpg",
          url: "/allproducts/65c2d11b9b446c7905bcaad2",
          id: "65c2d11b9b446c7905bcaad2",
        },
      },
    ],
    totalAmount: "20.00",
    status: "Cancelled",
    createdAt: "2/11/2024",
    updatedAt: "2/11/2024",
    __v: 0,
    url: "/orders/65c919bb015b6fe503fa7869",
    id: "65c919bb015b6fe503fa7869",
  },
  {
    _id: "65cc485eee7fe43422036925",
    customerId: "65c919a5015b6fe503fa7852",
    items: [
      {
        itemId: "65c2d11b9b446c7905bcaad2",
        itemQuantity: 2,
        itemPrice: 10,
        _id: "65c2d11b9b446c7905bcaad2",
        id: "65c2d11b9b446c7905bcaad2",
        itemDetails: {
          _id: "65c2d11b9b446c7905bcaad2",
          name: "Cool Keyboards",
          description: "An entry level ergonomic keyboard from Cool Keyboards",
          imageFilename: "cool-keyboards.jpg",
          url: "/allproducts/65c2d11b9b446c7905bcaad2",
          id: "65c2d11b9b446c7905bcaad2",
        },
      },
    ],
    totalAmount: "20.00",
    status: "Ordered",
    createdAt: "2/14/2024",
    updatedAt: "2/14/2024",
    __v: 0,
    url: "/orders/65cc485eee7fe43422036925",
    id: "65cc485eee7fe43422036925",
  },
  {
    _id: "65d53071b8061ffec1194f78",
    customerId: "65c919a5015b6fe503fa7852",
    items: [
      {
        itemId: "65d26877ee7fe43422036983",
        itemQuantity: 1,
        itemPrice: 150,
        _id: "65d26877ee7fe43422036983",
        id: "65d26877ee7fe43422036983",
        itemDetails: {
          _id: "65d26877ee7fe43422036983",
          name: "ABC 27G2SP Monitor",
          description: "The new ABC 27G2SP Monitor for offices.",
          imageFilename: "abc-27g2sp-monitor.jpg",
          url: "/allproducts/65d26877ee7fe43422036983",
          id: "65d26877ee7fe43422036983",
        },
      },
      {
        itemId: "65c2d11b9b446c7905bcaad2",
        itemQuantity: 1,
        itemPrice: 10,
        _id: "65c2d11b9b446c7905bcaad2",
        id: "65c2d11b9b446c7905bcaad2",
        itemDetails: {
          _id: "65c2d11b9b446c7905bcaad2",
          name: "Cool Keyboards",
          description: "An entry level ergonomic keyboard from Cool Keyboards",
          imageFilename: "cool-keyboards.jpg",
          url: "/allproducts/65c2d11b9b446c7905bcaad2",
          id: "65c2d11b9b446c7905bcaad2",
        },
      },
      {
        itemId: "65c945183e1a54b49df1d49b",
        itemQuantity: 1,
        itemPrice: 36,
        _id: "65c945183e1a54b49df1d49b",
        id: "65c945183e1a54b49df1d49b",
        itemDetails: {
          _id: "65c945183e1a54b49df1d49b",
          name: "Cool Keys RGB Keyboard",
          description: "This is an RGB keyboard from cool keys",
          imageFilename: "cool-keys-rgb-keyboard.jpg",
          url: "/allproducts/65c945183e1a54b49df1d49b",
          id: "65c945183e1a54b49df1d49b",
        },
      },
    ],
    totalAmount: "196.00",
    status: "Ordered",
    createdAt: "2/20/2024",
    updatedAt: "2/20/2024",
    __v: 0,
    url: "/orders/65d53071b8061ffec1194f78",
    id: "65d53071b8061ffec1194f78",
  },
  {
    _id: "65e4dfd07bdd9ba321902863",
    customerId: "65c919a5015b6fe503fa7852",
    items: [
      {
        itemId: "65d26877ee7fe43422036983",
        itemQuantity: 1,
        itemPrice: 150,
        _id: "65d26877ee7fe43422036983",
        id: "65d26877ee7fe43422036983",
        itemDetails: {
          _id: "65d26877ee7fe43422036983",
          name: "ABC 27G2SP Monitor",
          description: "The new ABC 27G2SP Monitor for offices.",
          imageFilename: "abc-27g2sp-monitor.jpg",
          url: "/allproducts/65d26877ee7fe43422036983",
          id: "65d26877ee7fe43422036983",
        },
      },
    ],
    totalAmount: "150.00",
    status: "Delivered",
    createdAt: "3/3/2024",
    updatedAt: "3/14/2024",
    __v: 0,
    url: "/orders/65e4dfd07bdd9ba321902863",
    id: "65e4dfd07bdd9ba321902863",
  },
  {
    _id: "65fb1414e5f5ad0bd9601b7e",
    customerId: "65c919a5015b6fe503fa7852",
    items: [
      {
        itemId: "65d26877ee7fe43422036983",
        itemQuantity: 1,
        itemPrice: 150,
        _id: "65d26877ee7fe43422036983",
        id: "65d26877ee7fe43422036983",
        itemDetails: {
          _id: "65d26877ee7fe43422036983",
          name: "ABC 27G2SP Monitor",
          description: "The new ABC 27G2SP Monitor for offices.",
          imageFilename: "abc-27g2sp-monitor.jpg",
          url: "/allproducts/65d26877ee7fe43422036983",
          id: "65d26877ee7fe43422036983",
        },
      },
      {
        itemId: "65c2d11b9b446c7905bcaad2",
        itemQuantity: 1,
        itemPrice: 10,
        _id: "65c2d11b9b446c7905bcaad2",
        id: "65c2d11b9b446c7905bcaad2",
        itemDetails: {
          _id: "65c2d11b9b446c7905bcaad2",
          name: "Cool Keyboards",
          description: "An entry level ergonomic keyboard from Cool Keyboards",
          imageFilename: "cool-keyboards.jpg",
          url: "/allproducts/65c2d11b9b446c7905bcaad2",
          id: "65c2d11b9b446c7905bcaad2",
        },
      },
    ],
    totalAmount: "160.00",
    status: "Cancelled",
    createdAt: "3/20/2024",
    updatedAt: "3/20/2024",
    __v: 0,
    url: "/orders/65fb1414e5f5ad0bd9601b7e",
    id: "65fb1414e5f5ad0bd9601b7e",
  },
  {
    _id: "66a41de0e5f5ad0bd960302b",
    customerId: "65c919a5015b6fe503fa7852",
    items: [
      {
        itemId: "65d26877ee7fe43422036983",
        itemQuantity: 1,
        itemPrice: 150,
        _id: "65d26877ee7fe43422036983",
        id: "65d26877ee7fe43422036983",
        itemDetails: {
          _id: "65d26877ee7fe43422036983",
          name: "ABC 27G2SP Monitor",
          description: "The new ABC 27G2SP Monitor for offices.",
          imageFilename: "abc-27g2sp-monitor.jpg",
          url: "/allproducts/65d26877ee7fe43422036983",
          id: "65d26877ee7fe43422036983",
        },
      },
      {
        itemId: "65c2d11b9b446c7905bcaad2",
        itemQuantity: 1,
        itemPrice: 10,
        _id: "65c2d11b9b446c7905bcaad2",
        id: "65c2d11b9b446c7905bcaad2",
        itemDetails: {
          _id: "65c2d11b9b446c7905bcaad2",
          name: "Cool Keyboards",
          description: "An entry level ergonomic keyboard from Cool Keyboards",
          imageFilename: "cool-keyboards.jpg",
          url: "/allproducts/65c2d11b9b446c7905bcaad2",
          id: "65c2d11b9b446c7905bcaad2",
        },
      },
      {
        itemId: "65c945183e1a54b49df1d49b",
        itemQuantity: 1,
        itemPrice: 36,
        _id: "65c945183e1a54b49df1d49b",
        id: "65c945183e1a54b49df1d49b",
        itemDetails: {
          _id: "65c945183e1a54b49df1d49b",
          name: "Cool Keys RGB Keyboard",
          description: "This is an RGB keyboard from cool keys",
          imageFilename: "cool-keys-rgb-keyboard.jpg",
          url: "/allproducts/65c945183e1a54b49df1d49b",
          id: "65c945183e1a54b49df1d49b",
        },
      },
    ],
    totalAmount: "196.00",
    status: "Ordered",
    createdAt: "7/26/2024",
    updatedAt: "7/26/2024",
    __v: 0,
    url: "/orders/66a41de0e5f5ad0bd960302b",
    id: "66a41de0e5f5ad0bd960302b",
  },
  {
    _id: "66b179c6e5f5ad0bd960321c",
    customerId: "65c919a5015b6fe503fa7852",
    items: [
      {
        itemId: "65d26877ee7fe43422036983",
        itemQuantity: 1,
        itemPrice: 150,
        _id: "65d26877ee7fe43422036983",
        id: "65d26877ee7fe43422036983",
        itemDetails: {
          _id: "65d26877ee7fe43422036983",
          name: "ABC 27G2SP Monitor",
          description: "The new ABC 27G2SP Monitor for offices.",
          imageFilename: "abc-27g2sp-monitor.jpg",
          url: "/allproducts/65d26877ee7fe43422036983",
          id: "65d26877ee7fe43422036983",
        },
      },
    ],
    totalAmount: "150.00",
    status: "Ordered",
    createdAt: "8/6/2024",
    updatedAt: "8/6/2024",
    __v: 0,
    url: "/orders/66b179c6e5f5ad0bd960321c",
    id: "66b179c6e5f5ad0bd960321c",
  },
  {
    _id: "66b179dfe5f5ad0bd9603232",
    customerId: "65c919a5015b6fe503fa7852",
    items: [
      {
        itemId: "65c945183e1a54b49df1d49b",
        itemQuantity: 1,
        itemPrice: 36,
        _id: "65c945183e1a54b49df1d49b",
        id: "65c945183e1a54b49df1d49b",
        itemDetails: {
          _id: "65c945183e1a54b49df1d49b",
          name: "Cool Keys RGB Keyboard",
          description: "This is an RGB keyboard from cool keys",
          imageFilename: "cool-keys-rgb-keyboard.jpg",
          url: "/allproducts/65c945183e1a54b49df1d49b",
          id: "65c945183e1a54b49df1d49b",
        },
      },
    ],
    totalAmount: "36.00",
    status: "Ordered",
    createdAt: "8/6/2024",
    updatedAt: "8/6/2024",
    __v: 0,
    url: "/orders/66b179dfe5f5ad0bd9603232",
    id: "66b179dfe5f5ad0bd9603232",
  },
];

// Use msw to intercept the network request during the test,
export const handlers = [
  // Product request handler
  http.get(`${apiURL}/api/orders`, async () => {
    return HttpResponse.json({
        ordersList        
    });
  })
];

// Create Router
const router = createMemoryRouter(routerConfig, {
    initialEntries: ["/orders"],
});

describe("should render UserOrders component", () => {
    beforeEach(() => {
        render(
          <Provider store={store}>
            <RouterProvider router={router}/>
          </Provider>
        );
    });

    const server = setupServer(...handlers);

    // Enable API mocking before tests.
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => {
      server.resetHandlers();
    //   store.dispatch(apiSlice.util.resetApiState());
    });

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    
    it("should render the UserOrders component", () => {
        expect(screen.getByRole("region", { name: "User Orders"})).toBeInTheDocument();
    });

    it("should render the heading 'Your Orders'", () => {
        expect(screen.getByRole("heading", { name: "Your Orders"})).toBeInTheDocument();
    });  
});