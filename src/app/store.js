import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import toastReducer from '../features/toastMsg/toastMsgSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        toast: toastReducer,
    },
});
