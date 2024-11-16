export interface ProductData {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageFilename: string;
  category: {
    _id: string;
    name: string;
  };
  price: string;
  stock: number;
  url: string;
}
