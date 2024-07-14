import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

import Hero from '../src/components/layout/Hero.tsx';
import React from "react";

describe("Render Hero", () => {
  it("should show render hero", () => {
    render(<Hero />);        
  });
  // it("should show '...loading' when component is loading", () => {
  //   render(<Hero />);
  // });
});

