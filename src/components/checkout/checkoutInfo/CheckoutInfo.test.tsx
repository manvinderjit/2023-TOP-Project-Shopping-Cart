import CheckoutInfo from "./CheckoutInfo";
import { renderWithProviders } from "../../../../__test__/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("should render Checkout Info", () => {

    beforeEach(() => {
      renderWithProviders(<CheckoutInfo />);
    });

    it("should render the heading 'Contact Information'", () => {
        expect(screen.getByRole('heading', { name: 'Contact Information'})).toBeInTheDocument();
    });

    it("should render the label 'Email Address'", () => {
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });

    it("should render the input 'Email Address'", () => {
        const inputEmailAddress = screen.getByRole('textbox', { name: 'Email Address'});
        expect(inputEmailAddress).toBeInTheDocument();
        expect(inputEmailAddress).toHaveAttribute('required');
    });

    it("should render the heading 'Payment Details'", () => {
        expect(screen.getByRole('heading', { name: 'Payment Details'})).toBeInTheDocument();
    });

    it("should render the label 'Name on Card'", () => {
        expect(screen.getByLabelText('Name on Card')).toBeInTheDocument();
    });

    it("should render the input 'Name on Card'", () => {
        const inputNameOnCard = screen.getByRole('textbox', { name: 'Name on Card'});
        expect(inputNameOnCard).toBeInTheDocument();
        expect(inputNameOnCard).toHaveAttribute('required');
    });

    it("should render the label 'Card Number'", () => {
        expect(screen.getByLabelText('Card Number')).toBeInTheDocument();
    });

    it("should render the input 'Card Number'", () => {
        const inputCardNumber = screen.getByRole('textbox', { name: 'Card Number'});
        expect(inputCardNumber).toBeInTheDocument();
        expect(inputCardNumber).toHaveAttribute('required');
    });

    it("should render the label 'Expiry Date'", () => {
        expect(screen.getByLabelText('Expiry Date')).toBeInTheDocument();
    });

    it("should render the input 'Expiry Date'", () => {
        const inputExpiryDate = screen.getByRole('textbox', { name: 'Credit Card Expiry Date'});
        expect(inputExpiryDate).toBeInTheDocument();
        expect(inputExpiryDate).toHaveAttribute('required');
    });

    it("should render the label 'CVV'", () => {
        expect(screen.getByLabelText('CVV')).toBeInTheDocument();
    });

    it("should render the input 'CVV'", () => {
        const inputCVV = screen.getByRole('textbox', { name: 'Credit Card CVV'});
        expect(inputCVV).toBeInTheDocument();
        expect(inputCVV).toHaveAttribute('required');
    });

    it("should render the heading 'Shipping Address'", () => {
        expect(screen.getByRole('heading', { name: 'Shipping Address'})).toBeInTheDocument();
    }); 

    it("should render the label 'Shipping Address'", () => {
        expect(screen.getByLabelText("Shipping Address")).toBeInTheDocument();
    });

    it("should render the input 'Shipping Address'", () => {
        const inputShippingAddress = screen.getByRole('textbox', { name: 'Shipping Address'});
        expect(inputShippingAddress).toBeInTheDocument();
        expect(inputShippingAddress).toHaveAttribute('required');
    });

    it("should render the label 'City'", () => {
        expect(screen.getByLabelText("City")).toBeInTheDocument();
    });

    it("should render the input 'City'", () => {
        const inputCity = screen.getByRole('textbox', { name: 'City'});
        expect(inputCity).toBeInTheDocument();
        expect(inputCity).toHaveAttribute('required');
    });

    it("should render the label 'State / Province'", () => {
        expect(screen.getByLabelText("State / Province")).toBeInTheDocument();
    });

    it("should render the input 'State / Province'", () => {
        const inputState = screen.getByRole('textbox', { name: 'State / Province'});
        expect(inputState).toBeInTheDocument();
        expect(inputState).toHaveAttribute('required');
    });

    it("should render the label 'Postal Code'", () => {
        expect(screen.getByLabelText("Postal Code")).toBeInTheDocument();
    });

    it("should render the input 'Postal Code'", () => {
        const inputPostalCode = screen.getByRole('textbox', { name: 'Postal Code'});
        expect(inputPostalCode).toBeInTheDocument();
        expect(inputPostalCode).toHaveAttribute('required');
    });

    it("should render the heading 'Billing Information'", () => {
        expect(screen.getByRole('heading', { name: 'Billing Information'})).toBeInTheDocument();
    });

    it("should render the checkbox 'Same as shipping information'", () => {
        const checkboxSameBillingAddress = screen.getByRole('checkbox', { name: /Same as shipping information/i});
        expect(checkboxSameBillingAddress).toBeInTheDocument();
    });

    it("should check the checkbox 'Same as shipping information' by default", () => {
        const checkboxSameBillingAddress = screen.getByRole('checkbox', { name: /Same as shipping information/i});
        expect(checkboxSameBillingAddress).toBeChecked();
    });
});


