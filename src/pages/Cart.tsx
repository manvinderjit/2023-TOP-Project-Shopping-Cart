import { useSelector, useDispatch } from "react-redux";
import { emptyCart, removeItemFromCart, changeItemQuantity, calculateCartTotal } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { addToastAlert, removeToastAlert } from "../features/toast/toastSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken } from "../features/auth/authSlice";
import { useEffect } from "react";
import { apiURL } from "../features/api/apiSlice";

interface CartItemDetails {
  id: string,
  name: string,
  imageFilename: string,
  itemQuantity: number,
  price: string,
}

interface CartItems {
  cart: {
    cartItems: CartItemDetails[]
  };
}

const Cart = ():React.JSX.Element => {
  const cartItems = useSelector((state: CartItems) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const token = useAppSelector(getCurrentToken);
  const navigate = useNavigate();
  dispatch(calculateCartTotal());  

  const _emptyCart = () => {
    dispatch(emptyCart());
  }

  const handleCheckout = () => {

    if(cartItems.length <= 0){
      const toastId = nanoid();
      dispatch(
        addToastAlert({
          toastId,
          toastTextContent: "You have no items in your cart!",
          toastType: "warning",
        })
      );
      setTimeout(() => {
        navigate("/home");
      }, 500);

      setTimeout(() => {
        dispatch(removeToastAlert(toastId));
      }, 3000);
    }

    if(!token || token === null) {
      const toastId = nanoid();
      dispatch(addToastAlert({ toastId, toastTextContent: 'Please Login before checking out!', toastType: 'warning'}));
      
      setTimeout(() => {
        navigate("/login");
      }, 500);

      setTimeout(() => {
        dispatch(removeToastAlert(toastId));
      }, 3000)
    } else {
      navigate('/checkout');
    }
  }
  
  const subtotalWithShipping = parseFloat(
    new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(subTotal + 10)
  );
  const taxes = parseFloat(
    new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format((subtotalWithShipping * 13)/100)
  ); 

  const totalAmount = parseFloat(
    new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(subtotalWithShipping + taxes)
  ); 

  const content: React.JSX.Element = (
    <section
      id="section-cart"
      role="sectionCart"
      className="m-4 md:w-5/6 2xl:w-3/4 flex-grow flex self-center items-center"
    >
      {cartItems.length > 0 ? (
        <div className="sm:border rounded-xl flex w-full min-h-[50vh] flex-col justify-center items-center xl:flex-row">
          <div className="lg:w-4/5 xl:w-2/3 flex flex-col justify-center items-center min-w-80">
            <h2 className="text-4xl font-bold my-10">Shopping Cart</h2>
            <div className="">
              <ul className="flex flex-col px-10">
                {cartItems.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="grid grid-cols-1 sm:grid-cols-5 xl:gap-4 2xl:gap-4 border-t-[1px] border-b-[1px] xl:border-b-0 py-14 items-center justify-center"
                    >
                      <div className="col-span-1 min-w-28 max-w-72 sm:max-w-60 ">
                        <img
                          src={`${apiURL}/api/products/image/${item.imageFilename}`}
                          alt={`${item.imageFilename}`}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2 flex flex-col py-4 gap-2 items-center sm:items-start sm:pl-8">
                        <h4 className="text-lg font-semibold">{item.name}</h4>
                        <p>${item.price}</p>
                      </div>
                      <div className="sm:col-span-2 flex items-center justify-evenly">
                        <div className=" col-span-1 min-w-32 flex flex-col py-4 items-center gap-4">
                          <label
                            htmlFor="item-quantity"
                            className="text-lg font-semibold"
                          >
                            Qty
                          </label>
                          <select
                            name="item-quantity"
                            id="item-quantity"
                            aria-label={`Change Quantity ${item.name}`}
                            className="w-16 p-2 text-center rounded-md focus:border-blue-700 focus:border"
                            value={item.itemQuantity}
                            onChange={(e) => {
                              dispatch(
                                changeItemQuantity({
                                  id: item.id,
                                  newItemQuantity: e.target.value,
                                })
                              );
                              const toastId = nanoid();
                              dispatch(
                                addToastAlert({
                                  toastId: toastId,
                                  toastTextContent: `Quantity changed for ${item.name} to ${e.target.value}!`,
                                  toastType: "success",
                                })
                              );
                              setTimeout(() => {
                                dispatch(removeToastAlert(toastId));
                              }, 3000);
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
                        <div className=" col-span-1 min-w-32 flex flex-col items-center py-4 gap-4">
                          <label
                            htmlFor="removeItem"
                            className="text-lg font-semibold"
                          >
                            Remove
                          </label>
                          <button
                            aria-label={`Remove Item ${item.name}`}
                            onClick={() =>
                              dispatch(removeItemFromCart(item.id))
                            }
                            className="w-8 h-8 rounded-full  flex items-center justify-center "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6 hover:size-8"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="self-center w-3/4 md:w-2/3 my-10 xl:w-1/3 flex flex-col gap-4 border rounded-lg px-8 py-6 mx-10 min-w-80">
            <h2 className="text-2xl font-semibold border-b-[1px]">
              Order Summary
            </h2>
            <div className="flex flex-col gap-4 px-2">
              <div className="flex flex-row justify-between border-b-[1px] border-dashed">
                <h4>Subtotal</h4>
                <p>${subTotal}</p>
              </div>
              <div className="flex flex-row justify-between border-b-[1px] border-dashed">
                <h4>Shipping Estimate</h4>
                <p>$10</p>
              </div>
              <div className="flex flex-row justify-between border-b-[1px] border-dashed">
                <h4>Tax Estimate</h4>
                <p>${taxes}</p>
              </div>
              <div className="flex flex-row justify-between font-semibold text-xl">
                <h4>Order Total</h4>
                <p>${totalAmount}</p>
              </div>
            </div>
            <div className="border-t-[1px] pt-4 flex justify-center items-center">
              <button
                onClick={handleCheckout}
                className="w-48 h-10 rounded-xl bg-indigo-600 hover:bg-violet-400"
              >
                Checkout
              </button>
            </div>
            <div className="border-t-[1px] pt-4 flex justify-center items-center gap-4 flex-col 2xl:flex-row">
              <button
                onClick={_emptyCart}
                className="w-48 h-10 rounded-xl border border-indigo-600 hover:bg-indigo-600 font-normal"
              >
                Empty Cart
              </button>
              <Link
                to={"/"}
                className="w-48 h-10 rounded-xl border border-indigo-600 hover:bg-indigo-600 font-normal flex justify-center items-center text-center"
              >
                Keep Shopping
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full justify-center items-center gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4f46e5"
              className="size-24"
              role="iconCartWhenEmpty"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
          </div>
          <p>Your shopping cart is empty!</p>
          <Link
            to="/"
            className="flex w-48 self-center mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:text-white"
          >
            Browse Items
          </Link>
        </div>
      )}
    </section>
  );

  return content;
}

export default Cart;
