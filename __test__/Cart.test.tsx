import React from "react";
import { fireEvent, getAllByTestId, getByRole, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routerConfig from "./routerConfig";
import { renderWithProviders, setupStore } from "./test-utils";

describe("Cart Page When Empty Cart", () => {
  beforeEach(() => {
    // Create Router
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ["/cart"],
    });
    
    // Render with provider
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


describe("render Cart Page With Items In Cart", () => {
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
    // Create Router
    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/cart"],
    });

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
      ],
      totalAmount: 150,
      totalCartQuantity: 1,
      error: null,
      message: null,
    };

    // renderWithProviders(<RouterProvider router={_router} />, { store });

    // Render with provider and store
    renderWithProviders(<RouterProvider router={_router} />, {
      preloadedState: {
        cart: initialCart,
      },
    });
  });

  it("should not render 'Empty Cart' message", () => {
    expect(screen.queryByText(/your shopping cart is empty/i)).not.toBeInTheDocument();
  });

  it("should not render the 'cart' svg icon", () => {
    const buttonBrowseItems = screen.queryByRole("iconCartWhenEmpty");
    expect(buttonBrowseItems).not.toBeInTheDocument();
  });

  it("should not render 'Browse Items' link to go to the home page", () => {
    const buttonBrowseItems = screen.queryByRole("link", { name: "Browse Items" });
    expect(buttonBrowseItems).not.toBeInTheDocument();
  });

  it("should render the Cart section", () => {    
    expect(screen.getByRole("sectionCart")).toBeInTheDocument();
  });

  it("should render the heading 'Shopping Cart'", () => {
    expect(screen.getByRole("heading", { name: 'Shopping Cart' })).toBeInTheDocument();
  });

  it("should render the product name heading 'ABC 27G2SP Monitor'", () => {
    expect(screen.getByRole("heading", { name: 'ABC 27G2SP Monitor' })).toBeInTheDocument();
  });

  it("should render the Product image with src 'abc-27g2sp-monitor.jpg'", () => {
    const img = screen.getByAltText("abc-27g2sp-monitor.jpg");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain('abc-27g2sp-monitor.jpg');
  });

  it("should render the Product price", () => {
    const price = screen.getByText("$150.00");
    expect(price).toBeInTheDocument();    
  });

  it("should render the Qty DropDown", () => {
    const qtyDropDown = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });
    expect(qtyDropDown).toBeInTheDocument();
  });

  it("should render the correct quantity value", () => {
    const qtyDropDown = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });    
    expect(qtyDropDown).toHaveValue("1");
  });

  it("should render the Remove button", () => {
    const removeButton = screen.getByRole("button", { name: "Remove Item ABC 27G2SP Monitor" });
    expect(removeButton).toBeInTheDocument();
  });

  it("should render the heading 'Order Summary'", () => {
    expect(screen.getByRole("heading", { name: 'Order Summary' })).toBeInTheDocument();
  });
  
  it("should render 'Subtotal'", () => {
    expect(screen.getByRole("heading", { name: 'Subtotal' })).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
  });

  it("should render 'Shipping Estimate'", () => {
    expect(screen.getByRole("heading", { name: 'Shipping Estimate' })).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
  });

  it("should render 'Tax Estimate'", () => {
    expect(screen.getByRole("heading", { name: 'Tax Estimate' })).toBeInTheDocument();
    expect(screen.getByText("$20.8")).toBeInTheDocument();
  });

  it("should render 'Order Total'", () => {
    expect(screen.getByRole("heading", { name: 'Order Total' })).toBeInTheDocument();
    expect(screen.getByText("$180.8")).toBeInTheDocument();
  });

  it("should render the Checkout button", () => {
    const checkoutButton = screen.getByRole("button", { name: "Checkout" });
    expect(checkoutButton).toBeInTheDocument();    
  });  

  it("should render the Empty Cart button", () => {
    expect(screen.getByRole("button", { name: 'Empty Cart' })).toBeInTheDocument();
  });

  it("should render the 'Keep Shopping' link", () => {
    const KeepShoppingButton = screen.getByRole("link", { name: 'Keep Shopping' })
    expect(KeepShoppingButton).toBeInTheDocument();
    expect(KeepShoppingButton.getAttribute('href')).toEqual('/');
  });

  it("should be able to change item quantity", async() => {
    const qtyDropDown = screen.getByRole("combobox", {
      name: "Change Quantity ABC 27G2SP Monitor",
    });    
    expect(qtyDropDown).toBeInTheDocument();
    expect(qtyDropDown).toHaveValue("1");
    fireEvent.change(qtyDropDown, { target: { value:3 }});
    expect(qtyDropDown).toHaveValue("3");

    // TODO: 
    // should trigger the toast notification on value change
  });

  it("should be able to remove item ABC 27G2SP Monitor", () => {
    const removeItemButton = screen.getByRole("button", {
      name: "Remove Item ABC 27G2SP Monitor",
    });
    expect(removeItemButton).toBeInTheDocument();
    fireEvent.click(removeItemButton);
    expect(screen.queryByRole("button", { name: "Remove Item ABC 27G2SP Monitor"})).not.toBeInTheDocument();    
  });

})

