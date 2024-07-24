import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://ia.manvinderjit.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if(token) {
            headers.set("authorization", `Bearer${token}`);
        }
        return headers;
    }
});

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ia.manvinderjit.com/api" }),
  endpoints: (builder) => ({
    // The `getCarousel` endpoint is a "query" operation that returns carousel data
    getCarousel: builder.query({
      query: () => "/promos/carousel",
    }),
    // The `getCarousel` endpoint is a "query" operation that returns product data
    getProducts: builder.query({
      query: () => "/products",
    }),
  }),
});

export const { useGetCarouselQuery, useGetProductsQuery } = apiSlice;
