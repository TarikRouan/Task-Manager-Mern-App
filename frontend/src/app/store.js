import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listReducer from "../features/Lists/listSlice";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,
    task: taskReducer,
  },
});
