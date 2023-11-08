import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../auth/authSlice';
import { apiUrl } from '../../app/api';

const baseQuery = fetchBaseQuery({
    baseUrl: apiUrl,
    // credentials: true,
    prepareHeaders: (headers, { getState }) => {
        const token =  getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryResult = async(args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if(result?.error?.originalStatus === 403){
        console.log('token expired');
        // logout the user
        api.dispatch(logout());
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryResult,
    endpoints: builder => ({})
});
