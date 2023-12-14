import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const roomApi = createApi({
  reducerPath: "roomApi",
  tagTypes: ["Room"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllRoom: builder.query({
      query: () => ({
        url: "room",
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    getOneRoom: builder.query({
      query: (id: string) => ({
        url: `room/${id}`,
        method: "GET",
      }),
      providesTags: ["Room"],
    }),
    createRoom: builder.mutation({
      query: (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          if (key === "images" && Array.isArray(data[key])) {
            // eslint-disable-next-line
            data[key].forEach((file: any, index: number) => {
              formData.append(`images[${index}]`, file.originFileObj);
            });
          } else {
            formData.append(key, data[key]);
          }
        });

        return {
          url: `room`,
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Room"],
    }),
    updateRoom: builder.mutation({
      query: (data) => {
        const { _id, ...newData } = data;

        const formData = new FormData();

        Object.keys(newData).forEach((key) => {
          if (key === "images" && Array.isArray(data[key])) {
            // eslint-disable-next-line
            data[key].forEach((file: any, index: number) => {
              formData.append(`images[${index}]`, file.originFileObj);
            });
          } else {
            formData.append(key, data[key]);
          }
        });

        return {
          url: `room/${_id}`,
          method: "PATCH",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useGetAllRoomQuery,
  useGetOneRoomQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
} = roomApi;
