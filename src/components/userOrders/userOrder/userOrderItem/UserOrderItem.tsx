import { apiURL } from "../../../../features/api/apiSlice"
import type { OrderItemable } from "../../UserOrders.types";

const UserOrderItem = ({item}: OrderItemable): React.JSX.Element => {

    const content: React.JSX.Element = (
        <div className="grid grid-cols-5 justify-evenly ">
            <div className="col-span-1 flex justify-center items-center">
                <img
                    className="w-28 rounded-md"
                    src={`${apiURL}/api/products/image/${item.itemDetails.imageFilename}`}
                    alt={item.itemDetails.name}
                />
            </div>
            <div className="col-span-2 flex flex-col justify-center items-start gap-1">
                <h4 className="text-xl font-semibold ">{item.itemDetails.name}</h4>
                <p>{item.itemDetails.description}</p>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center gap-1">
                <h4 className="text-lg font-medium ">Item Quantity</h4>
                <p aria-label={`Quantity of ${item.itemDetails.name}`}>{item.itemQuantity}</p>
            </div>
            <div className="col-span-1 flex flex-col justify-center items-center gap-1">
                <h4 className="text-lg font-medium ">Item Price</h4>
                <p aria-label={`Price of ${item.itemDetails.name}`}>{item.itemPrice}</p>
            </div>
        </div>
    );
                                    
  return content;
}

export default UserOrderItem;
