import { createSlice } from "@reduxjs/toolkit"

type state = {
  show: boolean,
  type: "wait" | "website" | "edge"
}
const initialState : state = {
  show: true,
  type: "wait",
}

const modalSlice = createSlice({
    name: 'Modal',
    initialState: initialState,
    reducers: {
      setShow: (state, action) => {   
        state = action.payload;          
        return state;
      }
    }
  })

export const { setShow } = modalSlice.actions

export default modalSlice.reducer