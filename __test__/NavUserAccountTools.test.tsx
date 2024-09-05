import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavUserAccountTools from "../src/components/nav/NavUserAccountTools";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { store } from "../src/application/store";
import { Provider } from "react-redux";

describe("should render NavUser Account Tools", () => {

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/" }]}
        >
          <NavUserAccountTools />
        </MemoryRouter>
      </Provider>
    );
  });
  

  it("should render User Account Tools button", () => {
    // Post Expectations
    const buttonUserAccountTools = screen.getByRole("button", { name: /User Account Tools/i});
    expect(buttonUserAccountTools).toBeInTheDocument();
  });

  it("should render User Account Tools menu by default", () => {
    // Pre Expectations
    const buttonUserAccountTools = screen.getByRole("button", { name: /User Account Tools/i});
    expect(buttonUserAccountTools).toBeInTheDocument();

    // Post Expectations
    expect(screen.queryByRole("menu", { name: /User Account Tools/i})).not.toBeInTheDocument();
  });

  it("should not render items in User Account Tools menu by default", () => {
    // Pre Expectations
    const buttonUserAccountTools = screen.getByRole("button", { name: /User Account Tools/i});
    expect(buttonUserAccountTools).toBeInTheDocument();
    
    // Post Expectations
    expect(screen.queryByRole("menu", { name: /User Account Tools/i})).not.toBeInTheDocument();

    const linksUserAccountTools = screen.queryAllByRole("menuitem");
    expect(linksUserAccountTools).toHaveLength(0);

    const menuItemProfile = screen.queryByRole('menuitem', { name: /Dashboard/i});
    expect(menuItemProfile).not.toBeInTheDocument();

    const menuItemMyOrders = screen.queryByRole("menuitem", { name: /My Orders/i });
    expect(menuItemMyOrders).not.toBeInTheDocument();

    const menuItemLogout = screen.queryByRole("menuitem", { name: /Logout/i });
    expect(menuItemLogout).not.toBeInTheDocument();
  });

  it("should render User Account Tools menu with items when it is expanded by clicking", async() => {
    // Pre Expectations
    const buttonUserAccountTools = screen.getByRole("button", { name: /User Account Tools/i});
    expect(buttonUserAccountTools).toBeInTheDocument();
    expect(screen.queryByRole("menu", { name: /User Account Tools/i})).not.toBeInTheDocument();
    const linksUserAccountTools = screen.queryAllByRole("menuitem");
    expect(linksUserAccountTools).toHaveLength(0);
    expect(screen.queryByRole('menuitem', { name: /Dashboard/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /Logout/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /My Orders/i})).not.toBeInTheDocument();

    // Actions: Click to Expand User Account Tools menu
    fireEvent.click(buttonUserAccountTools);
    
    // Post Expectations
    expect(screen.getByRole("menu", { name: /User Account Tools/i})).toBeInTheDocument();
    const menuItemsUserAccountTools = screen.getAllByRole("menuitem");
    expect(menuItemsUserAccountTools).toHaveLength(3);
    expect(screen.getByRole('menuitem', { name: /Dashboard/i})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Logout/i})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /My Orders/i})).toBeInTheDocument();
      
  });
  
  it("should render items in User Account Tools menu when it is expanded by hovering over", async() => {
    // Pre Expectations
    const buttonUserAccountTools = screen.getByRole("button", { name: /User Account Tools/i});
    expect(buttonUserAccountTools).toBeInTheDocument();
    expect(screen.queryByRole("menu", { name: /User Account Tools/i})).not.toBeInTheDocument();
    const linksUserAccountTools = screen.queryAllByRole("menuitem");
    expect(linksUserAccountTools).toHaveLength(0);
    expect(screen.queryByRole('menuitem', { name: /Dashboard/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /Logout/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /My Orders/i})).not.toBeInTheDocument();
    
    // Action: Hover over to Expand User Account Tools menu
    await waitFor (() => userEvent.hover(buttonUserAccountTools) );

    // Post Expectations
    expect(screen.getByRole("menu", { name: /User Account Tools/i})).toBeInTheDocument();
    const menuItemsUserAccountTools = screen.getAllByRole("menuitem");
    expect(menuItemsUserAccountTools).toHaveLength(3);
    expect(screen.getByRole('menuitem', { name: /Dashboard/i})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Logout/i})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /My Orders/i})).toBeInTheDocument();
      
  });

  it("should not render items in User Account Tools when it is collapsed by clicking", () => {
    // Pre Expectations
    const buttonUserAccountTools = screen.getByRole("button", { name: /User Account Tools/i});
    expect(buttonUserAccountTools).toBeInTheDocument();
    // Pre Actions: Click to Expand User Account Tools menu
    fireEvent.click(buttonUserAccountTools);
    
    // Pre Expectations 
    expect(screen.getByRole("menu", { name: /User Account Tools/i})).toBeInTheDocument();

    const menuItemsUserAccountTools = screen.getAllByRole("menuitem");
    expect(menuItemsUserAccountTools).toHaveLength(3);
    expect(screen.getByRole('menuitem', { name: /Dashboard/i})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Logout/i})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /My Orders/i})).toBeInTheDocument();

    // Actions: Click to Collapse User Account Tools menu
    fireEvent.click(buttonUserAccountTools);
    
    // Post Expectations
    expect(screen.queryByRole("menu", { name: /User Account Tools/i})).not.toBeInTheDocument();

    const linksUserAccountTools = screen.queryAllByRole("menuitem");
    expect(linksUserAccountTools).toHaveLength(0);
    expect(screen.queryByRole('menuitem', { name: /Dashboard/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /Logout/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem', { name: /My Orders/i})).not.toBeInTheDocument();
  });

  it("should not render items in User Account Tools when it is collapsed by hovering out", async() => {
    // Pre Expectations
    const buttonUserAccountTools = screen.getByRole("button", { name: /User Account Tools/i});
    expect(buttonUserAccountTools).toBeInTheDocument();
    // Pre Actions: Click to Expand User Account Tools menu
    await waitFor(() => userEvent.hover(buttonUserAccountTools));
    // Pre Expectations 
    const menuUserAccountTools = screen.getByRole("menu", { name: /User Account Tools/i});
    expect(menuUserAccountTools).toBeInTheDocument();

    const menuItemsUserAccountTools = screen.getAllByRole("menuitem");
    expect(menuItemsUserAccountTools).toHaveLength(3);

    expect(screen.getByRole('menuitem', { name: /Dashboard/i})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /Logout/i})).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /My Orders/i})).toBeInTheDocument();
    
    // Actions: Hover out to Collapse User Account Tools menu
    await waitFor(() => userEvent.unhover(menuUserAccountTools));
    
    // Post Expectations
    await waitFor(() => {
      const linksUserAccountTools = screen.queryAllByRole("menuitem");
      expect(linksUserAccountTools).toHaveLength(0);
      expect(screen.queryByRole('menuitem', { name: /Dashboard/i})).not.toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: /Logout/i})).not.toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: /My Orders/i})).not.toBeInTheDocument();
    });
  });
});
