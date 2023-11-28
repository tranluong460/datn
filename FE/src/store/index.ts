import { configureStore } from "@reduxjs/toolkit";

import {
  amenitiesApi,
  authApi,
  hotelApi,
  provincesApi,
  roomApi,
  roomTypeApi,
  userApi,
} from "../api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [amenitiesApi.reducerPath]: amenitiesApi.reducer,
    [roomTypeApi.reducerPath]: roomTypeApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [provincesApi.reducerPath]: provincesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(hotelApi.middleware)
      .concat(amenitiesApi.middleware)
      .concat(roomTypeApi.middleware)
      .concat(roomApi.middleware)
      .concat(provincesApi.middleware),
});
