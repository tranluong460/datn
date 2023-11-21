import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const bookingApi = createApi({
  reducerPath: "booking",
  tagTypes: ["Booking"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getBookingById: builder.query({
      query: (id: string | undefined) => `/hotel/${id}`,
      providesTags: ["Booking"],
    }),
  }),
});

export const { useGetBookingByIdQuery } = bookingApi;
