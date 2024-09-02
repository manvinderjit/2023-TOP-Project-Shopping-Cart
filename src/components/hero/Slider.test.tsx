import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import Slider from "./Slider";
import { carouselImagesData } from "../../../__test__/mockdata";

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

  it("Should render the last image when previousSlideButton is clicked when on the first image", async () => {
    // Setup
    const user = userEvent.setup();

    const previousSlideButton = screen.getByRole("button", {
      name: /previousSliderImage/i,
    });

    // Pre Expectations
    expect(previousSlideButton).not.toBeNull();
    expect(screen.getByRole("img", { name: /cyber monday promo/i })).toBeInTheDocument();

    // Actions
    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /storage devices/i })).toBeInTheDocument();
    
  });

  it("Should render the previous image when previousSlideButton is clicked", async () => {
    // Setup
    const user = userEvent.setup();
    const previousSlideButton = screen.getByRole("button", { name: /previousSliderImage/i });

    // Pre Expectations
    expect(previousSlideButton).not.toBeNull();
    expect(screen.getByRole("img", { name: /Cyber Monday Promo/i })).toBeInTheDocument();

    // Actions - Cycle through all the images
    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /Storage Devices/i })).toBeInTheDocument();

    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /Lunar New Year Sale/i })).toBeInTheDocument();

    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /Laptops Available/i })).toBeInTheDocument();

    await user.click(previousSlideButton);
    expect(screen.getByRole("img", { name: /Cyber Monday Promo/i })).toBeInTheDocument();
  });


  it("Should render the next image when nextSlideButton is clicked", async () => {
    // Setup
    const user = userEvent.setup();
    const nextSlideButton = screen.getByRole("button", { name: /nextSliderImage/i, });

    // Pre Expectations
    expect(nextSlideButton).not.toBeNull();
    expect(screen.getByRole("img", { name: /Cyber Monday Promo/i })).toBeInTheDocument();

    // Actions
    await user.click(nextSlideButton);
    expect(screen.getByRole("img", { name: /Laptops Available/i })).toBeInTheDocument();

    await user.click(nextSlideButton);
    expect(screen.getByRole("img", { name: /Lunar New Year Sale/i })).toBeInTheDocument();

    await user.click(nextSlideButton);
    expect(screen.getByRole("img", { name: /Storage Devices/i })).toBeInTheDocument();
  });

  it("Should render the next image after 3 seconds ", async () => {
    
    // Pre Expectations
    expect(screen.getByRole("img", { name: /Cyber Monday Promo/i })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /Laptops Available/i })).not.toBeInTheDocument();

    //Post Expectations
    
    setTimeout(() => {
      expect(screen.queryByRole("img", { name: /Cyber Monday Promo/i })).not.toBeInTheDocument();
      expect(screen.getByRole("img", { name: /Laptops Available/i })).toBeInTheDocument();
    }, 3500);
    
  });

  it("Should render the first image when nextSlideButton is clicked from last image", async () => {
    // Setup
    const user = userEvent.setup();
    const nextSlideButton = screen.getByRole("button", { name: /nextSliderImage/i, });

    // Pre Expectations
    expect(nextSlideButton).not.toBeNull();
    expect(screen.getByRole("img", { name: /Cyber Monday Promo/i })).toBeInTheDocument();

    // Actions : Cycle through all the images
    for(let i = 0; i < carouselImagesData.length; i++){
      await user.click(nextSlideButton);
    }
    
    expect(screen.getByRole("img", { name: /Cyber Monday Promo/i })).toBeInTheDocument();
  });

})

describe("Hero Image Buttons", () => {

  it('should render the respective image when a button is clicked', async () => {
    render(<Slider carouselImagesData={carouselImagesData} />);
    
    // Setup
    const user = userEvent.setup();
    const buttonHeroImage = screen.getByRole("button", { name: `View Image ${(carouselImagesData.length).toString()}`, });

    // Pre Expectations
    expect(screen.getByRole("img", { name: /Cyber Monday Promo/i })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /Storage Devices/i })).toBeNull();
    expect(buttonHeroImage).not.toBeNull();
    
    // Actions
    await user.click(buttonHeroImage);

    // Post Expectations
    expect(screen.queryByRole("img", { name: /Cyber Monday Promo/ })).toBeNull();
    expect(screen.getByRole("img", { name: /Storage Devices/i })).toBeInTheDocument();

  })
})
