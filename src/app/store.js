import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import userReducer from "../features/user/userSlice"
import serverAPIReducer from "../features/serverRequests"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    serverAPI: serverAPIReducer,
  },
})
