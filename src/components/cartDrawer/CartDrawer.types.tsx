export interface CartItemDetails {
  id: string;
  name: string;
  imageFilename: string;
  itemQuantity: number;
  price: string;
}

export interface CartItems {
  cart: {
    cartItems: CartItemDetails[];
  };
}
