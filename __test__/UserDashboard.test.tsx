import React from "react";
import { renderWithProviders } from "./test-utils";
import { apiURL } from "../src/features/api/apiSlice";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { http, HttpResponse } from "msw";
import routerConfig from "./routerConfig";
import { screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";

// Mock Auth State
const mockedAuth =  {
  username: 'email@abc.com',
  token: 'mock.token'
};

describe("User Dashboard", () => {
  // Create Router
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ["/dashboard"],
  });

  // Use msw to intercept the network request during the test,
  const handlers = [
    // Product request handler
    http.get(`${apiURL}/api/subscribe`, async () => {
      return HttpResponse.json({
        subscribed: true,
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

  it("should render User Dashboard for a logged-in user", async () => {
    await waitFor(async () => {
      expect(await screen.findByRole('heading', { name: /Dashboard/i })).toBeInTheDocument();
      expect(
        await screen.findByText(/Welcome email@abc.com/i)
      ).toBeInTheDocument();
      expect(router.state.location.pathname).toEqual("/dashboard");
    });
  });

  it("should render the subscription status heading", async () => {
    expect(await screen.findByRole("heading", { name: /Subscription Status/i })).toBeInTheDocument();
  });

  it("should render the subscription status of the user when the user is subscribed", async () => {
    expect(
        await screen.findByText(/You are currently subscribed!/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /Click on the Unsubscribe button to stop subscription emails!/i
      )
    ).toBeInTheDocument();
    
    expect(
      await screen.getByRole("button", { name: "unsubscribe-products" })
    ).toBeInTheDocument();
  });

  it("should render the subscription status of the user when the user is NOT subscribed", async () => {
    server.use(
      http.get(`${apiURL}/api/subscribe`, async () => {
        return HttpResponse.json({
          subscribed: false,
        });
      })
    );

    expect(
      await screen.findByText(/You are currently not subscribed!/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /You will receive an email on your registered email address to confirm your subscription/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /Click on the Subscribe button to be notified whenever a new product is launched!/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /Once you confirm subscription, we will notify you whenever we add a new product!/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.getByRole("button", { name: "subscribe-products" })
    ).toBeInTheDocument();

  });

  it("should render the subscription status of the user when the user subscription status is pending", async () => {
    server.use(
      http.get(`${apiURL}/api/subscribe`, async () => {
        return HttpResponse.json({
          subscribed: "pending",
        });
      })
    );

    expect(
      await screen.findByText(
        /Subscription confirmation pending!/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Check your email for a confirmation link./i)
    ).toBeInTheDocument();
    
  });

  it("should handle errors gracefully for subscription status and render messages", async () => {
    server.use(
      http.get(`${apiURL}/api/subscribe`, async () => {
        return HttpResponse.json(
          "Something went wrong!"
        ,
        {
          status: 400,
        }
      );
      })
    );
    await waitFor(async () => {
      expect(
        await screen.findByText(/Something went wrong!/i)
      ).toBeInTheDocument();
      screen.debug();
    });
    
  });


});

describe("User Subscribes", () => {
  // Create Router
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ["/dashboard"],
  });

  // Use msw to intercept the network request during the test,
  const handlers = [
    // Subscription status request handler
    http.get(`${apiURL}/api/subscribe`, async () => {
      return HttpResponse.json({
        subscribed: false
      });
    }),
    // Subscription request handler - success
    http.post(`${apiURL}/api/subscribe`, async () => {
      return HttpResponse.json({
        message:
          "Success! Please check your email for a subscription confirmation link!",
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

  it("should allow user to subscribe to notifications and render the success message", async () => {
    await waitFor(async () => {

        // Pre
        const subscribeButton = await screen.getByRole("button", {
          name: "subscribe-products",
        });
        expect(
           subscribeButton
        ).toBeInTheDocument();

        // Actions - Click on the subscribe button
        await userEvent.click(subscribeButton);

        await waitFor(() => {
          // Post Actions
          expect(
            screen.getByText(
              /Success! Please check your email for a subscription confirmation link!/i
            )
          ).toBeInTheDocument();
        })

        
    });
  });

  it("should handle errors gracefully and render error message when subscription process fails", async () => {

    server.use(
      http.post(`${apiURL}/api/subscribe`, async () => {
        return HttpResponse.json('Something went wrong', {
          status: 400,
        });
      })
    );
    
    await waitFor(async () => {
      // Pre
      const subscribeButton = await screen.getByRole("button", {
        name: "subscribe-products",
      });
      expect(subscribeButton).toBeInTheDocument();

      // Actions - Click on the subscribe button
      await userEvent.click(subscribeButton);

      // Post Actions
      expect(
        await screen.getByText(
          /Something went wrong/i
        )
      ).toBeInTheDocument();
    });
  });
});

describe("User Cancel Subscription", () => {
  // Create Router
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ["/dashboard"],
  });

  // Use msw to intercept the network request during the test,
  const handlers = [
    // Subscription status request handler
    http.get(`${apiURL}/api/subscribe`, async () => {
      return HttpResponse.json({
        subscribed: true
      });
    }),
    // Subscription request handler - success
    http.post(`${apiURL}/api/subscribe/cancel`, async () => {
      return HttpResponse.json({
        message: 'You have unsubscribed successfully!',
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

  it("should cancel subscription and render success message", async () => {
    await waitFor(async () => {
      // Pre
      const unsubscribeButton = await screen.getByRole("button", {
        name: "unsubscribe-products",
      });
      expect(unsubscribeButton).toBeInTheDocument();

      // Actions - Click on the subscribe button
      await userEvent.click(unsubscribeButton);

      // Post Actions
      expect(
        screen.getByText(/You have unsubscribed successfully!/i)
      ).toBeInTheDocument();
    });
  });

  it("should handle errors gracefully and render error messages when subscription can't be cancelled ", async () => {
    server.use(
      http.post(`${apiURL}/api/subscribe/cancel`, async () => {
        return HttpResponse.json("Something went wrong", {
          status: 400,
        });
      })
    );
    
    await waitFor(async () => {
      // Pre
      const unsubscribeButton = await screen.getByRole("button", {
        name: "unsubscribe-products",
      });
      expect(unsubscribeButton).toBeInTheDocument();

      // Actions - Click on the subscribe button
      await userEvent.click(unsubscribeButton);

      await waitFor(() => {
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
      });
    });
    
  });
});
