import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken } from "../features/auth/authSlice";
import Button from "../components/button/Button";
import CheckoutInfo from "../components/checkout/checkoutInfo/CheckoutInfo";
import CheckoutSummary from "../components/checkout/orderSummary/CheckoutSummary";

const Checkout = () => {
    const navigate = useNavigate();
    const token = useAppSelector(getCurrentToken);

    useEffect(() => {
      if (!token || token === null) navigate("/login");
    }, [navigate, token]);

    const handleCheckout = () => {};

    const content = (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <div className="w-4/6 gap-10 border rounded-xl">
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
            <hr className="border-t-1 w-3/5" />
            <div className="flex gap-10">
              <Link
                to={"/cart"}
                className="flex justify-center items-center font-normal w-48 h-10 rounded-xl border border-indigo-600 hover:bg-indigo-500 hover:text-white"
              >
                Back to Cart
              </Link>
              <Link
                to={"/"}
                className="flex justify-center items-center font-normal w-48 h-10 rounded-xl border border-indigo-600 hover:bg-indigo-500 hover:text-white"
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
