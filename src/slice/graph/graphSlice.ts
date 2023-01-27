import { createSlice } from "@reduxjs/toolkit";
import { NetworkGraph } from "../../types/types";
import data from "../../Data/graph-with-total-similarities.json";

interface IGraph {
    graph: NetworkGraph;
    isRendering: boolean
    // sessionGraph: NetworkGraph;
}

const initialState: IGraph = {
    graph: data,
    isRendering: true
    // sessionGraph: data
}

const graphSlice = createSlice({
    name: 'Graph',
    initialState,
    reducers: {
      setGraph: (state, action) => {       
        state.graph = action.payload
        return state;
      },
      clearGraph: (state) => {
        state.graph = data
      },
      setRendering:(state) => {
        state.isRendering = false
      }
    }
  })

export const { setGraph, clearGraph, setRendering } = graphSlice.actions

export default graphSlice.reducer