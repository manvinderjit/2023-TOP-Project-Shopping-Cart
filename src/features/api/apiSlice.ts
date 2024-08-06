import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../auth/authSlice.js";
import { CategoriesListData, ProductsListData, ProductDataAndCategoryDataLists } from "../../types/types.js";

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
    // The `getCarousel` endpoint is a "query" operation that returns product data and product category list
    getProducts: builder.query<ProductDataAndCategoryDataLists, undefined>({
      query: () => "/products",
    }),
    registerUser: builder.mutation({
      query: (body: { userEmail: string, userPassword: string}) => ({
        url:`/register`,
        method: "POST",
        body,
      })
    }),
    loginUser: builder.mutation({
      query: (body: { userEmail: string; userPassword: string }) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    getUserOrders: builder.query({
      query: (token) => ({
        url: "/orders",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useGetCarouselQuery, useGetProductsQuery, useRegisterUserMutation, useLoginUserMutation, useGetUserOrdersQuery } = apiSlice;
