import { createSlice } from "@reduxjs/toolkit";

interface ToastMessageDetails {
    toastId: number,
    toastTextContent: string,
    toastType: 'success' | 'error' | 'warning',    
}

interface ToastAlerts {
    toastAlerts: ToastMessageDetails[]
}

const initialState: ToastAlerts = {
    toastAlerts: []
};

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers:{
        addToastAlert: (state, action) => {
            // If the number of toast alerts is greater then 5, remove the first toast to limit the max number of toasts to five
            if(state.toastAlerts.length > 4) state.toastAlerts.splice(0, 1);
            state.toastAlerts.push({ 
                toastId: action.payload.toastId, 
                toastTextContent: action.payload.toastTextContent, 
                toastType: action.payload.toastType 
            });
        },
        removeToastAlert: (state, action) => {
            state.toastAlerts = state.toastAlerts.filter( toast => toast.toastId !== action.payload);
        }
    }
});

export const getAllToastAlerts = (state) => state.toast.toastAlerts;

export const { addToastAlert, removeToastAlert } = toastSlice.actions;

export default toastSlice.reducer;
