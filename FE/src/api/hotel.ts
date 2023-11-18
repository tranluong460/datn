import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const hotelApi = createApi({
  reducerPath: "hotel",
  tagTypes: ["Hotel"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getHotelDetailById: builder.query({
      query: (id) => `/hotel/${id}`,
      providesTags: ["Hotel"],
    }),
  }),
});

export const { useGetHotelDetailByIdQuery } = hotelApi;
