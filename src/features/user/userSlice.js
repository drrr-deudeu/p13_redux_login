import { createSlice } from "@reduxjs/toolkit"

function initToken() {
  const token = localStorage.getItem("token")
  return token
}

function initDate() {
  const date = localStorage.getItem("date")
  return date ? parseInt(date) : 0
}

function initUserName() {
  const userName = localStorage.getItem("username")
  return userName ? userName : ""
}

function isUserName() {
  const isUserName = localStorage.getItem("username") ? true : false
  return isUserName
}

const initialState = {
  email: initUserName(),
  rememberMe: isUserName(),
  token: initToken(),
  isLogged: false,
  logFailed: false,
  profile: {
    createdAt: "",
    email: "",
    firstName: "",
    id: "",
    lastName: "",
    updatedAt: "",
  },
  profileLoaded: false,
  date: initDate(),
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.isLogged = true
      state.logFailed = false
      localStorage.setItem("token", action.payload.token)
      state.token = action.payload.token
      state.date = Date.now()
      localStorage.setItem("date", state.date)
    },
    loginerror: (state) => {
      state.logFailed = true
    },
    relog: (state) => {
      state.isLogged = true
      state.date = Date.now()
      localStorage.setItem("date", state.date)
    },
    logout: (state) => {
      if (!state.rememberMe) state.email = ""
      state.date = 0
      state.token = ""
      state.isLogged = false
      state.profile = {
        createdAt: "",
        email: "",
        firstName: "",
        id: "",
        lastName: "",
        updatedAt: "",
      }
      state.profileLoaded = false
      localStorage.removeItem("token")
      localStorage.removeItem("date")
    },
    profile: (state, action) => {
      if (action.payload) {
        state.profileLoaded = true
        state.profile = action.payload
      } else state.profileLoaded = false
    },
    saveProfile: (state, action) => {
      state.profile.firstName = action.payload.firstName
      state.profile.lastName = action.payload.lastName
    },
    saveRememberMe: (state, action) => {
      state.rememberMe = action.payload.rememberMe
      if (state.rememberMe)
        localStorage.setItem("username", action.payload.credentials.email)
      else localStorage.removeItem("username")
    },
  },
})

export const {
  login,
  logout,
  profile,
  saveProfile,
  relog,
  loginerror,
  saveRememberMe,
} = userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsLogged = (state) => state.user.isLogged
export const selectProfileLoaded = (state) => state.user.profileLoaded
export const selectProfile = (state) => state.user.profile
export const selectToken = (state) => state.user.token
export const selectHello = (state) => state.user.hello
export const selectDate = (state) => state.user.date
export const selectUserName = (state) => state.user.email
export const selectRememberMe = (state) => state.user.rememberMe
export const selectLogFailed = (state) => state.user.logFailed
export default userSlice.reducer
