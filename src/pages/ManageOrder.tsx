import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useCancelAnOrderMutation, useGetUserOrdersQuery } from "../features/api/apiSlice";
import { useAppSelector } from "../application/reduxHooks";
import { getCurrentToken } from "../features/auth/authSlice";
import { OrderItemDetails } from "../components/userOrders/UserOrders.types";
import UserOrderItem from "../components/userOrders/userOrder/userOrderItem/UserOrderItem";
import Button from "../components/button/Button";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ManageOrder = (): React.JSX.Element => {
    const { orderId } = useParams<string>();
    const token: string | null = useAppSelector(getCurrentToken);
    const navigate: NavigateFunction = useNavigate();
    const { themeClasses } = useContext(ThemeContext);

    const { data: userOrders, isSuccess: isSuccessUserOrders, } = useGetUserOrdersQuery(token);
    const order = userOrders.ordersList.find((order) => order.id === orderId);

    const [cancelOrder,
        {
          data: dataCancelOrder,
          isLoading: isCancelOrderLoading,
          isSuccess: isCancelOrderSuccess,
          isError: isCancelOrderError,
          error: cancelOrderError,
        },
      ] = useCancelAnOrderMutation();

    useEffect((): void => {
      if (!token || token === null) navigate("/login");
    }, [navigate, token]);

    useEffect((): void => {
      if (!order || order === null || order === undefined) navigate("/orders");
    }, [navigate, order, token]);

    const handleCancelOrder = (): void => {
      cancelOrder({ token, orderId });
    };
    
    let content: React.JSX.Element = (<></>);
    if (isCancelOrderLoading) {
      content = <div className="w-full text-center">...processing</div>;
    }
    // If User Orders
    else if (isSuccessUserOrders && order) {
      content = (
        <>
          <div className="flex justify-center mb-4">
            {isCancelOrderError === true ? (
              <p className=" text-red-400">{`Error! ${cancelOrderError?.data.error}`}</p>
            ) : (
              <></>
            )}
            {isCancelOrderSuccess === true ? (
              <p
                aria-label="Registration Status"
                className=" text-emerald-600"
              >{`Success! ${dataCancelOrder?.message}`}</p>
            ) : (
              <></>
            )}
          </div>
          <div
            key={order.id}
            className={` border rounded-md shadow-2xl ${themeClasses.primaryBorderClass}`}
          >
            <div
              className={`flex flex-row justify-evenly p-4 ${themeClasses.primaryBgClass}`}
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Ordered On</h3>
                <p aria-label="Ordered On">{order.createdAt}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Order Total</h3>
                <p aria-label="Order Total">{order.totalAmount}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Order Status</h3>
                <p aria-label="Order Status">{order.status}</p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">Order Updated On</h3>
                <p aria-label="Order Updated On">{order.updatedAt}</p>
              </div>
            </div>
            <div className={`flex flex-col gap-6 py-6 ${themeClasses.secondaryBgClass}`}>
              {order.items.map((item: OrderItemDetails) => (
                <UserOrderItem key={item.itemDetails.id} item={item} />
              ))}
            </div>

            <div className={`flex justify-center items-center pb-4 rounded-md ${themeClasses.secondaryBgClass}`}>
              <Button
                ariaLabel="Cancel Order"
                buttonLabel="Cancel Order"
                onClick={handleCancelOrder}
              />
            </div>
          </div>
        </>
      );      
    } else if (isCancelOrderError) { // Error
      content = (
        <p className=" text-red-400 ">{`Error! ${cancelOrderError?.data.error}`}</p>
      );
    } else  { // Error Redundancy
      content = (
        <p className=" text-red-400">{`An Error Occured!`}</p>
      );
    }

    return (
      <div className="w-4/5 m-auto">
            <h2 className={`my-6 text-center text-2xl font-medium ${themeClasses.textClass}`}>
              Manage Order
            </h2>
            {content}
      </div>
      );
}

export default ManageOrder;
