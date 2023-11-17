import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hotelApi = createApi({
  reducerPath: "hotel",
  tagTypes: ["Hotel"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),
  endpoints: (builder) => ({
    getHotelDetailById: builder.query({
      query: (id) => `/hotel/${id}`,
      providesTags: ["Hotel"],
    }),
  }),
});

export const { useGetHotelDetailByIdQuery } = hotelApi;
