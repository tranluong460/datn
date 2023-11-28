import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const provincesApi = createApi({
  reducerPath: "provincesApi",
  tagTypes: ["Provinces"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://provinces.open-api.vn/api/",
  }),
  endpoints: (builder) => ({
    getAllProvinces: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Provinces"],
    }),
  }),
});

export const { useGetAllProvincesQuery } = provincesApi;
