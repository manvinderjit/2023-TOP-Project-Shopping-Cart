export interface CarouselImageData {
  caption: {
    heading: string;
    description: string;
  };
  name: string;
  category: string;
  imageUrl: string;
  url: string;
  id: null;
}

export interface CarouselImagesData {
  carouselPromos: CarouselImageData[];
}
