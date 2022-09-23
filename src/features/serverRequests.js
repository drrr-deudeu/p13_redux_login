import { createSlice } from "@reduxjs/toolkit"
import { login, profile } from "./user/userSlice"
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001/api/v1/user"

// Le state initial de la feature login
const initialState = {
  // le statut permet de suivre l'état de la requête
  status: "void",
  // les données lorsque la requête a fonctionné
  data: null,
  // l'erreur lorsque la requête échoue
  error: null,
}

const request = async (
  dispatch,
  getState,
  dispatchAction,
  url,
  method,
  payload
) => {
  const localState = getState()
  const status = localState.serverAPI.status
  const token = localState.user.token

  if (status && (status === "pending" || status === "updating")) return

  if (token && token !== "")
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

  if (payload)
    axios.defaults.headers.common["Content-Type"] = `application/json`

  dispatch(actions.fetching())
  try {
    const response = await method(url, payload)
    const data = await response.data
    if (dispatchAction) dispatch(dispatchAction(data.body))
    dispatch(actions.resolved(data.body))
  } catch (error) {
    dispatch(actions.rejected(error.message))
  }
}

export function APILogin(credentials) {
  return async (dispatch, getState) => {
    await request(dispatch, getState, login, "/login", axios.post, credentials)
  }
}

export function APIProfile() {
  return async (dispatch, getState) => {
    await request(dispatch, getState, profile, "/profile", axios.post, null)
  }
}

export function APIUpdateProfile(payload) {
  return async (dispatch, getState) => {
    await request(dispatch, getState, null, "/profile", axios.put, payload)
  }
}

const { actions, reducer } = createSlice({
  name: "serverAPI",
  initialState,
  reducers: {
    fetching: {
      reducer: (draft) => {
        if (draft.status === "void") {
          draft.status = "pending"
          return
        }
        if (draft.status === "rejected") {
          draft.error = null
          draft.status = "pending"
          return
        }
        if (draft.status === "resolved") {
          draft.status = "updating"
          return
        }
      },
    },
    resolved: {
      // la fonction de reducer
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.data = action.payload
          draft.status = "resolved"
          return
        }
        return
      },
    },
    rejected: {
      reducer: (draft, action) => {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.error = action.payload
          draft.data = action.payload
          draft.status = "rejected"
          return
        }
        return
      },
    },
  },
})

export const selectStatus = (state) => state.serverAPI.status
export const { fetching, rejected, resolved } = actions

export default reducer
