import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import toastReducer from '../features/toastMsg/toastMsgSlice';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../features/api/apiSlice';
import ordersReducer from '../features/user/ordersSlice';

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer,
        toast: toastReducer,
        auth: authReducer,
        orders: ordersReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware), devTools: true,
});
