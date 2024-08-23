import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken } from "../features/auth/authSlice";


const Checkout = () => {
    const navigate = useNavigate();
    const token = useAppSelector(getCurrentToken);

    useEffect(() => {
      if (!token || token === null) navigate("/login");
    }, [navigate, token]);

    const content = (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <h2>Checkout</h2>
        <div className="flex flex-col gap-4">
          <h3>Complete Your Transaction</h3>
          <button className="w-48 h-12 rounded-xl bg-violet-500 hover:bg-violet-400">
            Buy Now
          </button>
          <Link
            to={"/cart"}
            className="flex justify-center items-center font-normal w-48 h-12 rounded-xl border border-violet-500 hover:bg-violet-400 "
          >
            Back to Cart
          </Link>
          <Link
            to={"/"}
            className="flex justify-center items-center font-normal w-48 h-12 rounded-xl border border-violet-500 hover:bg-violet-400 "
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );

    return content;
}

export default Checkout;
