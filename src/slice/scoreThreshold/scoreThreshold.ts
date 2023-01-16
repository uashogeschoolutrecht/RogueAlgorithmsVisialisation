import { createSlice } from "@reduxjs/toolkit"

const scoreThresholdSlice = createSlice({
    name: 'Threshold',
    initialState: 0.7,
    reducers: {
      setThreshold: (state, action) => {             
        return action.payload
      },
      clearThreshold: (state) => {
        return 0.7
      },
    }
  })

export const { setThreshold, clearThreshold } = scoreThresholdSlice.actions

export default scoreThresholdSlice.reducer