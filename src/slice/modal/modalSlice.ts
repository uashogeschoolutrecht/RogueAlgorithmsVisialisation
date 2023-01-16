import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  show: false,
  type: "",
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