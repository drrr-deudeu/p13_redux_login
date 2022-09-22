import { createSlice } from "@reduxjs/toolkit"

const isConnectedSlice = createSlice({
  // le nom du slice
  name: "isConnected",
  // le state initial
  initialState: false,
  // reducers permet de définir les actions et le reducer
  reducers: {
    // l'action toggle ('isConnected/toggle')
    toggle: (state) => {
      return state === false ? true : false
    },
    // l'action set ('isConnected/set')
    set: (state, action) => {
      return action.payload
    },
  },
})

// on extrait les actions et le reducer
const { actions, reducer } = isConnectedSlice
// on export chaque action individuellement
export const { isconnected } = actions
// on export le reducer comme default export
export default reducer
