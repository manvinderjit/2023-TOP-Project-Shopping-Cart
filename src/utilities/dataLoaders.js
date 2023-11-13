import { useSelector } from "react-redux";

export const useOrdersLoader = async () => {
    const orders = useSelector((state) => state.orders);
    return orders;
}
