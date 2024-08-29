import { useNavigate, useParams } from "react-router-dom";
import { useGetUserOrdersQuery } from "../../features/api/apiSlice";
import { useAppSelector } from "../../application/reduxHooks";
import { getCurrentToken } from "../../features/auth/authSlice";
import { OrderItemDetails } from "../userOrders/UserOrders.types";
import UserOrderItem from "../userOrders/userOrder/userOrderItem/UserOrderItem";
import Button from "../button/Button";
import { useEffect } from "react";

const ManageOrder = (): React.JSX.Element => {
    const { orderId } = useParams();
    const token = useAppSelector(getCurrentToken);
    const navigate = useNavigate();

    const { data: userOrders, isSuccess: isSuccessUserOrders, } = useGetUserOrdersQuery(token);
    const order = userOrders.ordersList.find((order) => order.id === orderId);

    useEffect(() => {
      if (!token || token === null) navigate("/login");
    }, [navigate, token]);

    useEffect(() => {
      if (!order || order === null || order === undefined) navigate("/orders");
    }, [navigate, order, token]);
    
    let content: React.JSX.Element = (<></>);

    const handleCancelOrder = () => {};
    
    // If User Orders
    if (isSuccessUserOrders && order) {
        content = (
            <div className="w-4/5 m-auto">
                <h2 className="my-6 text-center text-2xl font-medium">Manage Order</h2>
                <div
                key={order.id}
                className="border-violet-600 border rounded-md"
                >
                <div className="flex flex-row justify-evenly border-violet-600 border-b p-4">
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
                <div className="flex flex-col gap-6 py-6">
                    {order.items.map((item: OrderItemDetails) => (
                    <UserOrderItem key={item.itemDetails.id} item={item} />
                    ))}
                </div>

                <div className="flex justify-center items-center mb-4">
                    <Button ariaLabel="Cancel Order" buttonLabel="Cancel Order" onClick={handleCancelOrder}/>
                </div>
                </div>
            </div>
        );
    } else {
        content = <div>...loading</div>
    }

    return content;
}

export default ManageOrder;
