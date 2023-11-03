import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
    name: 'toast',
    initialState: {        
        toastMessageVisibility: false,
        toastMessageContent: null,
    },
    reducers: {
        setToastMessage: (state, action) => {
            resetToastMessage();
            const newToastMessage = action.payload.message;
            state.toastMessageVisibility = true;
            state.toastMessageContent = newToastMessage;
            
        },
        resetToastMessage: (state) => {
            state.toastMessageVisibility = false;
            state.toastMessageContent = null;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setToastMessage, resetToastMessage } = toastSlice.actions;

export default toastSlice.reducer;
