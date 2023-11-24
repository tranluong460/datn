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
      query: (data) => ({
        url: `room`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Room"],
    }),
    deleteRoom: builder.mutation({
      query: (id: string) => ({
        url: `room/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Room"],
    }),
    updateRoom: builder.mutation({
      query: (data) => {
        const { _id, ...newData } = data;
        return {
          url: `room/${_id}`,
          method: "PATCH",
          body: newData,
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
  useDeleteRoomMutation,
} = roomApi;
