import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  tagTypes: ["Booking"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Booking"],
    }),
    vnPayPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/vnPay",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Booking"],
    }),
    zaloPayPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/create-order-zaloPay",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Booking"],
    }),
    getBookingByUser: builder.query({
      query: () => ({
        url: "/booking/booking-user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useVnPayPaymentMutation,
  useZaloPayPaymentMutation,
  useGetBookingByUserQuery,
} = bookingApi;
