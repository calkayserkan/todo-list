import { configureStore } from "@reduxjs/toolkit";
import landingReducer from "./features/landing/landingSlice";
import todoReducer from "./features/todos/todoSlice";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/modal/modal";

export const store = configureStore({
  reducer: {
    landing: landingReducer,
    todos: todoReducer,
    auth: authReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
