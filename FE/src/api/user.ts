import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: "auth/",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getOneUser: builder.mutation({
      query: (id: string) => ({
        url: `auth/info-user/${id}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    lockUser: builder.mutation({
      query: (id: string) => ({
        url: `auth/lock-account/${id}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useLockUserMutation,
  useGetOneUserMutation,
} = userApi;
