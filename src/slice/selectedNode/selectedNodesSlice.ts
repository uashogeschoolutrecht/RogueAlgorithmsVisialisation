import { createSlice } from "@reduxjs/toolkit";


interface ISelectedNodes {
    from: string | null,
    to: string | null
}

const initialState: ISelectedNodes = {
    from: null,
    to: null,
}

const selectedNodesSlice = createSlice({
    name: 'Selected Nodes',
    initialState: initialState,
    reducers: {
      setFromNode: (state, action) => {        
        state.from = action.payload;
        return state;
      },
      setToNode: (state, action) => {
        state.to = action.payload
        return state;
      },
      clearNodes: (state) => {
        return initialState;
      },
      swap: (state) => {
        let newFrom = state.to;
        let newTo = state.from;
        state.from = newFrom;
        state.to = newTo;

        return state;
      },
      addNode: (state, action) => {
        if(state.from == null)
          state.from = action.payload;
        else
          state.to = action.payload;
        return state;
      }
    }
  })

export const { setFromNode, setToNode, clearNodes, swap, addNode} = selectedNodesSlice.actions

export default selectedNodesSlice.reducer