import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/api";
import { userReducer } from "@/entities/user";

export const createStore = () =>
  configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer, user: userReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });

export type StoreType = ReturnType<typeof createStore>;
export type RootState = ReturnType<StoreType["getState"]>;
export type AppDispatch = StoreType["dispatch"];
