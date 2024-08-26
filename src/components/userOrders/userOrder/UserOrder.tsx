import Button from "../../button/Button";
import UserOrderItem from "./userOrderItem/UserOrderItem";

const UserOrder = ({ order }) => {

    const content = 
                      <>
                        <div key={order._id} className="border-violet-600 border rounded-md mb-10">
                            <div className="flex flex-row justify-evenly border-violet-600 border-b p-4">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">Order Date</h3>
                                    <p>{order.createdAt}</p>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">Order Total</h3>
                                    <p>{order.totalAmount}</p>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">Order Status</h3>
                                    <p>{order.status}</p>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">Last Updated On</h3>
                                    <p>{order.updatedAt}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 py-6">
                                {order.items.map((item) => 
                                    <UserOrderItem item={item}/>
                                )}
                            </div>

                            <div className="flex justify-center items-center mb-4">
                                <Button ariaLabel="Manage Order" onClick={() => {}} buttonLabel="Manage Order" />
                            </div>
                        </div>
                      </>
                    
    return content;
}

export default UserOrder;
