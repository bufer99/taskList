import { configureStore } from "@reduxjs/toolkit";

import authApiSlice from "./authApiSlice";
import authSlice from "./authSlice";
import taskSlice from "./taskSlice";
import taskApiSlice from "./taskApiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
    authApi: authApiSlice.reducer,
    taskApi: taskApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApiSlice.middleware),
});

console.log(taskApiSlice)