describe("should be able to remove an item", async() => {

  beforeEach(async () => {

    // Create Router 
    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/cart"],
    });

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
      totalAmount: 160,
      totalCartQuantity: 3,
      error: null,
      message: null,
    };

    // Render with provider and store
    renderWithProviders(<RouterProvider router={_router} />, {
      preloadedState: {
        cart: initialCart,
      },
    });
    
  });

  it("should be able to remove item ABC 27G2SP Monitor while keeping the other item", () => {

    // Check if the item is rendered before removal
    expect(screen.getByRole("button", { name: "Remove Item ABC 27G2SP Monitor" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ABC 27G2SP Monitor" })).toBeInTheDocument();

    const imgBeforeDeletion = screen.getByAltText("abc-27g2sp-monitor.jpg");
    expect(imgBeforeDeletion).toBeInTheDocument();

    const priceBeforeDeletion = screen.getByText("$150.00");
    expect(priceBeforeDeletion).toBeInTheDocument();

    const qtyDropDownBeforeDeletion = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });
    expect(qtyDropDownBeforeDeletion).toBeInTheDocument();

    const removeButtonBeforeDeletion = screen.getByRole("button", { name: "Remove Item ABC 27G2SP Monitor" });
    expect(removeButtonBeforeDeletion).toBeInTheDocument();

    // Fire the click event to simulate user clicking on the Remove item button
    const removeItemButton = screen.getByRole("button", { name: "Remove Item ABC 27G2SP Monitor", });
    expect(removeItemButton).toBeInTheDocument();
    fireEvent.click(removeItemButton);
    
    // Tests to check if the targeted item 'ABC 27G2SP Monitor' is deleted
    expect(
      screen.queryByRole("button", { name: "Remove Item ABC 27G2SP Monitor" })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole("heading", { name: "ABC 27G2SP Monitor" })).not.toBeInTheDocument();

    const imgDeleted = screen.queryByAltText("abc-27g2sp-monitor.jpg");
    expect(imgDeleted).not.toBeInTheDocument();

    const priceDeleted = screen.queryByText("$150.00");
    expect(priceDeleted).not.toBeInTheDocument();

    const qtyDropDownDeleted = screen.queryByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });
    expect(qtyDropDownDeleted).not.toBeInTheDocument();

    const removeButtonDeleted = screen.queryByRole("button", { name: "Remove Item ABC 27G2SP Monitor" });
    expect(removeButtonDeleted).not.toBeInTheDocument();

    // Tests to check if the other item 'Cool Keyboards' is still displayed
    expect(screen.getByRole("heading", { name: "Cool Keyboards" })).toBeInTheDocument();

    const imgExists = screen.getByAltText("cool-keyboards.jpg");
    expect(imgExists).toBeInTheDocument();

    const priceExists = screen.getByText("$10.00");
    expect(priceExists).toBeInTheDocument();

    const qtyDropDownExists = screen.getByRole("combobox", { name: "Change Quantity Cool Keyboards" });
    expect(qtyDropDownExists).toBeInTheDocument();
    expect(qtyDropDownExists).toHaveValue("2");

    const removeButtonExists = screen.getByRole("button", { name: "Remove Item Cool Keyboards" });
    expect(removeButtonExists).toBeInTheDocument();

  });

});

