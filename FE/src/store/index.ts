import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "../api/auth";
<<<<<<< Updated upstream
=======
import { hotelApi } from "../api/hotel";
>>>>>>> Stashed changes

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(authApi.middleware),
});
