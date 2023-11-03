import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        status: null,
        totalAmount: 0,
        totalCartQuantity: 0,
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
                
            if(state.cartItems[itemIndex].itemQuantity > 1){
                state.cartItems[itemIndex].itemQuantity -= 1;
            } else if (state.cartItems[itemIndex].itemQuantity == 1 ) {
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
            const newCartTotal = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, itemQuantity } = cartItem;
                const itemTotal = (price * itemQuantity * 100).toFixed(2) / 100;
                cartTotal.totalAmount += itemTotal;
                cartTotal.totalQuantity += itemQuantity;
                return cartTotal;
            }, {totalAmount: 0, totalQuantity: 0 });
            state.totalAmount = newCartTotal.totalAmount;
            state.totalCartQuantity = newCartTotal.totalQuantity;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, decrementItemQuantity, removeAllFromCart, calculateTotalAmount } = cartSlice.actions;

export default cartSlice.reducer;
