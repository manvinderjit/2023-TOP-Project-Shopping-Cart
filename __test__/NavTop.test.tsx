import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";

describe("Navigation Top", () => {
  it("renders Navigation", () => {
    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={_router} />);
    
    expect(screen.getByText(/Shopping App/)).toBeInTheDocument();
    screen.debug();
    
    expect(screen.getByRole('link', { name: 'Home' }).textContent).toMatch(/Home/i);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');

    expect(screen.getByRole('link', { name: 'Register' }).textContent).toMatch(/Register/i);
    expect(screen.getByRole('link', { name: 'Register' })).toHaveAttribute('href', '/register');

    expect(screen.getByRole('link', { name: 'Login' }).textContent).toMatch(/Login/i);
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login');

    expect(screen.getByRole('link', { name: 'Cart' }).textContent).toMatch(/Cart/i);
    expect(screen.getByRole('link', { name: 'Cart' })).toHaveAttribute('href', '/cart');
        
  }); 
  
});
