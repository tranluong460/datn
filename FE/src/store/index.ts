import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "../api/auth";
import { userApi } from "../api/user";
import { hotelApi } from "../api/hotel";
import { amenitiesApi } from "../api/amenities";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [amenitiesApi.reducerPath]: amenitiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(hotelApi.middleware)
      .concat(amenitiesApi.middleware),
});
