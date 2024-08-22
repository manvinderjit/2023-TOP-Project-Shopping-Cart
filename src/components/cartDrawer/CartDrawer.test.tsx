import { render, screen, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import CartDrawer from "./CartDrawer";
import { userEvent } from "@testing-library/user-event";

describe("should render the CartDrawer Component", () => {


  beforeEach(() =>
    render(
      <CartDrawer/>
    )
  );

  it("should render the CartDrawer component", () => {
    screen.debug();
  });
  
});
