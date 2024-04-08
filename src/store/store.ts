import { configureStore } from "@reduxjs/toolkit";
import { quotesApi } from "./slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [quotesApi.reducerPath]: quotesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quotesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
