import type { CartDrawerItemable } from "./CartDrawerItem.types";
import { apiURL } from "../../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { changeItemQuantity, removeItemFromCart } from "../../../features/cart/cartSlice";
import ButtonX from "../../buttonX/ButtonX";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const calculateItemTotal = (a: number, b: number): number =>
  parseFloat(
    new Intl.NumberFormat("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(a * b)
  );

const CartDrawerItem = (props:CartDrawerItemable): React.JSX.Element => {
    const dispatch = useDispatch();

    const { themeClasses } = useContext(ThemeContext);

    const content: React.JSX.Element = (
      <li key={props.id} className="p-4">
        <div className="w-24 mx-auto">
          <img
            src={`${apiURL}/api/products/image/${props.imageFilename}`}
            alt={`${props.imageFilename}`}
            className={`rounded-lg ${themeClasses.primaryBorderClass} border-2`}
          />
        </div>
        <div className="text-center pt-2 font-medium">
          <p>
            ${calculateItemTotal(Number(props.price), Number(props.itemQuantity))}
          </p>
        </div>
        <div className="w-full flex justify-evenly">
          <div className="flex flex-col pt-2 items-center gap-2">
            <label htmlFor="item-quantity" className="text-sm font-medium">
              Qty
            </label>
            <select
              name="item-quantity"
              id="item-quantity"
              aria-label={`Change Quantity ${props.name}`}
              className="w-14 h-8 p-2 text-center rounded-md  focus:border"
              value={props.itemQuantity}
              onChange={(e) => {
                dispatch(
                  changeItemQuantity({
                    id: props.id,
                    newItemQuantity: e.target.value,
                  })
                );
              }}
            >
              <option data-testid={`${props.id}`} value="1">
                1
              </option>
              <option data-testid={`${props.id}`} value="2">
                2
              </option>
              <option data-testid={`${props.id}`} value="3">
                3
              </option>
              <option data-testid={`${props.id}`} value="4">
                4
              </option>
              <option data-testid={`${props.id}`} value="5">
                5
              </option>
            </select>
          </div>
          <div className=" flex flex-col items-center pt-2 gap-2">
            <label htmlFor="removeItem" className="text-sm font-medium">
              Remove
            </label>
            <ButtonX
              ariaLabel={`Remove Item ${props.name}`}
              onClick={() => dispatch(removeItemFromCart(props.id))}
            />
          </div>
        </div>
      </li>
    );

    return content;
};

export default CartDrawerItem;
