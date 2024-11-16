import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NavItemsTopMobile from "../src/components/nav/NavItemsTopMobile";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/application/store";

describe("should render the Mobile Navigation Menu", () => {
  
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/" }]}
        >
          <NavItemsTopMobile />
        </MemoryRouter>
      </Provider>
    );
  });
  
  it("should render the Mobile Navigation Menu", async() => {
    // Post Expectations
    const buttonExpandNavigationMenu = screen.getByRole("button", { name: /Navigation Menu/i });
    expect(buttonExpandNavigationMenu).toBeInTheDocument();
    expect(buttonExpandNavigationMenu).toHaveAttribute('aria-expanded', "false");
  });

  it("should not render Menu Items when the Mobile Navigation Menu is first loaded", async() => {
    // Pre Expectations
    const buttonExpandNavigationMenu = screen.getByRole("button", { name: /Navigation Menu/i });
    expect(buttonExpandNavigationMenu).toBeInTheDocument();

    // Post Expectations
    await expect(buttonExpandNavigationMenu.getAttribute("aria-expanded")).toEqual("false");
    const linksNavTopMobile = screen.queryAllByRole('link');
    expect(linksNavTopMobile).toHaveLength(0);

    const linkToHomeNavTopMobile = screen.queryByRole('link', { name: 'Home' });
    expect(linkToHomeNavTopMobile).not.toBeInTheDocument();
    
    const linkToRegisterNavTopMobile = screen.queryByRole("link", { name: "Register" });
    expect(linkToRegisterNavTopMobile).not.toBeInTheDocument();
    
    const linkToLoginNavTopMobile = screen.queryByRole("link", { name: "Login" });
    expect(linkToLoginNavTopMobile).not.toBeInTheDocument();
    
    const linkToCartNavTopMobile = screen.queryByRole("link", { name: "Cart" });
    expect(linkToCartNavTopMobile).not.toBeInTheDocument();
    
  });

  it("should render Menu Items when the Mobile Navigation Menu is expanded", async() => {

    // Pre Expectations
    const buttonExpandNavigationMenu = screen.getByRole("button", { name: /Navigation Menu/i });
    expect(buttonExpandNavigationMenu).toBeInTheDocument();
    expect(buttonExpandNavigationMenu.getAttribute("aria-expanded")).toEqual("false");

    // Actions: Click on the Navigation Menu button to Expand the Mobile Navigation Menu
    fireEvent.click(buttonExpandNavigationMenu);
    
    // Post Expectations
    await waitFor(async() => {
      
      expect(buttonExpandNavigationMenu.getAttribute("aria-expanded")).toEqual("true");
      const linksNavTopMobile = screen.queryAllByRole("link");
      expect(linksNavTopMobile).toHaveLength(4);

      const linkToHomeNavTopMobile = screen.getByRole('link', { name: 'Home' });
      expect(linkToHomeNavTopMobile).toBeInTheDocument();
      expect(linkToHomeNavTopMobile.textContent).toMatch(/Home/i);
      expect(linkToHomeNavTopMobile).toHaveAttribute('href', '/');
      
      const linkToRegisterNavTopMobile = screen.getByRole("link", { name: "Register" });
      expect(linkToRegisterNavTopMobile).toBeInTheDocument();
      expect(linkToRegisterNavTopMobile.textContent).toMatch(/Register/i);
      expect(linkToRegisterNavTopMobile).toHaveAttribute("href", "/register");

      const linkToLoginNavTopMobile = screen.getByRole("link", { name: "Login" });
      expect(linkToLoginNavTopMobile).toBeInTheDocument();
      expect(linkToLoginNavTopMobile.textContent).toMatch(/Login/i);
      expect(linkToLoginNavTopMobile).toHaveAttribute("href", "/login");

      const linkToCartNavTopMobile = screen.getByRole("link", { name: "Cart" });
      expect(linkToCartNavTopMobile).toBeInTheDocument();
      expect(linkToCartNavTopMobile.textContent).toMatch(/Cart/i);
      expect(linkToCartNavTopMobile).toHaveAttribute("href", "/cart");
      
    });
  });

  it("should not render Menu Items when the Mobile Navigation Menu is closed", async() => {

    // Pre Expectations
    const buttonExpandNavigationMenu = screen.getByRole("button", { name: /Navigation Menu/i });
    expect(buttonExpandNavigationMenu).toBeInTheDocument();
    
    // Pre Action: Click on the Navigation Menu button to Expand the Menu
    fireEvent.click(buttonExpandNavigationMenu);
    expect(buttonExpandNavigationMenu.getAttribute("aria-expanded")).toEqual("true");
    
    const linksNavTopMobile = screen.queryAllByRole("link");
    expect(linksNavTopMobile).toHaveLength(4);

    // Actions: Click on the Navigation Menu button to Collapse the Mobile Navigation Menu
    fireEvent.click(buttonExpandNavigationMenu);

    // Post Expectations
    await waitFor(async() => {

      expect(buttonExpandNavigationMenu.getAttribute("aria-expanded")).toEqual("false");

      const linksNavTopMobile = screen.queryAllByRole("link");
      expect(linksNavTopMobile).toHaveLength(0);

      const linkToHomeNavTopMobile = screen.queryByRole('link', { name: 'Home' });
      expect(linkToHomeNavTopMobile).not.toBeInTheDocument();
      
      const linkToRegisterNavTopMobile = screen.queryByRole("link", { name: "Register" });
      expect(linkToRegisterNavTopMobile).not.toBeInTheDocument();
      
      const linkToLoginNavTopMobile = screen.queryByRole("link", { name: "Login" });
      expect(linkToLoginNavTopMobile).not.toBeInTheDocument();
      
      const linkToCartNavTopMobile = screen.queryByRole("link", { name: "Cart" });
      expect(linkToCartNavTopMobile).not.toBeInTheDocument();
      
    });
  });

  it("should close the Mobile Navigation Menu when a link is clicked" , async() => {

    // Pre Expectations
    const buttonExpandNavigationMenu = screen.getByRole("button", { name: /Navigation Menu/i });
    expect(buttonExpandNavigationMenu).toBeInTheDocument();
    expect(buttonExpandNavigationMenu.getAttribute("aria-expanded")).toEqual("false");

    
    // Pre Actions: 1. Click on the Navigation Menu button to Expand the Mobile Navigation Menu
    fireEvent.click(buttonExpandNavigationMenu);
    expect(buttonExpandNavigationMenu.getAttribute("aria-expanded")).toEqual("true");
    
    await waitFor(async() => {
      // Pre Actions: 2. Click on the Login link
      fireEvent.click(buttonExpandNavigationMenu);
      const linkToCartNavTopMobileBefore = screen.getByRole("link", { name: "Cart" });
      expect(linkToCartNavTopMobileBefore).toBeInTheDocument();

      // Actions
      fireEvent.click(buttonExpandNavigationMenu);
      
      // Post Expectations
      expect(buttonExpandNavigationMenu.getAttribute("aria-expanded")).toEqual("false");
      const linkToCartNavTopMobileAfter = screen.queryByRole("link", { name: "Cart" });
      expect(linkToCartNavTopMobileAfter).not.toBeInTheDocument();

      const linksNavTopMobile = screen.queryAllByRole("link");
      expect(linksNavTopMobile).toHaveLength(0);

    });

  });

});
