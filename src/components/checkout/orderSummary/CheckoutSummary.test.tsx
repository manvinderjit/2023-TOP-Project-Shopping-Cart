import { renderWithProviders } from "../../../../__test__/test-utils";
import CheckoutSummary from "./CheckoutSummary";
import { screen } from "@testing-library/react";
import { apiURL } from "../../../features/api/apiSlice";

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
    totalAmount: 170,
    totalCartQuantity: 3,
    error: null,
    message: null,
};

describe("should render Order Summary", () => {

    beforeEach(() => {
      renderWithProviders(<CheckoutSummary />, {
        preloadedState: {
          cart: initialCart,
        },
      });
    });

    it("should render the heading 'Order Summary'", () => {
        expect(screen.getByRole('heading', { name: 'Order Summary'})).toBeInTheDocument();
    });

    it("should render the image for the first item", () => {
        const imageFirstItem = screen.getByRole('img', { name: 'ABC 27G2SP Monitor'});
        expect(imageFirstItem).toBeInTheDocument();
        expect(imageFirstItem).toHaveAttribute("src", `${apiURL}/api/products/image/thumbs/abc-27g2sp-monitor.jpg`);
        expect(imageFirstItem).toHaveAttribute("alt", "ABC 27G2SP Monitor");
    });

    it("should render the quantity for the first item", () => {
        const quantityFirstItem = screen.getByTestId('Quantity for ABC 27G2SP Monitor');
        expect(quantityFirstItem).toBeInTheDocument();
        expect(quantityFirstItem.textContent).toEqual("Qty: 1");
    });

    it("should render the total price for the first item", () => {
        const priceFirstItem = screen.getByTestId('Total Price for ABC 27G2SP Monitor');
        expect(priceFirstItem).toBeInTheDocument();
        expect(priceFirstItem.textContent).toEqual("$150");
    });

    it("should render the image for the second item", () => {
        const imageSecondItem = screen.getByRole('img', { name: 'Cool Keyboards'});
        expect(imageSecondItem).toBeInTheDocument();
        expect(imageSecondItem).toHaveAttribute("src", `${apiURL}/api/products/image/thumbs/cool-keyboards.jpg`);
        expect(imageSecondItem).toHaveAttribute("alt", "Cool Keyboards");
    });

    it("should render the quantity for the second item", () => {
        const quantitySecondItem = screen.getByTestId('Quantity for Cool Keyboards');
        expect(quantitySecondItem).toBeInTheDocument();
        expect(quantitySecondItem.textContent).toEqual("Qty: 2");
    });

    it("should render the total price for the second item", () => {
        const priceSecondItem = screen.getByTestId('Total Price for Cool Keyboards');
        expect(priceSecondItem).toBeInTheDocument();
        expect(priceSecondItem.textContent).toEqual("$20");
    });

});

describe("should render Order Total", () => {

    beforeEach(() => {
      renderWithProviders(<CheckoutSummary />, {
        preloadedState: {
          cart: initialCart,
        },
      });
    });

    it("should render the heading 'Subtotal'", () => {
        expect(screen.getByRole('heading', { name: 'Subtotal'})).toBeInTheDocument();
    });

    it("should render the value for 'Subtotal'", () => {
        const valueSubtotal = screen.getByTestId('subTotal');
        expect(valueSubtotal).toBeInTheDocument();
        expect(valueSubtotal.textContent).toEqual("$170");
    });

    it("should render the heading 'Shipping Estimate'", () => {
        expect(screen.getByRole('heading', { name: 'Shipping Estimate'})).toBeInTheDocument();
    });

    it("should render the value for 'Shipping Estimate'", () => {
        const valueShippingEstimate = screen.getByTestId('shippingEstimate');
        expect(valueShippingEstimate).toBeInTheDocument();
        expect(valueShippingEstimate.textContent).toEqual("$10");
    });

    it("should render the heading 'Tax Estimate'", () => {
        expect(screen.getByRole('heading', { name: 'Tax Estimate'})).toBeInTheDocument();
    });

    it("should render the value for 'Tax Estimate'", () => {
        const valueTaxEstimate = screen.getByTestId('taxEstimate');
        expect(valueTaxEstimate).toBeInTheDocument();
        expect(valueTaxEstimate.textContent).toEqual("$23.4");
    });

    it("should render the heading 'Order Total'", () => {
        expect(screen.getByRole('heading', { name: 'Order Total'})).toBeInTheDocument();
    });

    it("should render the value for 'Order Total'", () => {
        const valueOrderTotal = screen.getByTestId('orderTotal');
        expect(valueOrderTotal).toBeInTheDocument();
        expect(valueOrderTotal.textContent).toEqual("$203.4");
    });

});
