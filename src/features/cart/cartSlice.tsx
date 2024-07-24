import { createSlice } from "@reduxjs/toolkit";

interface CartItemDetails {
    id: string;
    name: string;
    imageFilename: string;
    itemQuantity: number;
    price: string;
}

interface CartState {
    cartItems: CartItemDetails[],
    totalAmount : number,
    totalCartQuantity: number,
    error: string | null,
    message: string | null,
}

const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as string)
    : [],
  totalAmount: 0,
  totalCartQuantity: 0,
  error: null,
  message: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,        
    reducers: {
        addItemToCart: (state, action) => {
            // Check if the item already exists in the cart, returns index of item if exists
            const itemIndex = state.cartItems.findIndex(
              (item) => item.id === action.payload.id
            );
            if(itemIndex >= 0) {
                // Check if the item quantity is less than five, imposes maximum item purchase limit
                if (state.cartItems[itemIndex].itemQuantity < 5){
                    state.cartItems[itemIndex].itemQuantity += 1;
                } else if ((state.cartItems[itemIndex].itemQuantity < 1)) {
                    state.error = `Error! Item quantity can't be zero!`;
                } else {
                    state.error = `Error! Item quantity invalid!`;
                }
                  
            } else {
                state.cartItems.push({...action.payload, itemQuantity:1 });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            cartSlice.caseReducers.calculateCartTotal(state);
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter (item => item.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        changeItemQuantity: (state, action) => {
            // check if the item quantity is a valid number
            if (typeof Number(action.payload.newItemQuantity) === 'number') {
                const itemIndex = state.cartItems.findIndex( item => item.id === action.payload.id);
                state.cartItems[itemIndex].itemQuantity = Number(action.payload.newItemQuantity);
            } else {
                state.error = 'Invalid quantity provided';                
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        emptyCart: (state) => {
            localStorage.removeItem("cartItems");
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalCartQuantity = 0;
        },
        calculateCartTotal: (state) => {
            state.totalAmount = 0;
            state.totalCartQuantity = 0;
            state.cartItems.map(item => {
                state.totalAmount += Number(item.itemQuantity) * Number(item.price);
                state.totalCartQuantity += item.itemQuantity;
            })
        },

    }
});

export const { addItemToCart, removeItemFromCart, changeItemQuantity, emptyCart, calculateCartTotal } = cartSlice.actions;

export default cartSlice.reducer;