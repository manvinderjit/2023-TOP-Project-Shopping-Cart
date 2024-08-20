// Mock Data
export const carouselImagesData = [
  {
    caption: {
      heading: "Cyber Monday Promo",
      description: "Cyber Monday Promo",
    },
    name: "Cyber Monday Promo",
    category: "Carousel",
    imageUrl: "promos/carousel/cyber-monday-promo.jpg",
    url: "/promos/undefined",
    id: null,
  },
  {
    caption: {
      heading: "Laptops Available",
      description: "Laptops Available",
    },
    name: "Laptops Available",
    category: "Carousel",
    imageUrl: "promos/carousel/laptops-available.jpg",
    url: "/promos/undefined",
    id: null,
  },
  {
    caption: {
      heading: "Lunar New Year Sale",
      description: "Lunar New Year Sale with significant discounts.",
    },
    name: "Lunar New Year Sale",
    category: "Carousel",
    imageUrl: "promos/carousel/lunar-new-year-sale.jpg",
    url: "/promos/undefined",
    id: null,
  },
  {
    caption: {
      heading: "Storage Devices",
      description: "Storage Devices for All Use Cases",
    },
    name: "Storage Devices",
    category: "Carousel",
    imageUrl: "promos/carousel/storage-devices.png",
    url: "/promos/undefined",
    id: null,
  },
];

export const categoryList = [
  {
    _id: "65bdbd33510f8ff65f52e1c4",
    name: "Computer Keyboards",
    description:
      "A wide selection of keyboards ranging from entry-level to top-of-the-line mechanical ones.",
    __v: 0,
  },
  {
    _id: "65d267a1ee7fe43422036973",
    name: "Computer Monitor",
    description: "All types of computer monitors are available for sale.",
    __v: 0,
  },
];

export const productList = [
  {
    _id: "65d26877ee7fe43422036983",
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
    __v: 0,
    url: "/allproducts/65d26877ee7fe43422036983",
    id: "65d26877ee7fe43422036983",
  },
  {
    _id: "65c2d11b9b446c7905bcaad2",
    name: "Cool Keyboards",
    description: "An entry level ergonomic keyboard from Cool Keyboards",
    imageUrl: "api/images/products/cool-keyboards.jpg",
    imageFilename: "cool-keyboards.jpg",
    category: {
      _id: "65bdbd33510f8ff65f52e1c4",
      name: "Computer Keyboards",
    },
    price: "10.00",
    stock: 15,
    __v: 0,
    url: "/allproducts/65c2d11b9b446c7905bcaad2",
    id: "65c2d11b9b446c7905bcaad2",
  },
  {
    _id: "65c945183e1a54b49df1d49b",
    name: "Cool Keys RGB Keyboard",
    description: "This is an RGB keyboard from cool keys",
    imageUrl: "api/images/products/cool-keys-rgb-keyboard.jpg",
    imageFilename: "cool-keys-rgb-keyboard.jpg",
    category: {
      _id: "65bdbd33510f8ff65f52e1c4",
      name: "Computer Keyboards",
    },
    price: "36.00",
    stock: 10,
    __v: 0,
    url: "/allproducts/65c945183e1a54b49df1d49b",
    id: "65c945183e1a54b49df1d49b",
  },
];
