import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import toastReducer from '../features/toastMsg/toastMsgSlice';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../features/api/apiSlice';

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartReducer,
        toast: toastReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware), devTools: true,
});
