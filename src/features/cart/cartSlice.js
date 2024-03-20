import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../app/api';
import { logout, selectCurrentToken } from '../auth/authSlice';

export const checkoutOrder = createAsyncThunk(
    'auth/checkout',
    async (_, { dispatch, getState, rejectWithValue }) => {
        try {
            const orderDetails = {
                items: getState().cart.cartItems,
                totalAmount: getState().cart.totalAmount,
            };
            let response;
            await fetch(`${apiUrl}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${selectCurrentToken(getState())}`,
                },
                body: JSON.stringify(orderDetails),
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

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        checkoutStatus: null,
        totalAmount: 0,
        totalCartQuantity: 0,
        error: null,
        message: null,
    },
    reducers: {
        addToCart: (state, action) => {
            // Check if the cart already contains the item, find its index
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id,
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].itemQuantity += 1;
            } else {
                const tempCartItem = { ...action.payload, itemQuantity: 1 };
                state.cartItems.push(tempCartItem);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeFromCart: (state, action) => {
            const newCartItems = state.cartItems.filter(
                (item) => item._id !== action.payload,
            );
            state.cartItems = newCartItems;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        decrementItemQuantity: (state, action) => {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload,
            );

            if (state.cartItems[itemIndex].itemQuantity > 1) {
                state.cartItems[itemIndex].itemQuantity -= 1;
            } else if (state.cartItems[itemIndex].itemQuantity == 1) {
                const newCartItems = state.cartItems.filter(
                    (item) => item._id !== action.payload,
                );
                state.cartItems = newCartItems;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        removeAllFromCart: (state) => {
            localStorage.removeItem('cartItems');
            state.cartItems = [];
            state.totalAmount = 0;
        },

        calculateTotalAmount: (state) => {
            const newCartTotal = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, itemQuantity } = cartItem;
                    const itemTotal =
                        (price * itemQuantity * 100).toFixed(2) / 100;
                    cartTotal.totalAmount += itemTotal;
                    cartTotal.totalQuantity += itemQuantity;
                    return cartTotal;
                },
                { totalAmount: 0, totalQuantity: 0 },
            );
            state.totalAmount = newCartTotal.totalAmount;
            state.totalCartQuantity = newCartTotal.totalQuantity;
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(checkoutOrder.pending, (state, action) => {
            return { ...state, checkoutStatus: 'pending' };
        });
        builder.addCase(checkoutOrder.fulfilled, (state, action) => {
            if (action.payload.orderDetails) {
                localStorage.removeItem('cartItems');
                return {
                    ...state,
                    cartItems: [],
                    totalAmount: 0,
                    checkoutStatus: 'success',
                    message: `${action.payload.message}, Id is ${action.payload.orderDetails.id}`,
                };
            } else {
                return {
                    ...state,
                    checkoutStatus: 'error',
                    error: action.payload.error,
                };
            }
        });
        builder.addCase(checkoutOrder.rejected, (state, action) => {
            return {
                ...state,
                checkoutStatus: 'rejected',
                error: action.payload.error,
            };
        });
    },
});

// Action creators are generated for each case reducer function
export const {
    addToCart,
    removeFromCart,
    decrementItemQuantity,
    removeAllFromCart,
    calculateTotalAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
