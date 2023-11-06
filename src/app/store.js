import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import toastReducer from '../features/toastMsg/toastMsgSlice';
import authReducer from '../features/auth/authSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        toast: toastReducer,
        auth: authReducer
    },
});
