import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../app/api';
import { selectCurrentToken, logout } from '../auth/authSlice';

export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            let response;
            const token = selectCurrentToken(getState());
            await fetch(`${apiUrl}/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((raw) => {
                    if (raw.status === 403) {
                        dispatch(logout());
                    } else {
                        return raw.json();
                    }
                })
                .then((data) => (response = data))
                .catch((error) => (response = error));
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const cancelAnOrder = createAsyncThunk(
    'orders/cancelAnOrder',
    async (orderId, { dispatch, getState, rejectWithValue }) => {
        try {
            let response;
            const token = selectCurrentToken(getState());
            await fetch(`${apiUrl}/orders/cancel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderId: orderId }),
            })
                .then((raw) => {
                    if (raw.status === 403) {
                        dispatch(logout());
                    } else {
                        return raw.json();
                    }
                })
                .then((data) => (response = data))
                .catch((error) => (response = error));
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        userOrders: null,
        fetchUserOrdersStatus: null,
        selectedOrder: null,
        error: null,
    },
    reducers: {
        getOrderDetails: (state, action) => {
            state.selectedOrder = null;
            if (state.userOrders && action.payload) {
                state.userOrders.map((order) => {
                    if (order._id === action.payload) {
                        state.selectedOrder = order;
                    }
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrders.pending, (state, action) => {
            return { ...state, fetchUserOrdersStatus: 'pending' };
        });
        builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
            if (
                action.payload.ordersList &&
                action.payload.ordersList.length > 0
            ) {
                return {
                    ...state,
                    userOrders: action.payload.ordersList,
                    fetchUserOrdersStatus: 'success',
                };
            } else {
                return {
                    ...state,
                    fetchUserOrdersStatus: 'error',
                    error: action.payload.error,
                };
            }
        });
        builder.addCase(fetchUserOrders.rejected, (state, action) => {
            return {
                ...state,
                fetchUserOrdersStatus: 'rejected',
                error: action.payload.error,
            };
        });
    },
});

export const { getOrderDetails } = ordersSlice.actions;

export default ordersSlice.reducer;
