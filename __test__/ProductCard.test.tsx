import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Provider } from "react-redux";
import { store } from "../src/application/store";
import ProductCard from "../src/components/products/ProductCard";
import type { ProductData } from "../src/types/types";
import { apiURL } from "../src/features/api/apiSlice";

describe("should render Product Card", () => {

    // Mock Product Data
    const productData: ProductData = {
      productData: {
        id: "65d26877ee7fe43422036983",
        name: "ABC 27G2SP Monitor",
        description: "The new ABC 27G2SP Monitor for offices.",
        imageUrl: "api/images/products/abc-27g2sp-monitor.jpg",
        imageFilename: "abc-27g2sp-monitor.jpg",
        category: {
          _id: "65d267a1ee7fe43422036973",
          name: "Computer Monitor",
        },
        price: "150.00",
        stock: 25,
        url: "/allproducts/65d26877ee7fe43422036983",
      },
    };

    beforeEach(() => 
        render(
            <Provider store={store}>
                <ProductCard productData={productData.productData}/>
            </Provider>
        )
    );
    
    it("should render Product Image", () => {
        const imageProduct = screen.getByRole("img", {  name: "ABC 27G2SP Monitor"});
        expect(imageProduct).toBeInTheDocument();
        expect(imageProduct).toHaveAttribute("src", `${apiURL}/api/products/image/thumbs/abc-27g2sp-monitor.jpg`);
        expect(imageProduct).toHaveAttribute("alt", "ABC 27G2SP Monitor");
    });

    it("should render Product Name", () => {
        const headingProductName = screen.getByRole("heading", {  name: "ABC 27G2SP Monitor"});
        expect(headingProductName).toBeInTheDocument();        
    });

    it("should render Product Price", () => {
        const textProductPrice = screen.getByLabelText("Price for ABC 27G2SP Monitor");
        expect(textProductPrice).toBeInTheDocument();
        expect(textProductPrice.innerHTML).toEqual("$150.00");
    });

    it("should render Product Description", () => {
        const textProductDescription = screen.getByLabelText("Description for ABC 27G2SP Monitor");
        expect(textProductDescription).toBeInTheDocument();
        expect(textProductDescription.innerHTML).toEqual("The new ABC 27G2SP Monitor for offices.");
    });

    it("should render Product 'Add to Cart' Button", () => {
        const buttonAddToCart = screen.getByRole("button", { name: "Add ABC 27G2SP Monitor to cart"});
        expect(buttonAddToCart).toBeInTheDocument();
        expect(buttonAddToCart).toHaveAttribute("aria-label", "Add ABC 27G2SP Monitor to cart");
        expect(buttonAddToCart.innerHTML).toEqual("Add to Cart");
    });

});
