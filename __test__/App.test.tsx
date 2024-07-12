import React from "react";
import { render /** screen */ } from "@testing-library/react";

import App from "../src/App";
import Header from "../src/components/layout/Header";
import Main from "../src/components/layout/Main";
import Footer from "../src/components/layout/Footer";

describe("App", () => {
  it("renders App", () => {
    render(<App />);
    // screen.debug();
  });
  it("renders Header", () => {
    render(<Header />);    
  });
  it("renders Main", () => {
    render(<Main />);    
  });
  it("renders Footer", () => {
    render(<Footer />);    
  });
});
