import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonX from "../buttonX/ButtonX";
import CartDrawerItem from "./cartDrawerItem/CartDrawerItem";
import type { CartItems } from "./CartDrawer.types";

const CartDrawer = (): React.JSX.Element => {

    const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
    const cartItems = useSelector((state: CartItems) => state.cart.cartItems);

    const content: React.JSX.Element = showCartDrawer ? (
      <section
        aria-label="Current Cart Items"
        className={`${
          showCartDrawer ? "xl:fixed" : "hidden"
        } right-0 top-0 w-48 pt-2 bg-black bg-opacity-60 h-full border-indigo-600 border-2 rounded-lg`}
      >
        <div className="flex justify-end mr-2">
          <ButtonX
            ariaLabel={`Hide Cart Drawer`}
            onClick={() => setShowCartDrawer(false)}
          />
        </div>
        <h2 className="mx-auto w-4/5 text-center pb-1 border-b-2 text-lg font-semibold border-indigo-600">
          Your Cart
        </h2>
        
          {cartItems.length > 0 ? (
            <ul className="flex flex-col">
              {cartItems.map((item) => <CartDrawerItem key={item.id} {...item} />)}
            </ul>
          ) : (
            <p className="p-4 text-center">Your shopping cart is empty!</p>
          )}
        
        <div>
          <hr className="mx-auto rounded-lg border-indigo-600 border-t-2 w-4/5" />
          <Link
            className="mt-4 flex justify-center items-center mx-auto h-10 bg-indigo-600 w-4/5 rounded-lg"
            to={"/cart"}
          >
            Go To Cart
          </Link>
        </div>
      </section>
    ) : (
      <div className="top-3 right-3 fixed flex justify-center">
        <button
          aria-label="Show Items in Cart"
          onClick={() => setShowCartDrawer(true)}
        >
          <div className="animate-pulse dark:bg-indigo-600 p-1 w-8 h-8 ring-1 ring-slate-900/5 dark:ring-indigo-600 shadow-lg rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-4 h-4 "
              fill="none"
              strokeWidth="2"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
        </button>
      </div>
    );

    return content;
};

export default CartDrawer;
