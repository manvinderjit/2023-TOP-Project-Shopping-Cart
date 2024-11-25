import { render, screen, waitFor } from "@testing-library/react";
import UserOrders from "../../pages/UserOrders";
import { expect } from "vitest";
import { http, HttpResponse } from "msw";
import { apiURL, apiSlice } from "../../features/api/apiSlice";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { store } from "../../application/store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routerConfig from "../../../__test__/routerConfig";
import { renderWithProviders } from "../../../__test__/test-utils";

// Mock Orders List Data
const ordersList = [
  {
    _id: "65c919bb015b6fe503fa7869",
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
    status: "Cancelled",
    createdAt: "2/11/2024",
    updatedAt: "2/11/2024",
    __v: 0,
    url: "/orders/65c919bb015b6fe503fa7869",
    id: "65c919bb015b6fe503fa7869",
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
  }
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

// Mock Auth State
const mockedAuth =  {
  username: 'email@abc.com',
  token: 'mock.token'
};

describe("should render UserOrders component", () => {
    beforeEach(() => {
        renderWithProviders(<RouterProvider router={router} />, {
          preloadedState: {
            auth: mockedAuth,
          },
        });
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

    it("should render 'loading' text when the component is loading", async () => {
      const compontentLoading = screen.getByText(/loading/i);
      expect(compontentLoading).toBeInTheDocument();
    });

    it("should render all orders", async() => {
      await waitFor(() => {
        expect(screen.getAllByText('Order Total')).toHaveLength(2);

        const imgItem1 = screen.getByRole("img", { name: "ABC 27G2SP Monitor" })
        expect(imgItem1).toBeInTheDocument();
        expect(imgItem1).toHaveAttribute("alt", "ABC 27G2SP Monitor");
        expect(imgItem1).toHaveAttribute("src", `${apiURL}/api/products/image/thumbs/abc-27g2sp-monitor.jpg`);

        const headingItem1Name = screen.getByRole("heading", { name: "ABC 27G2SP Monitor" });
        expect(headingItem1Name).toBeInTheDocument();

        const textItem1Description = screen.getByText(/The new ABC 27G2SP Monitor for offices./i);
        expect(textItem1Description).toBeInTheDocument();

        const textItem1Price = screen.getByText(150);
        expect(textItem1Price).toBeInTheDocument();
        
        const imgItem2 = screen.getByRole("img", { name: "Cool Keyboards" })
        expect(imgItem2).toBeInTheDocument();
        expect(imgItem2).toHaveAttribute("alt", "Cool Keyboards");
        expect(imgItem2).toHaveAttribute("src", `${apiURL}/api/products/image/thumbs/cool-keyboards.jpg`);
        
        const headingItem2Name = screen.getByRole("heading", { name: "Cool Keyboards" });
        expect(headingItem2Name).toBeInTheDocument();
    
        const textItem2Description = screen.getByText(/An entry level ergonomic keyboard from Cool Keyboards/i);
        expect(textItem2Description).toBeInTheDocument();
    
        const textItem2Price = screen.getByText(10);
        expect(textItem2Price).toBeInTheDocument();

        const imgItem3 = screen.getByRole("img", { name: "Cool Keys RGB Keyboard" })
        expect(imgItem3).toBeInTheDocument();
        expect(imgItem3).toHaveAttribute("alt", "Cool Keys RGB Keyboard");
        expect(imgItem3).toHaveAttribute("src", `${apiURL}/api/products/image/thumbs/cool-keys-rgb-keyboard.jpg`);
        
        const headingItem3Name = screen.getByRole("heading", { name: "Cool Keys RGB Keyboard" });
        expect(headingItem3Name).toBeInTheDocument();
    
        const textItem3Description = screen.getByText(/This is an RGB keyboard from cool keys/i);
        expect(textItem3Description).toBeInTheDocument();
    
        const textItem3Price = screen.getByText(36);
        expect(textItem3Price).toBeInTheDocument();
      
    });
  });
    
});

describe("should render UserOrders error", () => {
    beforeEach(() => {
      // Register request handler that returns error
      server.use(
        http.get(`${apiURL}/api/orders`, async () => {
          return HttpResponse.json("Something went wrong!", { status: 401 });
        })
      );
      renderWithProviders(<RouterProvider router={router} />, {
        preloadedState: {
          auth: mockedAuth,
        },
      });
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
    
    it("should render the error returned by backend", async () => {
      await waitFor(() => {
      const compontentLoading = screen.getByText(/Something went wrong!/i);
      expect(compontentLoading).toBeInTheDocument();
      });
    });
    
});
