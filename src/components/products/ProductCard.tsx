import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";
import { addToastAlert, removeToastAlert } from "../../features/toast/toastSlice";
import { nanoid } from "@reduxjs/toolkit";
import type { ProductData } from "../../types/types";
import Button from "../button/Button";
import { apiURL } from "../../features/api/apiSlice";

const ProductCard = ({ productData }: ProductData): React.JSX.Element => {

  const dispatch = useDispatch();

  const _productDetailsAddToCart = {
    _id: productData.id,
    // _id: productData.id,
    // name: productData.name,
    // imageFilename: productData.imageFilename,
    // price: productData.price,
    // description: productData.description,
    // imageUrl: productData.imageUrl,
    ...productData
  };

  const _addToCart = (): void => {
    dispatch(addItemToCart(_productDetailsAddToCart));
    const toastId: string = nanoid();
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
      <div className="min-w-72">
        <div className="max-w-96 mx-auto">
          <img
            src={`${apiURL}/api/products/image/${productData.imageFilename}`}
            alt={`${productData.name}`}
            className="h-full rounded-md w-full object-contain lg:h-full lg:w-full"
          />
        </div>
        <div className="flex flex-col p-4">
          <div className="w-full flex justify-between">
            <h3 className="text-lg text-white">
              <a href="#">{productData.name}</a>
            </h3>
            <p
              aria-label={`Price for ${productData.name}`}
              className="text-lg font-medium text-white"
            >
              ${productData.price}
            </p>
          </div>
          <p
            aria-label={`Description for ${productData.name}`}
            className="mt-4 py-2 border-t-[1px] text-left text-sm text-white"
          >
            {productData.description}
          </p>
          <Button
            ariaLabel={`Add ${productData.name} to cart`}
            onClick={_addToCart}
            buttonLabel="Add to Cart"
          />
        </div>
      </div>
    </div>
  );

  return content;
};

export default ProductCard;
