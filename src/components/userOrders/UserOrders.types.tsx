export interface OrderItemDetails { 
    itemDetails: { 
        id:string;
        name: string; 
        description: string; 
        imageFilename: string; 
    }; 
    itemQuantity: string | number; 
    itemPrice: string | number; 
}

export interface OrderItemable {
  item: OrderItemDetails
}

export interface OrderDetails {
  id: string;
  customerId: string;
  items: OrderItemDetails[];
  totalAmount: string | number;
  status: string;
  createdAt: string | number;
  updatedAt: string | number;
  url: string;
}

export interface Orderable {
    order: OrderDetails
}
