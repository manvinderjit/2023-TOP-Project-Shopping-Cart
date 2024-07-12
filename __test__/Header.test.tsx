import React from "react";
import { render } from "@testing-library/react";

import Header from "../src/components/layout/Header";
import NavTop from "../src/components/nav/NavTop";
import Hero from "../src/components/layout/Hero";

describe("Header", () => {
  it("renders Header", () => {
    render(<Header />);
  });
  it("renders Top Navigation", () => {
    render(<NavTop />);    
  });  
  it("renders Hero Section", () => {
    render(<Hero />);
  });

});
