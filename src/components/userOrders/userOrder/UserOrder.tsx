import UserOrderItem from "./userOrderItem/UserOrderItem";
import type { OrderItemDetails } from "../UserOrders.types";
import type { Orderable } from "../UserOrders.types";
import { Link } from "react-router-dom";

const UserOrder = ({ order }: Orderable): React.JSX.Element => {

    const content: React.JSX.Element = (
      <>
        <div
          key={order.id}
          className="border-violet-600 border rounded-md mb-10"
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
            <Link
              to={`/order/${order.id}`}
              className="flex w-48 h-10 self-center justify-center items-center rounded-xl bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 hover:text-white"
            >
              Manage Order
            </Link>
          </div>
        </div>
      </>
    );
                    
    return content;
}

export default UserOrder;
