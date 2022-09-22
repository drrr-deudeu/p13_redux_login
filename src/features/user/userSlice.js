import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  email: "",
  token: "",
  isLogged: false,
  profile: {
    createdAt: "",
    email: "",
    firstName: "",
    id: "",
    lastName: "",
    updatedAt: "",
  },
  profileLoaded: false,
  date: null,
  askSignOut: false,
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
      localStorage.setItem("token", action.payload.token)
      state.token = action.payload.token
      state.email = action.payload.email
      localStorage.setItem("date", Date.now())
      state.date = localStorage.getItem("date")
    },
    relog: (state, action) => {
      state.isLogged = true
      state.token = action.payload.token
      localStorage.setItem("date", action.payload.date)
      state.date = action.payload.date
    },
    logout: (state) => {
      state.email = ""
      state.date = null
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
      state.askSignOut = true
    },
    signout: (state) => {
      state.askSignOut = false
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
  },
})

export const { login, logout, profile, signout, saveProfile, relog } =
  userSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsLogged = (state) => state.user.isLogged
export const selectProfileLoaded = (state) => state.user.profileLoaded
export const selectProfile = (state) => state.user.profile
export const selectToken = (state) => state.user.token
export const selectHello = (state) => state.user.hello
export const selectAskSignOut = (state) => state.askSignOut

export default userSlice.reducer
