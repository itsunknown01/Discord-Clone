import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import dataReducer from "@/hooks/redux/slice-stores/storeSlice"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    data: dataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;