describe("should not render Billing Details by default", () => {

    beforeEach(() => {
      renderWithProviders(<CheckoutInfo />);
    });

    it("should check the checkbox 'Same as shipping information' by default", () => {
        const checkboxSameBillingAddress = screen.getByRole('checkbox', { name: /Same as shipping information/i});
        expect(checkboxSameBillingAddress).toBeChecked();
    });

    it("should not render the label 'Payer Name'", () => {
        expect(screen.queryByLabelText("Payer Name")).not.toBeInTheDocument();
    });

    it("should not render the input 'Payer Name'", () => {
        const inputPayerName = screen.queryByRole('textbox', { name: 'Payer Name'});
        expect(inputPayerName).not.toBeInTheDocument();
    });

    it("should not render the label 'Bill Address'", () => {
        expect(screen.queryByLabelText("Bill Address")).not.toBeInTheDocument();
    });

    it("should not render the input 'Bill Address'", () => {
        const inputBillAddress = screen.queryByRole('textbox', { name: 'Bill Address'});
        expect(inputBillAddress).not.toBeInTheDocument();
    });

    it("should not render the label 'Bill City'", () => {
        expect(screen.queryByLabelText("Bill City")).not.toBeInTheDocument();
    });

    it("should not render the input 'Bill City'", () => {
        const inputBillCity = screen.queryByRole('textbox', { name: 'Bill City'});
        expect(inputBillCity).not.toBeInTheDocument();
    });

    it("should not render the label 'Bill State / Province'", () => {
        expect(screen.queryByLabelText("Bill State / Province")).not.toBeInTheDocument();
    });

    it("should not render the input 'Bill State / Province'", () => {
        const inputBillStateProvince = screen.queryByRole('textbox', { name: 'Bill State / Province'});
        expect(inputBillStateProvince).not.toBeInTheDocument();
    });

    it("should not render the label 'Bill Postal Code'", () => {
        expect(screen.queryByLabelText("Bill Postal Code")).not.toBeInTheDocument();
    });

    it("should not render the input 'Bill Postal Code'", () => {
        const inputBillPostalCode = screen.queryByRole('textbox', { name: 'Bill Postal Code'});
        expect(inputBillPostalCode).not.toBeInTheDocument();
    });
});


