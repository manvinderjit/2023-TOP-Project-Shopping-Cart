import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";
import { renderWithProviders } from "./test-utils";

describe("should render Error Page", () => {
    // Setup
    beforeEach(() => {
        // Create Router
        const router = createMemoryRouter(routerConfig, {
        initialEntries: ["/unknown"],
    });

        // Render with provider
        renderWithProviders(<RouterProvider router={router} />);
    });

    it("should render the 404 Error page", () => {
        // Post Expectations
        expect(screen.getByText(/404/i)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Page not found/i })).toBeInTheDocument();
        expect(screen.getByText(/Sorry, we couldn’t find the page you’re looking for./i)).toBeInTheDocument();
    });

    it("should render the 'Go back home' link", () => {
        const linkGoBackHome = screen.getByRole("link", { name: /Go back home/i });
        // Post Expectations
        expect(linkGoBackHome).toBeInTheDocument();
        expect(linkGoBackHome).toHaveAttribute("href", "/");
    });
  
});

describe("should render home page when user clicks the 'Go back home' link", () => {
    // Setup
    // Create Router
    const router = createMemoryRouter(routerConfig, {
        initialEntries: ["/unknown"],
    });
    beforeEach(() => {
        // Render with provider
        renderWithProviders(<RouterProvider router={router} />);
    });
    
    it("should render home page when user clicks the 'Go back home' link", async() => {
        // Pre Expectations
        const linkGoBackHome = screen.getByRole("link", { name: /Go back home/i });
        expect(linkGoBackHome).toBeInTheDocument();
        expect(linkGoBackHome).toHaveAttribute("href", "/");
        
        // Actions: Simulate user clicking on the 'Go back home' link
        fireEvent.click(linkGoBackHome);

        // Post Expectations
        await waitFor(async() => {
            // Check router page to equal home '/'
            expect(router.state.location.pathname).toEqual("/");
            // Check the 'Home' link is highlighted in the correct color
            expect(screen.getByRole("link", { name: "Home" }).parentElement?.classList.contains("text-[#646cff]")).toBe(true);
        });
    });

});