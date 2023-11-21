import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "../api/auth";
import { adminRoomApi } from "../api/adminroom";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminRoomApi.reducerPath]:adminRoomApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(authApi.middleware)
    .concat(adminRoomApi.middleware),
});
