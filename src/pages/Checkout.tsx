import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken } from "../features/auth/authSlice";
import Button from "../components/button/Button";
import CheckoutInfo from "../components/checkout/checkoutInfo/CheckoutInfo";
import CheckoutSummary from "../components/checkout/orderSummary/CheckoutSummary";
import { usePlaceOrderMutation } from "../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartItems } from "../components/cartDrawer/CartDrawer.types";
import { calculatePriceDetails, emptyCart } from "../features/cart/cartSlice";
import { addToastAlert, removeToastAlert } from "../features/toast/toastSlice";
import { nanoid } from "@reduxjs/toolkit";
import type { CartItemDetails } from "../components/cartDrawer/CartDrawer.types";
import type { PriceDetails } from "../components/checkout/orderSummary/CheckoutSummary.types";
import { ThemeContext } from "../contexts/ThemeContext";

const Checkout = (): React.JSX.Element => {
    const cartItems: CartItemDetails[] = useSelector((state: CartItems) => state.cart.cartItems);
    const priceDetails: PriceDetails = useAppSelector(calculatePriceDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token: string | null = useAppSelector(getCurrentToken);
    const { themeClasses } = useContext(ThemeContext);

    useEffect(() => {
      if (!token || token === null) navigate("/login");
    }, [navigate, token]);

    const [
      placeOrder,
      {
        data: placeOrderData,
        isSuccess: isPlaceOrderSuccess,
        isError: isPlaceOrderError,
        error: placeOrderError,
      },
    ] = usePlaceOrderMutation();

    const handleCheckout = async(): Promise<void> => {
      const orderDetails = { items: cartItems, totalAmount:priceDetails.finalAmount };
      await placeOrder({token, orderDetails});
    };

    useEffect(() => {
      if (isPlaceOrderSuccess) {        
        const toastId = nanoid();
        dispatch(
          addToastAlert({
            toastId,
            toastTextContent: `Order Placed Successfully!`,
            toastType: "success",
          })
        );
        setTimeout(() => dispatch(removeToastAlert(toastId)), 3000);
        dispatch(emptyCart());
        navigate("/orders")
      }
    }, [isPlaceOrderSuccess, navigate, dispatch]);

    const content: React.JSX.Element = (
      <div
        className={`w-full h-full flex flex-col justify-center items-center gap-4 ${themeClasses.textClass}`}
      >
        <h2 className="text-2xl font-bold">Checkout</h2>
        <p className="text-red-500">Note: Inputs on this page are placeholders at the moment. You can checkout without entering them.</p>
        <div
          className={`w-4/6 gap-10 border rounded-xl ${themeClasses.secondaryBgClass} shadow-2xl ${themeClasses.secondaryBorderClass}`}
        >
          <div className="grid grid-cols-2 ">
            <CheckoutInfo />
            <CheckoutSummary />
          </div>
          <div className="flex justify-center">
            <Button
              ariaLabel="Pay Now"
              buttonLabel="Pay Now"
              onClick={handleCheckout}
            />
          </div>
          <div className=" flex flex-col justify-center w-full items-center gap-6 py-6 mt-6">
            <hr className={`border-t-1 w-3/5 ${themeClasses.secondaryBorderClass}`} />
            <div className="flex gap-10">
              <Link
                to={"/cart"}
                className={`flex justify-center items-center font-normal w-48 h-10 rounded-xl border border-indigo-600 hover:bg-indigo-500 hover:text-white ${themeClasses.primaryBorderClass} ${themeClasses.textClass} ${themeClasses.primaryBgHoveredClass}`}                
              >
                Back to Cart
              </Link>
              <Link
                to={"/"}
                className={`flex justify-center items-center font-normal w-48 h-10 rounded-xl border border-indigo-600 hover:bg-indigo-500 hover:text-white ${themeClasses.primaryBorderClass} ${themeClasses.textClass} ${themeClasses.primaryBgHoveredClass}`}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

    return content;
}

export default Checkout;