describe("should render Billing Details when 'Same as shipping information' checkbox is unchecked", () => {

    beforeEach(() => {
      renderWithProviders(<CheckoutInfo />);
      const checkboxSameBillingAddress = screen.getByRole('checkbox', { name: /Same as shipping information/i});
      fireEvent.click(checkboxSameBillingAddress);
      screen.debug();
    });

    it("should uncheck the checkbox 'Same as shipping information'", () => {
      const checkboxSameBillingAddress = screen.getByRole("checkbox", {
        name: /Same as shipping information/i,
      });
      expect(checkboxSameBillingAddress).not.toBeChecked();
    });

    it("should render the label 'Payer Name'", () => {
        expect(screen.getByLabelText("Payer Name")).toBeInTheDocument();
    });

    it("should render the input 'Payer Name'", () => {
        const inputPayerName = screen.getByRole('textbox', { name: 'Payer Name'});
        expect(inputPayerName).toBeInTheDocument();
    });

    it("should render the label 'Bill Address'", () => {
        expect(screen.getByLabelText("Bill Address")).toBeInTheDocument();
    });

    it("should render the input 'Bill Address'", () => {
        const inputBillAddress = screen.getByRole('textbox', { name: 'Bill Address'});
        expect(inputBillAddress).toBeInTheDocument();
    });

    it("should render the label 'Bill City'", () => {
        expect(screen.getByLabelText("Bill City")).toBeInTheDocument();
    });

    it("should render the input 'Bill City'", () => {
        const inputBillCity = screen.getByRole('textbox', { name: 'Bill City'});
        expect(inputBillCity).toBeInTheDocument();
    });

    it("should render the label 'Bill State / Province'", () => {
        expect(screen.getByLabelText("Bill State / Province")).toBeInTheDocument();
    });

    it("should render the input 'Bill State / Province'", () => {
        const inputBillStateProvince = screen.getByRole('textbox', { name: 'Bill State / Province'});
        expect(inputBillStateProvince).toBeInTheDocument();
    });

    it("should render the label 'Bill Postal Code'", () => {
        expect(screen.getByLabelText("Bill Postal Code")).toBeInTheDocument();
    });

    it("should render the input 'Bill Postal Code'", () => {
        const inputBillPostalCode = screen.getByRole('textbox', { name: 'Bill Postal Code'});
        expect(inputBillPostalCode).toBeInTheDocument();
    });

});


describe("should hide the Billing Details when 'Same as shipping information' checkbox is checked again", () => {

    beforeEach(() => {
      renderWithProviders(<CheckoutInfo />);
      const checkboxSameBillingAddress = screen.getByRole('checkbox', { name: /Same as shipping information/i});
      fireEvent.click(checkboxSameBillingAddress);
      fireEvent.click(checkboxSameBillingAddress);      
    });

    it("should check the checkbox 'Same as shipping information'", () => {
      const checkboxSameBillingAddress = screen.getByRole("checkbox", {
        name: /Same as shipping information/i,
      });
      expect(checkboxSameBillingAddress).toBeChecked();
    });

    it("should not render the label 'Payer Name'", () => {
        expect(screen.queryByLabelText("Payer Name")).not.toBeInTheDocument();
    });

    it("should not render the input 'Payer Name'", () => {
        const inputPayerName = screen.queryByRole('textbox', { name: 'Payer Name'});
        expect(inputPayerName).not.toBeInTheDocument();
    });

    it("should not render the label 'Bill Address'", () => {
        expect(screen.queryByLabelText("Bill Address")).not.toBeInTheDocument();
    });

    it("should not render the input 'Bill Address'", () => {
        const inputBillAddress = screen.queryByRole('textbox', { name: 'Bill Address'});
        expect(inputBillAddress).not.toBeInTheDocument();
    });

    it("should not render the label 'Bill City'", () => {
        expect(screen.queryByLabelText("Bill City")).not.toBeInTheDocument();
    });

    it("should not render the input 'Bill City'", () => {
        const inputBillCity = screen.queryByRole('textbox', { name: 'Bill City'});
        expect(inputBillCity).not.toBeInTheDocument();
    });

    it("should not render the label 'Bill State / Province'", () => {
        expect(screen.queryByLabelText("Bill State / Province")).not.toBeInTheDocument();
    });

    it("should not render the input 'Bill State / Province'", () => {
        const inputBillStateProvince = screen.queryByRole('textbox', { name: 'Bill State / Province'});
        expect(inputBillStateProvince).not.toBeInTheDocument();
    });

    it("should not render the label 'Bill Postal Code'", () => {
        expect(screen.queryByLabelText("Bill Postal Code")).not.toBeInTheDocument();
    });

    it("should not render the input 'Bill Postal Code'", () => {
        const inputBillPostalCode = screen.queryByRole('textbox', { name: 'Bill Postal Code'});
        expect(inputBillPostalCode).not.toBeInTheDocument();
    });
    

});