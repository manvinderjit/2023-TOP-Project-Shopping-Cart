import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserOrdersQuery } from "../features/api/apiSlice";
import Spinner from "../components/utility/Spinner";
import UserOrder from "../components/userOrders/userOrder/UserOrder";
import type { OrderDetails } from "../components/userOrders/UserOrders.types";
import { ThemeContext } from "../contexts/ThemeContext";
import { isApiResponseError } from "../application/helpers";
import Pagination from "../components/pagination/Pagination";
import Button from "../components/button/Button";

const UserOrders = (): React.JSX.Element => {
    const token: string | null = useAppSelector(getCurrentToken);
    const navigate = useNavigate();
    const { themeClasses } = useContext(ThemeContext);

    const[ordersPageNumber, setOrdersPageNumber] = useState<number>(1);
    
    const handleChangeOrdersPageNumber = (newPageNumber: number): void | null => newPageNumber !== ordersPageNumber ? setOrdersPageNumber(newPageNumber) : null;

    const {
        data: userOrders,
        isLoading: isLoadingUserOrders,
        isSuccess: isSuccessUserOrders,
        isError: isErrorUserOrders,
        error: errorUserOrders,
        refetch: refetchUserOrders,
    } = useGetUserOrdersQuery({ page: ordersPageNumber });

    const handleRefreshOrders = () => {
      refetchUserOrders();
    }

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
          <>
            <div className="w-11/12 lg:w-5/6 xl:w-4/5 text-center mx-auto ">
              <div className="flex flex-col justify-evenly">
                {userOrders.ordersList.map((order: OrderDetails) => (
                  <UserOrder key={order.id} order={order} />
                ))}
              </div>
            </div>
            <Pagination
              totalPages={userOrders.totalOrdersPages}
              currentPageIndex={ordersPageNumber}
              handleChangeIndex={handleChangeOrdersPageNumber}
            />
          </>
        );
    } else if (isErrorUserOrders) {
        // If error occured
        content = <div>{isApiResponseError(errorUserOrders) ? errorUserOrders.data.error : JSON.stringify(errorUserOrders)}</div>
    }
    
    return (
    <section aria-label="User Orders">
        <div className=" w-full flex flex-col justify-center items-center p-10 gap-10">
            <h2 className={`text-2xl font-semibold ${themeClasses.textClass}`}>Your Orders</h2>
            <Button ariaLabel="refresh-orders" buttonLabel="Refresh Orders" onClick={handleRefreshOrders}/>
            {content}
        </div>
    </section>)
}

export default UserOrders;
