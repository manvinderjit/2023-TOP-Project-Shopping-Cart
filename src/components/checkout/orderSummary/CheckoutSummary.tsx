import { useSelector } from "react-redux";
import { CartItems } from "../../cartDrawer/CartDrawer.types";
import { apiURL } from "../../../features/api/apiSlice";

const CheckoutSummary = (): React.JSX.Element => {

    const cartItems = useSelector((state: CartItems) => state.cart.cartItems);
    const subTotal = useSelector((state) => state.cart.totalAmount);

    const subtotalWithShipping = parseFloat(
      new Intl.NumberFormat("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(subTotal + 10)
    );
    const taxes = parseFloat(
      new Intl.NumberFormat("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format((subtotalWithShipping * 13) / 100)
    );

    const totalAmount = parseFloat(
      new Intl.NumberFormat("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(subtotalWithShipping + taxes)
    ); 

    const calculateItemTotal = (a: number, b: number): number =>
      parseFloat(
        new Intl.NumberFormat("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(a * b)
      );

    const content: React.JSX.Element = (
      <div className="col-span-1 p-10 w-5/6 mx-auto">
        <h3 className="my-4 font-semibold text-xl">Order Summary</h3>
        <div>
          <ul className="flex flex-col">
            {cartItems.map((item) => {
              return (
                <li>
                  <div className="grid grid-cols-4 ">
                    <div className="col-span-1 w-24 mt-1">
                      <img
                        src={`${apiURL}/api/products/image/${item.imageFilename}`}
                        alt={`${item.imageFilename}`}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center">
                      <h3>{item.name}</h3>
                      <p>Qty: {item.itemQuantity}</p>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <h3>
                        $
                        {calculateItemTotal(
                          Number(item.price),
                          Number(item.itemQuantity)
                        )}
                      </h3>
                    </div>
                  </div>
                  <hr className="border-1 mx-auto my-10" />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-4 px-2">
          <div className="flex flex-row justify-between border-b-[1px] border-dashed">
            <h4>Subtotal</h4>
            <p>${subTotal}</p>
          </div>
          <div className="flex flex-row justify-between border-b-[1px] border-dashed">
            <h4>Shipping Estimate</h4>
            <p>$10</p>
          </div>
          <div className="flex flex-row justify-between border-b-[1px] border-dashed">
            <h4>Tax Estimate</h4>
            <p>${taxes}</p>
          </div>
          <div className="flex flex-row justify-between font-semibold text-xl">
            <h4>Order Total</h4>
            <p>${totalAmount}</p>
          </div>
        </div>
      </div>
    );
    
    return content;
};

export default CheckoutSummary;
