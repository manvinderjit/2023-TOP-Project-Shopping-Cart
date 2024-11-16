import React from 'react';
import Checkout from '../src/pages/Checkout';
import { renderWithProviders } from './test-utils';
import { BrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import routerConfig from './routerConfig';
import { http, HttpResponse } from "msw";
import { setupServer } from 'msw/node';
import { apiURL } from '../src/features/api/apiSlice';

// Mock cart
const initialCart = {
    cartItems: [
    {
        id: "65d26877ee7fe43422036983",
        name: "ABC 27G2SP Monitor",
        imageFilename: "abc-27g2sp-monitor.jpg",
        price: "150.00",
        itemQuantity: 1,
    },
    {
        id: "65c2d11b9b446c7905bcaad2",
        name: "Cool Keyboards",
        imageFilename: "cool-keyboards.jpg",
        price: "10.00",
        itemQuantity: 2
    },
    
    ],
    totalAmount: 170,
    totalCartQuantity: 3,
    error: null,
    message: null,
};

// Mock Auth State
const mockedAuth =  {
  username: 'email@abc.com',
  token: 'mock.token'
};

describe("should render Checkout component", () => {
    beforeEach(() => {
        renderWithProviders(
          <BrowserRouter>
            <Checkout />
          </BrowserRouter>,
          {
            preloadedState: {
              cart: initialCart,
              auth: mockedAuth,
            },
          }
        );
    })

    it("should render the Checkout component", () => {
        expect(screen.getByRole('heading', { name: 'Contact Information'})).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Order Summary'})).toBeInTheDocument();
    });

    it("should render the 'Pay Now' button", () => {
        expect(screen.getByRole('button', { name: 'Pay Now'})).toBeInTheDocument();
    });

    it("should render the 'Back to Cart' link", () => {
        const linkBackToCart = screen.getByRole('link', { name: 'Back to Cart'});
        expect(linkBackToCart).toBeInTheDocument();
        expect(linkBackToCart).toHaveAttribute('href', '/cart');
    });

    it("should render the 'Continue Shopping' link", () => {
        const linkBackToCart = screen.getByRole('link', { name: 'Continue Shopping'});
        expect(linkBackToCart).toBeInTheDocument();
        expect(linkBackToCart).toHaveAttribute('href', '/');
    });
});


describe("should checkout order", () => {
  // Setup
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ["/checkout"],
  });

  const handlers = [
    // Register request handler
    http.post(`${apiURL}/api/checkout`, async () => {
      return HttpResponse.json({
        message: "Order create successfully!",
      });
    }),
  ];

  const server = setupServer(...handlers);

  beforeEach(() => {
    renderWithProviders(
     <RouterProvider router={router} />,
      {
        preloadedState: {
          cart: initialCart,
          auth: mockedAuth,
        },
      }
    );
  });

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    server.resetHandlers();
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should render the Checkout component", () => {
      expect(screen.getByRole('heading', { name: 'Contact Information'})).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Order Summary'})).toBeInTheDocument();
  });

  it("should place the order and redirect to Orders page", async () => {
        // Pre Expectations
        const buttonPayNow = screen.getByRole("button", { name: "Pay Now" });
        expect(buttonPayNow).toBeInTheDocument();
        expect(router.state.location.pathname).toEqual("/checkout");

        // Actions
        fireEvent.click(buttonPayNow);

        // Post Expectations
        await waitFor(() => {
            expect(screen.getByText('Order Placed Successfully!')).toBeInTheDocument();
        });
        expect(router.state.location.pathname).toEqual('/orders');
  });
});
