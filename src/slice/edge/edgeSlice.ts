import { createSlice } from "@reduxjs/toolkit"
import { Edge } from "../../types/types"

interface IEdge {
    edge: Edge;
}

const initialState: IEdge = {
    edge: {
      source: -1,
      target: -1,
      amountOfCopies: 0,
      similarities:[]
    },
}

const edgeSlice = createSlice({
    name: 'Edge',
    initialState: initialState,
    reducers: {
      setEdge: (state, action) => {        
        state.edge = action.payload;
        return state;
      },
      clearEdge: (state) => {
        return initialState;
      },
    }
  })

export const { setEdge, clearEdge } = edgeSlice.actions

export default edgeSlice.reducer