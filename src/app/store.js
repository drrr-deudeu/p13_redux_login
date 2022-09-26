import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import serverAPIReducer from "../features/serverRequests"
export const store = configureStore({
  reducer: {
    user: userReducer,
    serverAPI: serverAPIReducer,
  },
})
