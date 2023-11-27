import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const hotelApi = createApi({
  reducerPath: "hotel",
  tagTypes: ["Hotel"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllHotel: builder.query({
      query: () => ({
        url: "hotel",
        method: "GET",
      }),
      providesTags: ["Hotel"],
    }),
    getHotelDetailById: builder.query({
      query: (id: string | undefined) => `/hotel/${id}`,
      providesTags: ["Hotel"],
    }),
    createHotel: builder.mutation({
      query: (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          if (key === "images" && Array.isArray(data[key])) {
            data[key].forEach((file: any, index: number) => {
              formData.append(`images[${index}]`, file.originFileObj);
            });
          } else {
            formData.append(key, data[key]);
          }
        });

        return {
          url: `hotel`,
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Hotel"],
    }),
    updateHotel: builder.mutation({
      query: (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          if (key === "images" && Array.isArray(data[key])) {
            data[key].forEach((file: any, index: number) => {
              formData.append(`images[${index}]`, file.originFileObj);
            });
          } else {
            formData.append(key, data[key]);
          }
        });

        return {
          url: `hotel/${data._id}`,
          method: "PATCH",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Hotel"],
    }),
  }),
});

export const {
  useGetAllHotelQuery,
  useGetHotelDetailByIdQuery,
  useCreateHotelMutation,
} = hotelApi;
