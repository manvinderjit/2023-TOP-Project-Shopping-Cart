import { render, screen } from "@testing-library/react";
import UserOrderItem from "./UserOrderItem";
import { expect } from "vitest";
import { apiURL } from "../../../../features/api/apiSlice";

// Mock Item
const mockItem = {
        itemId: "65c945183e1a54b49df1d49b",
        itemQuantity: 1,
        itemPrice: 36,
        _id: "65c945183e1a54b49df1d49b",
        id: "65c945183e1a54b49df1d49b",
        itemDetails: {
          _id: "65c945183e1a54b49df1d49b",
          name: "Cool Keys RGB Keyboard",
          description: "This is an RGB keyboard from cool keys",
          imageFilename: "cool-keys-rgb-keyboard.jpg",
          url: "/allproducts/65c945183e1a54b49df1d49b",
          id: "65c945183e1a54b49df1d49b",
        },
      };

describe("should render UserOrderItem component", () => {
    
    beforeEach(() => render(<UserOrderItem item={mockItem} />));

    it("should render the item's image", () => {
        const imgItem = screen.getByRole("img", { name: "Cool Keys RGB Keyboard" })
        expect(imgItem).toBeInTheDocument();
        expect(imgItem).toHaveAttribute("alt", "Cool Keys RGB Keyboard");
        expect(imgItem).toHaveAttribute("src", `${apiURL}/api/products/image/cool-keys-rgb-keyboard.jpg`);
    });

    it("should render the item's name", () => {
        const headingItemName = screen.getByRole("heading", { name: "Cool Keys RGB Keyboard" });
        expect(headingItemName).toBeInTheDocument();
    });

    it("should render the item's description", () => {
        const textItemDescription = screen.getByText(/This is an RGB keyboard from cool keys/i);
        expect(textItemDescription).toBeInTheDocument();
    });

    it("should render the 'Item Quantity' heading", () => {
        const headingItemQty = screen.getByRole("heading", { name: "Item Quantity" });
        expect(headingItemQty).toBeInTheDocument();
    });

    it("should render the item's quantity", () => {
        const textItemQty = screen.getByText(1);
        expect(textItemQty).toBeInTheDocument();
    });

    it("should render the 'Item Price' heading", () => {
        const headingItemPrice = screen.getByRole("heading", { name: "Item Price" });
        expect(headingItemPrice).toBeInTheDocument();
    });

    it("should render the item's quantity", () => {
        const textItemPrice = screen.getByText(36);
        expect(textItemPrice).toBeInTheDocument();
    });
});
