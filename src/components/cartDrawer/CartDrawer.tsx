import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ButtonClose from "../buttonX/ButtonX";
import { changeItemQuantity, removeItemFromCart } from "../../features/cart/cartSlice";
import type { CartItems } from "./CartDrawer.types";

const calculateItemTotal = (a: number, b: number):number => parseFloat(new Intl.NumberFormat("en", {minimumFractionDigits: 2,maximumFractionDigits: 2,}).format(a * b)
);

const apiUrl = `https://ia.manvinderjit.com/api`;

const CartDrawer = (): React.JSX.Element => {

    const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);
    const cartItems = useSelector((state: CartItems) => state.cart.cartItems);
    const dispatch = useDispatch();

    const content: React.JSX.Element = showCartDrawer ? (
      <section
        aria-label="Current Cart Items"
        className={`${
          showCartDrawer ? "xl:fixed" : "hidden"
        } right-0 top-0 w-48 pt-2 bg-black bg-opacity-60 h-full border-indigo-600 border-2 rounded-lg`}
      >
        <div className="flex justify-end mr-2">
          <ButtonClose
            ariaLabel={`Hide Cart Drawer`}
            onClick={() => setShowCartDrawer(false)}
          />
        </div>
        <h2 className="mx-auto w-4/5 text-center pb-1 border-b-2 text-lg font-semibold border-indigo-600">
          Your Cart
        </h2>
        <ul className="flex flex-col">
          {cartItems.map((item) => {
            return (
              <li key={item.id} className="p-4">
                <div className="w-24 mx-auto">
                  <img
                    src={`${apiUrl}/products/image/${item.imageFilename}`}
                    alt={`${item.imageFilename}`}
                    className="rounded-lg border-indigo-600 border-2"
                  />
                </div>
                <div className="text-center pt-2 font-medium">
                  <p>${calculateItemTotal(Number(item.price), Number(item.itemQuantity))}</p>
                </div>
                <div className="w-full flex justify-evenly">
                  <div className="flex flex-col pt-2 items-center gap-2">
                    <label
                      htmlFor="item-quantity"
                      className="text-sm font-medium"
                    >
                      Qty
                    </label>
                    <select
                      name="item-quantity"
                      id="item-quantity"
                      aria-label={`Change Quantity ${item.name}`}
                      className="w-14 h-8 p-2 text-center rounded-md focus:border-blue-700 focus:border"
                      value={item.itemQuantity}
                        onChange={(e) => {
                          dispatch(
                            changeItemQuantity({
                              id: item.id,
                              newItemQuantity: e.target.value,
                            })
                          );
                        }}
                    >
                      <option data-testid={`${item.id}`} value="1">
                        1
                      </option>
                      <option data-testid={`${item.id}`} value="2">
                        2
                      </option>
                      <option data-testid={`${item.id}`} value="3">
                        3
                      </option>
                      <option data-testid={`${item.id}`} value="4">
                        4
                      </option>
                      <option data-testid={`${item.id}`} value="5">
                        5
                      </option>
                    </select>
                  </div>
                  <div className=" flex flex-col items-center pt-2 gap-2">
                    <label htmlFor="removeItem" className="text-sm font-medium">
                      Remove
                    </label>
                    <ButtonClose
                      ariaLabel={`Remove Item ${item.name}`}
                      onClick={() =>
                              dispatch(removeItemFromCart(item.id))
                            }
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
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
        <button aria-label="Show Items in Cart" onClick={() => setShowCartDrawer(true)}>
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
