import { renderWithProviders } from "./test-utils";
import { apiURL } from "../src/features/api/apiSlice";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { http, HttpResponse } from "msw";
import routerConfig from "./routerConfig";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock Orders List Data
const ordersList = [
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
    status: "Ordered",
    createdAt: "3/20/2024",
    updatedAt: "3/22/2024",
    __v: 0,
    url: "/orders/65fb1414e5f5ad0bd9601b7e",
    id: "65fb1414e5f5ad0bd9601b7e",
  }
];

// Mock Auth State
const mockedAuth =  {
  username: 'email@abc.com',
  token: 'mock.token'
};

describe("should render ManageOrder", () => {
  
    // Create Router
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ["/orders"],
  });

  // Use msw to intercept the network request during the test,
  const handlers = [
    // Product request handler
    http.get(`${apiURL}/api/orders`, async () => {
      return HttpResponse.json({
        ordersList,
      });
    }),
  ];

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
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should render the ManageOrder component", async () => {
    await waitFor(() => {
      const linkManageOrder = screen.getByRole("link", {
        name: "Manage Order",
      });
      userEvent.click(linkManageOrder);
    });

    await waitFor(() => {
      const headingOrderDate = screen.getByRole("heading", {
        name: "Ordered On",
      });
      expect(headingOrderDate).toBeInTheDocument();

      const valueOrderDate = screen.getByLabelText("Ordered On");
      expect(valueOrderDate).toBeInTheDocument();
      expect(valueOrderDate.textContent).toEqual("3/20/2024");

      const headingOrderTotal = screen.getByRole("heading", {
        name: "Order Total",
      });
      expect(headingOrderTotal).toBeInTheDocument();

      const valueOrderTotal = screen.getByLabelText("Order Total");
      expect(valueOrderTotal).toBeInTheDocument();
      expect(valueOrderTotal.textContent).toEqual("160.00");

      const headingOrderStatus = screen.getByRole("heading", {
        name: "Order Status",
      });
      expect(headingOrderStatus).toBeInTheDocument();

      const valueOrderStatus = screen.getByLabelText("Order Status");
      expect(valueOrderStatus).toBeInTheDocument();
      expect(valueOrderStatus.textContent).toEqual("Ordered");

      const headingOrderUpdatedOn = screen.getByRole("heading", {
        name: "Order Updated On",
      });
      expect(headingOrderUpdatedOn).toBeInTheDocument();

      const valueOrderUpdatedOn = screen.getByLabelText("Order Updated On");
      expect(valueOrderUpdatedOn).toBeInTheDocument();
      expect(valueOrderUpdatedOn.textContent).toEqual("3/22/2024");

      const buttonCancelOrder = screen.getByRole("button", {
        name: "Cancel Order",
      });
      expect(buttonCancelOrder).toBeInTheDocument();
    });
  });
});

describe("should cancel an order", () => {
  // Create Router
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ["/orders"],
  });

  // Use msw to intercept the network request during the test,
  const handlers = [
    // Product request handler
    http.get(`${apiURL}/api/orders`, async () => {
      return HttpResponse.json({
        ordersList,
      });
    }),
    http.post(`${apiURL}/api/orders/cancel`, async () => {
        ordersList[0].status = "Cancelled";
        return HttpResponse.json({
            message: 'Success!'
        });
    }),
  ];

  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    server.resetHandlers();
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should render cancel the order", async () => {

    renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: {
        auth: mockedAuth,
      },
    });

    await waitFor(() => {
        // Pre Expectations Expect the link for 'ManageOrder' to be rendered
        const linkManageOrder = screen.getByRole("link", { name: "Manage Order", });
        // Setup: Go to the Manage Order page
        userEvent.click(linkManageOrder);
    });

    await waitFor(async() => {
        // Pre Expectations: Expect the Cancel Order button to be rendered
        const buttonCancelOrder = screen.getByRole("button", { name: "Cancel Order", });
        expect(buttonCancelOrder).toBeInTheDocument();

        // Action : Cancel the order
        fireEvent.click(buttonCancelOrder);

        expect(screen.getByText("...processing")).toBeInTheDocument();

        await waitFor(() => {
            screen.debug();
            expect(screen.getByText('Cancelled')).toBeInTheDocument();
        })

    });
  });
});

describe("should render backend error", () => {
  // Create Router
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ["/orders"],
  });

  // Use msw to intercept the network request during the test,
  const handlers = [
    // Product request handler
    http.get(`${apiURL}/api/orders`, async () => {
      return HttpResponse.json({
        ordersList,
      });
    }),
    http.post(`${apiURL}/api/orders/cancel`, async () => {
        console.log('interrupted');
      return HttpResponse.json({
        error:	"Invalid orderId!",
      }, { status: 400 });
    }),
  ];

  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    server.resetHandlers();
  });

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should render the backend error", async () => {
    renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: {
        auth: mockedAuth,
      },
    });

    await waitFor(() => {
      // Pre Expectations Expect the link for 'ManageOrder' to be rendered
      const linkManageOrder = screen.getByRole("link", {
        name: "Manage Order",
      });
      // Setup: Go to the Manage Order page
      userEvent.click(linkManageOrder);
    });

    await waitFor(async () => {
      // Pre Expectations: Expect the Cancel Order button to be rendered
      const buttonCancelOrder = screen.getByRole("button", {
        name: "Cancel Order",
      });
      expect(buttonCancelOrder).toBeInTheDocument();
      // Action: Cancel Order
      userEvent.click(buttonCancelOrder);

      // Post Expectations
      expect(screen.getByText(/Error! Invalid orderId!/i)).toBeInTheDocument();
      
    });
    
  });
});
