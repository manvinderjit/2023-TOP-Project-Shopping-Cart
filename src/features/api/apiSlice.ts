import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductDataAndCategoryDataLists } from "../../types/types.js";
import type { CarouselImagesData } from "../../components/hero/Slider.types.js";
import type { OrdersList } from "../../components/userOrders/UserOrders.types.js";
import { RootState } from "../../application/store.js";
export const apiURL = import.meta.env.VITE_API_BASE_URL;

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiURL}/api`,
    prepareHeaders: (headers, { getState }) => {
      // Get the token from the state or wherever you're storing it
      const token = (getState() as RootState).auth.token; // Adjust based on your state structure
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Order", "SubStatus"],
  endpoints: (builder) => ({
    // The `getCarousel` endpoint is a "query" operation that returns carousel data
    getCarousel: builder.query<CarouselImagesData, undefined>({
      query: () => "/promos/carousel",
    }),
    // The `getCarousel` endpoint is a "query" operation that returns product data and product category list
    getProducts: builder.query<
      ProductDataAndCategoryDataLists,
      Record<string, number> | undefined
    >({
      query: (params) => {
        return {
          url: "/products",
          params,
        };
      },
    }),
    // The `registerUser` endpoint is a "query" operation that registers a user
    registerUser: builder.mutation({
      query: (body: { userEmail: string; userPassword: string }) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),
    // The `loginUser` endpoint is a "query" operation that logs in a user
    loginUser: builder.mutation({
      query: (body: { userEmail: string; userPassword: string }) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    // The `getUserOrders` endpoint is a "query" operation that gets all orders for a user
    getUserOrders: builder.query<
      OrdersList,
      Record<string, number> | undefined
    >({
      query: (params) => ({
        url: "/orders",
        params,
      }),
      providesTags: ["Order"],
    }),
    // The `cancelAnOrder` endpoint is a "query" operation that cancels an order for a user
    cancelAnOrder: builder.mutation({
      query: ({ token, orderId }) => ({
        url: `/orders/cancel`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { orderId },
      }),
      invalidatesTags: ["Order"],
    }),
    // The `placeOrder` endpoint is a "query" operation that places an order for a user
    placeOrder: builder.mutation({
      query: ({ token, orderDetails }) => ({
        url: `/orders/checkout`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: orderDetails,
      }),
      invalidatesTags: ["Order"],
    }),
    // The `getSubscriptionStatus` endpoint is a "query" operation that gets the subscription status for a user
    getSubscriptionStatus: builder.query({
      query: () => ({
        url: "/subscribe",
        method: "GET",
      }),
      providesTags: ["SubStatus"],
    }),
    subscribeToOffers: builder.mutation({
      query: () => ({
        url: "/subscribe",
        method: "POST",
      }),
      invalidatesTags: ["SubStatus"],
    }),
    cancelSubscription: builder.mutation({
      query: () => ({
        url: "/subscribe/cancel",
        method: "POST",
      }),
      invalidatesTags: ["SubStatus"],
    }),
  }),
});

export const {
  useGetCarouselQuery,
  useGetProductsQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserOrdersQuery,
  useCancelAnOrderMutation,
  usePlaceOrderMutation,
  useGetSubscriptionStatusQuery,
  useSubscribeToOffersMutation,
  useCancelSubscriptionMutation,
} = apiSlice;
