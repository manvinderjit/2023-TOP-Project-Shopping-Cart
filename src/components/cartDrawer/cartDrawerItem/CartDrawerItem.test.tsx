import { render, screen, } from "@testing-library/react";
import { expect, it } from "vitest";
import CartDrawerItem from "./CartDrawerItem";
import { Provider } from "react-redux";
import { store } from "../../../application/store";

describe("should render CartDrawerItem", () => {
    // Mock Data
    const item =  {
            id: "65d26877ee7fe43422036983",
            name: "ABC 27G2SP Monitor",
            imageFilename: "abc-27g2sp-monitor.jpg",
            price: "150.00",
            itemQuantity: 3,
        };

    beforeEach(() => render(
        <Provider store={store}>
            <CartDrawerItem {...item} />)
        </Provider>
    ));

    it("should render CartDrawerItem", () => {

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

});
