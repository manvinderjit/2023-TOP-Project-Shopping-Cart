import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSliceState } from "../../types/types";
import { RootState } from "../../application/store";

const initialState: AuthSliceState = {
    username: null,
    token: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{username: string, accessToken:string}>) => {
        const { username, accessToken } = action.payload;
        state.username = username;
        state.token = accessToken;
        // localStorage.setItem("userShopApp", JSON.stringify({username, accessToken }));
    }, 
    logOut: (state) => {
        state.username = null;
        state.token = null;
    }
    
  },
});

export const getCurrentUserDetails = (state: RootState) => state.auth.username;
export const getCurrentToken = (state:RootState) => state.auth.token;

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
