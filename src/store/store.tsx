import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { catsApi } from "../services/catsService";
import authReducer from "./slices/authSlice";

const customMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);
  return result;
};

const store = configureStore({
  reducer: {
    cats: catsApi.reducer,
    auth: authReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([catsApi.middleware, customMiddleware])
      .concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };
