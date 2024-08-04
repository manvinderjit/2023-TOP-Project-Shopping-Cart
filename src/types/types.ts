export interface ProductDetails {
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

export interface ProductsListData { 
    productList: ProductDetails[]
}

export interface CategoryDetails {
    _id: string,
    name: string,
    description: string
}

export interface CategoriesListData {
    categoryList: CategoryDetails[]
}

export interface ProductDataAndCategoryDataLists {
  categoryList: CategoryDetails[];
  productList: ProductDetails[];
}


export interface AuthSliceState {
  username: string | null;
  token: string | null;
}