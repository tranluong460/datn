import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  tagTypes: ["Booking"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllBooking: builder.query({
      query: () => ({
        url: "booking",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Booking"],
    }),
    updateBooking: builder.mutation({
      query: (data) => {
        const { _id, ...newData } = data;

        return {
          url: `/booking/${_id}`,
          method: "PATCH",
          body: newData,
          credentials: "include",
        };
      },
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
    checkStatusZaloPay: builder.mutation({
      query: (code) => ({
        url: `payment/check-status-zaloPay/${code}`,
        method: "POST",
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
  useGetAllBookingQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useVnPayPaymentMutation,
  useZaloPayPaymentMutation,
  useCheckStatusZaloPayMutation,
  useGetBookingByUserQuery,
} = bookingApi;
