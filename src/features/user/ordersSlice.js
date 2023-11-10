import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../app/api';
import { selectCurrentToken, logout } from '../auth/authSlice';

export const fetchUserOrders = createAsyncThunk(
    'auth/fetchUserDash',
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            let response;
            const token = selectCurrentToken(getState());
            await fetch(`${apiUrl}/dash`, {
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

export const ordersSlice = createSlice({
    name:'orders',
    initialState: {
        userOrders: null,
        fetchUserOrdersStatus: null,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUserOrders.pending, (state, action) => {
            return { ...state, fetchUserOrdersStatus: 'pending' };
        });
        builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
            console.log(action.payload);
            if (action.payload.ordersList && action.payload.ordersList.length > 0) {
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
    }
})

export default ordersSlice.reducer;
