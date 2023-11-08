import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../app/api';
import { jwtDecode } from 'jwt-decode';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            let response;
            await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
                .then((raw) => raw.json())
                .then((data) => response = data)
                
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }        
    },
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            let response;
            await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
                .then((raw) => raw.json())
                .then((data) => (response = data));                
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const fetchUserDash = createAsyncThunk(
    'auth/fetchUserDash',
    async (token, getState, { rejectWithValue }) => {
        try {
            let response;
            await fetch(`${apiUrl}/dash`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then((raw) => {
                    console.log(raw, !raw.ok, raw.status);
                    if(!raw.ok) {
                        console.log(getState().auth);
                    } else{
                        return raw.json();
                    }
                })
                .then((data) => (response = data))
                .catch(error => response = error);
                
            return response;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isLoggedIn: false,
        loginStatus: null,
        id: '',
        email: '',
        username: '',
        error: null,
        registerStatus: null,
        message: null,
    },
    reducers: {        
        logout: (state, action) => {
            state.user = null;
            state.token = null;
            state.id = '';
            state.email = '';
            state.username = '';
            state.error = null;
            state.registerStatus = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: 'pending' };
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if(action.payload._id && action.payload.username){
                return { ...state, registerStatus: 'success', message: action.payload.message };
            } else {
                return {
                    ...state,
                    registerStatus: 'error',
                    error: action.payload.error,
                };
            }
        });
        builder.addCase(registerUser.rejected, (state, action) => {
             return { ...state, registerStatus: 'rejected', error: action.payload.error };
        });
        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: 'pending' };
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log('ap', action.payload);
            if (action.payload.token) {
                const { id, username } = jwtDecode(action.payload.token);
                return {
                    ...state,
                    loginStatus: 'success',
                    id,
                    username,
                    token: action.payload.token,
                };
            } else {
                return {
                    ...state,
                    loginStatus: 'error',
                    token: null,
                    error: action.payload.error,
                };
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: 'rejected',
                error: action.payload.error,
            };
        });
    }
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