describe("should be able to empty cart", async() => {

  beforeEach(async() => {
    // Create Router
    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/cart"],
    });

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
      ],
      totalAmount: 150,
      totalCartQuantity: 1,
      error: null,
      message: null,
    };

    // Render with provider and store
    renderWithProviders(<RouterProvider router={_router} />, {
      preloadedState: {
        cart: initialCart,
      },
    });

    // Fire the click 'Empty Cart' button event
    await fireEvent(
      screen.getByRole("button", { name: "Empty Cart" }),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  it("should render cart section", () => {
    expect(screen.queryByRole("sectionCart")).toBeInTheDocument();
  });
  
  // Check if it renders the empty cart  
  it("should render 'Empty Cart' message", () => {
    expect(
      screen.getByText(/your shopping cart is empty/i)
    ).toBeInTheDocument();
  });

  it("should render the 'cart' svg icon", () => {
    const buttonBrowseItems = screen.getByRole("iconCartWhenEmpty");
    expect(buttonBrowseItems).toBeInTheDocument();
  });

  it("should render 'Browse Items' link to go to the home page", () => {
    const buttonBrowseItems = screen.getByRole("link", {
      name: "Browse Items",
    });
    expect(buttonBrowseItems).toBeInTheDocument();
  });

  // Check if it not longer renders any cart items

  it("should not render the heading 'Shopping Cart'", () => {
    expect(
      screen.queryByRole("heading", { name: "Shopping Cart" })
    ).not.toBeInTheDocument();
  });

  it("should not render the product name heading 'ABC 27G2SP Monitor'", () => {
    expect(screen.queryByRole("heading", { name: 'ABC 27G2SP Monitor' })).not.toBeInTheDocument();
  });

  it("should not render the Product image with src 'abc-27g2sp-monitor.jpg'", () => {
    const img = screen.queryByAltText("abc-27g2sp-monitor.jpg");
    expect(img).not.toBeInTheDocument();    
  });

  it("should not render the Product price", () => {
    const price = screen.queryByText("$150.00");
    expect(price).not.toBeInTheDocument();    
  });

  it("should not render the Qty DropDown", () => {
    const qtyDropDown = screen.queryByRole("combobox", { name: "Qty" });
    expect(qtyDropDown).not.toBeInTheDocument();
  });

  it("should not render the Remove button", () => {
    const removeButton = screen.queryByRole("button", { name: "removeItem" });
    expect(removeButton).not.toBeInTheDocument();
  });

  it("should not render the heading 'Order Summary'", () => {
    expect(screen.queryByRole("heading", { name: 'Order Summary' })).not.toBeInTheDocument();
  });
  
  it("should not render 'Subtotal'", () => {
    expect(screen.queryByRole("heading", { name: 'Subtotal' })).not.toBeInTheDocument();
    expect(screen.queryByText("$10")).not.toBeInTheDocument();
  });

  it("should not render 'Shipping Estimate'", () => {
    expect(screen.queryByRole("heading", { name: 'Shipping Estimate' })).not.toBeInTheDocument();
    expect(screen.queryByText("$10")).not.toBeInTheDocument();
  });

  it("should not render 'Tax Estimate'", () => {
    expect(screen.queryByRole("heading", { name: 'Tax Estimate' })).not.toBeInTheDocument();
    expect(screen.queryByText("$20.8")).not.toBeInTheDocument();
  });

  it("should not render 'Order Total'", () => {
    expect(screen.queryByRole("heading", { name: 'Order Total' })).not.toBeInTheDocument();
    expect(screen.queryByText("$180.8")).not.toBeInTheDocument();
  });

  it("should not render the Checkout button", () => {
    expect(screen.queryByRole("button", { name: 'Checkout' })).not.toBeInTheDocument();
  });  

  it("should not render the Empty Cart button", () => {
    expect(screen.queryByRole("button", { name: 'Empty Cart' })).not.toBeInTheDocument();
  });

  it("should not render the 'Keep Shopping' link", () => {
    expect(screen.queryByRole("link", { name: 'Keep Shopping' })).not.toBeInTheDocument();
  });
  
});
