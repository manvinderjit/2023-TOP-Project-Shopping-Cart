import { useEffect } from "react";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserOrdersQuery } from "../features/api/apiSlice";
import Spinner from "../components/utility/Spinner";
import UserOrder from "../components/userOrders/userOrder/UserOrder";
import type { OrderDetails } from "../components/userOrders/UserOrders.types";

const UserOrders = (): React.JSX.Element => {
    const token = useAppSelector(getCurrentToken);
    const navigate = useNavigate();

    const {
        data: userOrders,
        isLoading: isLoadingUserOrders,
        isSuccess: isSuccessUserOrders,
        isError: isErrorUserOrders,
        error: errorUserOrders,
    } = useGetUserOrdersQuery(token);

    useEffect(() => {
        if(!token || token === null) navigate('/login');
    },[navigate, token])
    
    let content: React.JSX.Element = <></>; 
    if (isLoadingUserOrders) {
        // If Loading User Orders
        content = <Spinner />;
    } else if (isSuccessUserOrders) {
        // If User Orders
        content = (
          <div className="w-11/12 lg:w-5/6 xl:w-4/5 text-center mx-auto ">
            <div className="flex flex-col justify-evenly">
              {userOrders.ordersList.map((order:OrderDetails) => (
                <UserOrder key={order.id} order={order} />
              ))}
            </div>
          </div>
        );
    } else if (isErrorUserOrders) {
        // If error occured
        content = <div>{errorUserOrders.data}</div>
    }
    
    return (
    <section aria-label="User Orders">
        <div className=" w-full flex flex-col justify-center items-center p-10 gap-10">
            <h2 className="text-2xl font-semibold">Your Orders</h2>
            {content}
        </div>
    </section>)
}

export default UserOrders;