import UserOrder from "./UserOrder";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { apiURL } from "../../../features/api/apiSlice";
import { BrowserRouter } from "react-router-dom";

const mockOrder = {
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
    status: "Cancelled",
    createdAt: "3/20/2024",
    updatedAt: "3/22/2024",
    __v: 0,
    url: "/orders/65fb1414e5f5ad0bd9601b7e",
    id: "65fb1414e5f5ad0bd9601b7e",
};

describe("should render the UserOrder component", () => {

    beforeEach(() =>
      render(
        <BrowserRouter>
          <UserOrder order={mockOrder} />
        </BrowserRouter>
      )
    );

    it("should render the heading 'Ordered On'", async() => {
        const headingOrderDate = screen.getByRole("heading", { name: "Ordered On" });
        expect(headingOrderDate).toBeInTheDocument();
    });

    it("should render the value order date", () => {
        const valueOrderDate = screen.getByLabelText('Ordered On');
        expect(valueOrderDate).toBeInTheDocument();
        expect(valueOrderDate.textContent).toEqual('3/20/2024');
    });

    it("should render the heading 'Order Total'", () => {
        const headingOrderTotal = screen.getByRole('heading', { name: "Order Total" });
        expect(headingOrderTotal).toBeInTheDocument();
    });

    it("should render the value of order total", () => {
        const valueOrderDate = screen.getByLabelText('Order Total');
        expect(valueOrderDate).toBeInTheDocument();
        expect(valueOrderDate.textContent).toEqual('160.00');
    });

    it("should render the heading 'Order Status'", () => {
        const headingOrderStatus = screen.getByRole('heading', { name: "Order Status" });
        expect(headingOrderStatus).toBeInTheDocument();
    });

    it("should render the value of order total", () => {
        const valueOrderStatus = screen.getByLabelText('Order Status');
        expect(valueOrderStatus).toBeInTheDocument();
        expect(valueOrderStatus.textContent).toEqual('Cancelled');
    });

    it("should render the heading 'Order Updated On'", () => {
        const headingOrderUpdatedOn = screen.getByRole('heading', { name: "Order Updated On" });
        expect(headingOrderUpdatedOn).toBeInTheDocument();
    });

    it("should render the value of order total", () => {
        const valueOrderUpdatedOn = screen.getByLabelText('Order Updated On');
        expect(valueOrderUpdatedOn).toBeInTheDocument();
        expect(valueOrderUpdatedOn.textContent).toEqual('3/22/2024');
    });

    it("should render the Manage Order link", () => {
        const buttonManageOrder = screen.getByRole('link', { name: 'Manage Order'});
        expect(buttonManageOrder).toBeInTheDocument();
        expect(buttonManageOrder).toHaveAttribute('href', '/order/65fb1414e5f5ad0bd9601b7e');
    });

});

describe("should render the items in the UserOrder component", () => {

    beforeEach(() =>
      render(
        <BrowserRouter>
          <UserOrder order={mockOrder} />
        </BrowserRouter>
      )
    );

    it("should render the item's image", () => {
        const imgItem = screen.getByRole("img", { name: "ABC 27G2SP Monitor" })
        expect(imgItem).toBeInTheDocument();
        expect(imgItem).toHaveAttribute("alt", "ABC 27G2SP Monitor");
        expect(imgItem).toHaveAttribute("src", `${apiURL}/api/products/image/abc-27g2sp-monitor.jpg`);
    });

    it("should render the item's name", () => {
        const headingItemName = screen.getByRole("heading", { name: "ABC 27G2SP Monitor" });
        expect(headingItemName).toBeInTheDocument();
    });

    it("should render the item's description", () => {
        const textItemDescription = screen.getByText(/The new ABC 27G2SP Monitor for offices./i);
        expect(textItemDescription).toBeInTheDocument();
    });

    it("should render the 'Item Quantity' heading", () => {
        const headingItemQty = screen.getAllByRole("heading", { name: "Item Quantity" });
        expect(headingItemQty).toHaveLength(2);
    });

    it("should render the item's quantity", () => {
        const valueItemQty = screen.getByLabelText('Quantity of ABC 27G2SP Monitor');
        expect(valueItemQty.textContent).toEqual("1");
    });

    it("should render the 'Item Price' heading", () => {
        const headingItemPrice = screen.getAllByRole("heading", { name: "Item Price" });
        expect(headingItemPrice).toHaveLength(2);
    });

    it("should render the item's quantity", () => {
        const valueItemQty = screen.getByLabelText('Quantity of Cool Keyboards');
        expect(valueItemQty.textContent).toEqual("1");
    });

    it("should render the item's image", () => {
        const imgItem = screen.getByRole("img", { name: "Cool Keyboards" })
        expect(imgItem).toBeInTheDocument();
        expect(imgItem).toHaveAttribute("alt", "Cool Keyboards");
        expect(imgItem).toHaveAttribute("src", `${apiURL}/api/products/image/cool-keyboards.jpg`);
    });

    it("should render the item's name", () => {
        const headingItemName = screen.getByRole("heading", { name: "Cool Keyboards" });
        expect(headingItemName).toBeInTheDocument();
    });

    it("should render the item's description", () => {
        const textItemDescription = screen.getByText(/An entry level ergonomic keyboard from Cool Keyboards/i);
        expect(textItemDescription).toBeInTheDocument();
    });

    it("should render the item's quantity", () => {
        const textItemQty = screen.getByText(10);
        expect(textItemQty).toBeInTheDocument();
    });
    
    it("should render the item's quantity", () => {
        const textItemPrice = screen.getByText(150);
        expect(textItemPrice).toBeInTheDocument();
    });

});
