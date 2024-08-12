import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";
import { renderWithProviders, setupStore } from "./test-utils";
import { addItemToCart } from "../src/features/cart/cartSlice";

describe("Cart Page When Empty Cart", () => {
  beforeEach(() => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ["/cart"],
    });
    
    renderWithProviders(<RouterProvider router={router} />);
  });

  it("should render the Cart", () => {    
    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
  });

  it("should render 'Cart' in the Navigation bar in #646cff color", () => {
    const cartAsNavMenuItem = screen.getByRole("link", { name: 'Cart' });
    expect(cartAsNavMenuItem.parentElement?.classList.contains('text-[#646cff]')).toBe(true);
  });

  it("should show 'Empty Cart' message", () => {
    expect(screen.getByText(/your shopping cart is empty/i)).toBeInTheDocument();
  });

  it("should render the 'cart' svg", () => {
    const buttonBrowseItems = screen.getByRole("iconCartWhenEmpty");
    expect(buttonBrowseItems).toBeInTheDocument();
  });

  it("should render 'Browse Items' link to go to the home page", () => {
    const buttonBrowseItems = screen.getByRole("link", { name: "Browse Items" });
    expect(buttonBrowseItems).toBeInTheDocument();
  });

  it("should not render cart summary", () => {    
    expect(screen.queryByRole("section", { name: "section-cart" })).toBeNull();
  });

});


describe("Cart Page With Items In Cart", () => {
//  const store = setupStore();
//  store.dispatch(
//    addItemToCart({
//      id: "65c2d11b9b446c7905bcaad2",
//      name: "Cool Keyboards",
//      imageFilename: "cool-keyboards.jpg",
//      price: "10.00",
//      itemQuantity: 1,
//    })
//  );

  beforeEach(() => {
    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/cart"],
    });
    const initialCart = {
      cartItems: [{
        id: "65d26877ee7fe43422036983",
        name: "ABC 27G2SP Monitor",
        imageFilename: "abc-27g2sp-monitor.jpg",
        price: "150.00",
        itemQuantity: 1,
      }],
      totalAmount: 150,
      totalCartQuantity: 1,
      error: null,
      message: null,
    };

    // renderWithProviders(<RouterProvider router={_router} />, { store });
    renderWithProviders(<RouterProvider router={_router} />, {
      preloadedState: {
        cart: initialCart,
      }
    });
    
  });

  it("should not show 'Empty Cart' message", () => {
    expect(screen.queryByText(/your shopping cart is empty/i)).not.toBeInTheDocument();
  });

  it("should render the 'cart' svg icon", () => {
    const buttonBrowseItems = screen.queryByRole("iconCartWhenEmpty");
    expect(buttonBrowseItems).not.toBeInTheDocument();
  });

  it("should render 'Browse Items' link to go to the home page", () => {
    const buttonBrowseItems = screen.queryByRole("link", { name: "Browse Items" });
    expect(buttonBrowseItems).not.toBeInTheDocument();
  });

  it("should render cart section", () => {    
    expect(screen.getByRole("sectionCart")).toBeInTheDocument();
  });

  it("should render the heading 'Shopping Cart'", () => {
    expect(screen.getByRole("heading", { name: 'Shopping Cart' })).toBeInTheDocument();
  });

  it("should render the cart item", () => {
    expect(screen.getByRole("heading", { name: 'Shopping Cart' })).toBeInTheDocument();
  });

  it("should render the Product image with src 'abc-27g2sp-monitor.jpg'", () => {
    const img = screen.getByAltText("abc-27g2sp-monitor.jpg");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain('abc-27g2sp-monitor.jpg');
  });  

  it("should render the heading 'Order Summary'", () => {
    expect(screen.getByRole("heading", { name: 'Order Summary' })).toBeInTheDocument();
  });

  it("should render the product name heading 'ABC 27G2SP Monitor'", () => {
    expect(screen.getByRole("heading", { name: 'ABC 27G2SP Monitor' })).toBeInTheDocument();
  });  

  it("should render the Checkout button", () => {
    expect(screen.getByRole("button", { name: 'Checkout' })).toBeInTheDocument();
  });  

  it("should render the Empty Cart button", () => {
    expect(screen.getByRole("button", { name: 'Empty Cart' })).toBeInTheDocument();
  });

  it("should render the 'Continue Shopping' link", () => {
    expect(screen.getByRole("link", { name: 'Continue Shopping' })).toBeInTheDocument();
  });


})
    