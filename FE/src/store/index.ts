import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "../api/auth";
import { hotelApi } from "../api/hotelDetail";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(authApi.middleware)
      .concat(hotelApi.middleware),
});
