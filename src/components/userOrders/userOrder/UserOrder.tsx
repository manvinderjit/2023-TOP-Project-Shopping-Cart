import UserOrderItem from "./userOrderItem/UserOrderItem";
import type { OrderItemDetails } from "../UserOrders.types";
import type { Orderable } from "../UserOrders.types";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useContext } from "react";

const UserOrder = ({ order }: Orderable): React.JSX.Element => {
  const { themeClasses } = useContext(ThemeContext);

    const content: React.JSX.Element = (
      <>
        <div
          key={order.id}
          className={`border rounded-md mb-10 ${themeClasses.textClass} ${themeClasses.primaryBorderClass} shadow-xl`}
        >
          <div
            className={`flex flex-row justify-evenly p-4 ${themeClasses.primaryBgClass} text-white`}
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
            <Link
              to={`/order/${order.id}`}
              className={`flex w-48 h-10 self-center justify-center items-center rounded-xl font-semibold text-white shadow-sm hover:text-white ${themeClasses.primaryBgClass} ${themeClasses.primaryBgHoveredClass}`}
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
