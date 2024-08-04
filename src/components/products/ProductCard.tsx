import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";
import { addToastAlert, removeToastAlert } from "../../features/toast/toastSlice";
import { nanoid } from "@reduxjs/toolkit";

interface ProductData {
  productData: {
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
  };
}

const apiUrl = `https://ia.manvinderjit.com/api`;

const ProductCard = ({ productData }: ProductData): React.JSX.Element => {

  const dispatch = useDispatch();

  const _productDetailsAddToCart = {
    id: productData.id,
    name:productData.name,
    imageFilename: productData.imageFilename,
    price: productData.price,    
  }

  const _addToCart = () => {
    dispatch(addItemToCart(_productDetailsAddToCart));
    const toastId = nanoid();
    dispatch(
      addToastAlert({
        toastId,
        toastTextContent: `${productData.name} added to cart!`,
        toastType: "success"
      })
    );
    setTimeout(() => dispatch(removeToastAlert(toastId)), 3000);
  };

  const content: React.JSX.Element = (
    <div className="">
      <div className="">
        <div className="w-96 max-w-96">
          <img
            src={`${apiUrl}/products/image/${productData.imageFilename}`}
            alt={`${productData.name}`}
            className="h-full rounded-md w-full object-contain lg:h-full lg:w-full"
          />
        </div>
        <div className="flex flex-col p-4">
          <div className="w-full flex justify-between">
            <h3 className="text-lg text-white">
              <a href="#">{productData.name}</a>
            </h3>
            <p className="text-lg font-medium text-white">
              ${productData.price}
            </p>
          </div>
          <p className="mt-4 py-2 border-t-[1px] text-left text-sm text-white">
            {productData.description}
          </p>
          <button onClick={_addToCart} className="flex w-48 self-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return content;
};

export default ProductCard;
