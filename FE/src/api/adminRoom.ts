// adminRoomApi.js

import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';

export const adminRoomApi = createApi({
  reducerPath: 'adminRoomApi',
  tagTypes:['AdminRoom'],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => ({
        url: '/admin/rooms',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['AdminRoom'],
    }),
    addRoom: builder.mutation({
      query: (newRoom) => ({
        url: '/admin/add-room',
        method: 'POST',
        credentials: 'include',
        body: newRoom,
      }),
      invalidatesTags: ['AdminRoom'],
    }),
    deleteRoom: builder.mutation({
      query: (roomId) => ({
        url: `/admin/delete-room/${roomId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['AdminRoom'],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useAddRoomMutation,
  useDeleteRoomMutation,
} = adminRoomApi;
