import { render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import ButtonX from "./ButtonX";
import { userEvent } from "@testing-library/user-event";

describe("should render the Button Component", () => {

    const handleClick = () => {};

    beforeEach(() =>
      render(
        <ButtonX
          ariaLabel="Add Item to Cart"
          onClick={handleClick}
        />
      )
    );
    
    it("should render the Button component", () => {
        screen.debug();
        // Post Expectations
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it("should render the Button attributes", () => {
        // Pre Expectations 
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();

        // Post Expectations
        expect(button).toHaveAttribute("aria-label", "Add Item to Cart");        
    });

    it("should handle button click", async() => {
        // Pre Expectations
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        
        // Action
        userEvent.click(button);

        // Post Expectations
        await waitFor(() => expect(handleClick).toHaveBeenCalledOnce);
        
    });
});
