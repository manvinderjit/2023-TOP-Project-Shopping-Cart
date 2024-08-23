import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { expect, it } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routerConfig from "../../../__test__/routerConfig";
import { renderWithProviders } from "../../../__test__/test-utils";

describe("should render the CartDrawer Component", () => {

  // Create Router
    const _router = createMemoryRouter(routerConfig, {
      initialEntries: ["/"],
    });

    // Mock cart
    const initialCart = {
      cartItems: [
        {
          id: "65d26877ee7fe43422036983",
          name: "ABC 27G2SP Monitor",
          imageFilename: "abc-27g2sp-monitor.jpg",
          price: "150.00",
          itemQuantity: 3,
        },
        {
          id: "65c945183e1a54b49df1d49b",
          name: "Cool Keys RGB Keyboard",
          imageFilename: "cool-keys-rgb-keyboard.jpg",
          price: "36.00",
          itemQuantity: 1,
        },
      ],
      totalAmount: 486,
      totalCartQuantity: 4,
      error: null,
      message: null,
    };

  beforeEach(() => {
    renderWithProviders(<RouterProvider router={_router} />, {
      preloadedState: {
        cart: initialCart,
      },
    });
  });

  it("should render the Show Items in Cart button by default", () => {
    const buttonShowCartDrawer = screen.getByRole('button', { name: "Show Items in Cart" });
    expect(buttonShowCartDrawer).toBeInTheDocument();
  });

  it("should not render the CartDrawer component by default", () => {
    const sectionCartDrawer = screen.queryByRole('region', { name: "Current Cart Items" });
    expect(sectionCartDrawer).not.toBeInTheDocument();
  });

  it("should render the CartDrawer component when it is expanded", async () => {
    // Pre Expectations
    const buttonShowCartDrawer = screen.getByRole('button', { name: "Show Items in Cart" });
    expect(buttonShowCartDrawer).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: "Current Cart Items" })).not.toBeInTheDocument();

    // Actions
    userEvent.click(buttonShowCartDrawer);
    
    // Post Expectations
    await waitFor(() => {
      expect(screen.getByRole('region', { name: "Current Cart Items" })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: "Your Cart" })).toBeInTheDocument();
      const buttonCloseCartDrawer = screen.getByRole('button', { name: "Hide Cart Drawer" });
      expect(buttonCloseCartDrawer).toBeInTheDocument();
    });
    
  });

  it("should not render the CartDrawer component when it is collapsed", async () => {
    // Setup
    const buttonShowCartDrawer = screen.getByRole('button', { name: "Show Items in Cart" });
    expect(buttonShowCartDrawer).toBeInTheDocument();
    userEvent.click(buttonShowCartDrawer);
    
    // Pre Expectations
    await waitFor(() => {
      expect(screen.getByRole('region', { name: "Current Cart Items" })).toBeInTheDocument()
      const buttonCloseCartDrawer = screen.getByRole('button', { name: "Hide Cart Drawer" });
      expect(buttonCloseCartDrawer).toBeInTheDocument();
    });

    // Actions
    const buttonCloseCartDrawer = screen.getByRole('button', { name: "Hide Cart Drawer" });
    userEvent.click(buttonCloseCartDrawer);

    // Post Expectations
    await waitFor(() => {
      const sectionCartDrawer = screen.queryByRole('region', { name: "Current Cart Items" });
      expect(sectionCartDrawer).not.toBeInTheDocument();
      const buttonCloseCartDrawer = screen.queryByRole('button', { name: "Hide Cart Drawer" });
      expect(buttonCloseCartDrawer).not.toBeInTheDocument();
    });
    
  });

  it("should render the heading 'Your Cart' when CartDrawer is expanded", async () => {
    // Pre Expectations
    const buttonShowCartDrawer = screen.getByRole('button', { name: "Show Items in Cart" });
    expect(buttonShowCartDrawer).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: "Current Cart Items" })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: "Your Cart" })).not.toBeInTheDocument();

    // Actions
    userEvent.click(buttonShowCartDrawer);
    
    // Post Expectations
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: "Your Cart" })).toBeInTheDocument();
      expect(within(screen.getByRole("region", { name: "Current Cart Items" })).getByRole('link', { name: "Go To Cart" })).toBeInTheDocument();
    });
    
  });

  it("should render the link 'Go to Cart' in CartDrawer component", async () => {
    // Pre Expectations
    const buttonShowCartDrawer = screen.getByRole('button', { name: "Show Items in Cart" });
    expect(buttonShowCartDrawer).toBeInTheDocument();

    // Actions
    userEvent.click(buttonShowCartDrawer);
    
    // Post Expectations
    await waitFor(() => {
      expect(within(screen.getByRole("region", { name: "Current Cart Items" })).getByRole('link', { name: "Go To Cart" })).toBeInTheDocument();
    });
    
  });

  it("should render the cart items in the CartDrawer component", async() => {
    // Pre Expectations
    const buttonShowCartDrawer = screen.getByRole('button', { name: "Show Items in Cart" });
    expect(buttonShowCartDrawer).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: "Current Cart Items" })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: "Your Cart" })).not.toBeInTheDocument();

    // Actions
    userEvent.click(buttonShowCartDrawer);
    
    // Post Expectations
    await waitFor(() => {
      expect(screen.getByRole('region', { name: "Current Cart Items" })).toBeInTheDocument();

      const imgItem1 = screen.getByAltText("abc-27g2sp-monitor.jpg");
      expect(imgItem1).toBeInTheDocument();
      expect(imgItem1.getAttribute("src")).toContain("abc-27g2sp-monitor.jpg");
      
      const totalItem1Price = screen.getByText("$450");
      expect(totalItem1Price).toBeInTheDocument();
      
      const qtyDropDownItem1 = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });    
      expect(qtyDropDownItem1).toBeInTheDocument();
      expect(qtyDropDownItem1).toHaveValue("3");

      const removeButtonItem1 = screen.getByRole("button", { name: "Remove Item ABC 27G2SP Monitor" });
      expect(removeButtonItem1).toBeInTheDocument();

      const imgItem2 = screen.getByAltText("cool-keys-rgb-keyboard.jpg");
      expect(imgItem2).toBeInTheDocument();
      expect(imgItem2.getAttribute("src")).toContain("cool-keys-rgb-keyboard.jpg");
      
      const totalItem2Price = screen.getByText("$36");
      expect(totalItem2Price).toBeInTheDocument();
      
      const qtyDropDownItem2 = screen.getByRole("combobox", { name: "Change Quantity Cool Keys RGB Keyboard" });
      expect(qtyDropDownItem2).toBeInTheDocument();
      expect(qtyDropDownItem2).toHaveValue("1");

      const removeButtonItem2 = screen.getByRole("button", { name: "Remove Item Cool Keys RGB Keyboard" });
      expect(removeButtonItem2).toBeInTheDocument();
    });
  });

  it("should change the cart item quantity in the CartDrawer component", async() => {
    // Setup: Expand the cart drawer
    const buttonShowCartDrawer = screen.getByRole('button', { name: "Show Items in Cart" });
    expect(buttonShowCartDrawer).toBeInTheDocument();
    userEvent.click(buttonShowCartDrawer);

    // Pre Expectations
    await waitFor(() => {
      expect(screen.getByRole('region', { name: "Current Cart Items" })).toBeInTheDocument();
      const qtyDropDownItem = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });    
      expect(qtyDropDownItem).toBeInTheDocument();
      expect(qtyDropDownItem).toHaveValue("3");
    });

    // Actions
    fireEvent.change(screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" }), { target: { value:5 }});

    // Post Expectations
    await waitFor(() => {
      const qtyDropDownItem = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });    
      expect(qtyDropDownItem).toBeInTheDocument();
      expect(qtyDropDownItem).toHaveValue("5");

    });
  });

  it("should change remove cart item from the CartDrawer component", async() => {
    // Setup: Expand the cart drawer
    const buttonShowCartDrawer = screen.getByRole('button', { name: "Show Items in Cart" });
    expect(buttonShowCartDrawer).toBeInTheDocument();
    userEvent.click(buttonShowCartDrawer);

    // Pre Expectations
    await waitFor(() => {
      
      const imgItem = screen.getByAltText("abc-27g2sp-monitor.jpg");
      expect(imgItem).toBeInTheDocument();
      expect(imgItem.getAttribute("src")).toContain("abc-27g2sp-monitor.jpg");
      
      const totalItemPrice = screen.getByText("$450");
      expect(totalItemPrice).toBeInTheDocument();
      
      const qtyDropDownItem = screen.getByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });    
      expect(qtyDropDownItem).toBeInTheDocument();
      expect(qtyDropDownItem).toHaveValue("3");

      const removeButtonItem = screen.getByRole("button", { name: "Remove Item ABC 27G2SP Monitor" });
      expect(removeButtonItem).toBeInTheDocument();
    });
    
    // Actions
    const removeButtonItem = screen.getByRole("button", { name: "Remove Item ABC 27G2SP Monitor" });
    expect(removeButtonItem).toBeInTheDocument();
    userEvent.click(removeButtonItem);

    // Post Expectations
    await waitFor(() => {
      
      const imgItem = screen.queryByAltText("abc-27g2sp-monitor.jpg");
      expect(imgItem).not.toBeInTheDocument();

      const totalItemPrice = screen.queryByText("$450");
      expect(totalItemPrice).not.toBeInTheDocument();

      const qtyDropDownItem = screen.queryByRole("combobox", { name: "Change Quantity ABC 27G2SP Monitor" });    
      expect(qtyDropDownItem).not.toBeInTheDocument();
      
      const removeButtonItem = screen.queryByRole("button", { name: "Remove Item ABC 27G2SP Monitor" });
      expect(removeButtonItem).not.toBeInTheDocument();

    });
  });
  
});
