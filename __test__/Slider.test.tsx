import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";

import Slider from "../src/components/hero/Slider";

import demoImg from "../src/components/hero/demo.png";
import demoImg2 from "../src/components/hero/demo2.jpg";
import demoImg3 from "../src/components/hero/demo3.jpg";
import demoImg4 from "../src/components/hero/demo4.jpg";

const carouselImagesData: string[] = [demoImg, demoImg2, demoImg3, demoImg4];

describe("Hero Slider", () => {
  beforeEach(() => {
    render(<Slider carouselImagesData={carouselImagesData} />);    
  })
  it("renders Hero Slider", () => {
    expect(screen.getByRole("region", { name: 'Hero Image Slider' })).toBeInTheDocument();
  }); 

  it('Should render the previous slide button', () => {    
    expect(screen.getByRole("button", { name: /previousSliderImage/i })).toBeInTheDocument();     
    expect(screen.getByRole("button", { name: /previousSliderImage/i })).not.toBeNull();
  })

  it('Should render the next slide buttons',  () => {
    expect(screen.getByRole("button", { name: /nextSliderImage/i })).toBeInTheDocument();    
    expect(screen.getByRole("button", { name: /nextSliderImage/i })).not.toBeNull();
  })
  
});

describe("Hero Slider Buttons", () => {
  beforeEach(() => {
    render(<Slider carouselImagesData={carouselImagesData} />);
  })

  it("Should show the last image when previousSlideButton is clicked when on the first image", async () => {
    // Setup
    const user = userEvent.setup();

    const previousSlideButton = screen.getByRole("button", {
      name: /previousSliderImage/i,
    });

    // Pre Expectations
    expect(previousSlideButton).not.toBeNull();
    expect(screen.getByRole("img", { name: /demo/i })).toBeInTheDocument();

    // Actions
    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /demo4/i })).toBeInTheDocument();
    
  });

  it("Should show the previous image when previousSlideButton is clicked", async () => {
    // Setup
    const user = userEvent.setup();
    const previousSlideButton = screen.getByRole("button", { name: /previousSliderImage/i });

    // Pre Expectations
    expect(previousSlideButton).not.toBeNull();
    expect(screen.getByRole("img", { name: /demo/i })).toBeInTheDocument();

    // Actions - Cycle through all the images
    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /demo4/i })).toBeInTheDocument();

    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /demo3/i })).toBeInTheDocument();

    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /demo2/i })).toBeInTheDocument();

    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /demo/i })).toBeInTheDocument();
  });


  it("Should show the next image when nextSlideButton is clicked", async () => {
    // Setup
    const user = userEvent.setup();
    const nextSlideButton = screen.getByRole("button", { name: /nextSliderImage/i, });

    // Pre Expectations
    expect(nextSlideButton).not.toBeNull();
    expect(screen.getByRole("img", { name: /demo/i })).toBeInTheDocument();

    // Actions
    await user.click(nextSlideButton);
    expect(screen.getByRole("img", { name: /demo2/i })).toBeInTheDocument();

    await user.click(nextSlideButton);
    expect(screen.getByRole("img", { name: /demo3/i })).toBeInTheDocument();

    await user.click(nextSlideButton);
    expect(screen.getByRole("img", { name: /demo4/i })).toBeInTheDocument();
  });

  it("Should show the first image when nextSlideButton is clicked from last image", async () => {
    // Setup
    const user = userEvent.setup();
    const nextSlideButton = screen.getByRole("button", { name: /nextSliderImage/i, });

    // Pre Expectations
    expect(nextSlideButton).not.toBeNull();
    expect(screen.getByRole("img", { name: /demo/i })).toBeInTheDocument();

    // Actions : Cycle through all the images
    for(let i = 0; i < carouselImagesData.length; i++){
      await user.click(nextSlideButton);
    }
    
    expect(screen.getByRole("img", { name: /demo/i })).toBeInTheDocument();
  });

})

describe("Hero Image Buttons", () => {

  it('should show the respective image when a button is clicked', async () => {
    render(<Slider carouselImagesData={carouselImagesData} />);
    
    // Setup
    const user = userEvent.setup();
    const buttonHeroImage = screen.getByRole("button", { name: `View Image ${(carouselImagesData.length).toString()}`, });

    // Pre Expectations
    expect(screen.getByRole("img", { name: /demo/i })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /demo4/i })).toBeNull();
    expect(buttonHeroImage).not.toBeNull();
    
    // Actions
    await user.click(buttonHeroImage);

    // Post Expectations
    expect(screen.queryByRole("img", { name: 'demo' })).toBeNull();
    expect(screen.getByRole("img", { name: /demo4/i })).toBeInTheDocument();

  })
})
