import { createSlice } from "@reduxjs/toolkit";
import { NetworkGraph } from "../../types/types";
import data from "../../Data/databasedata.json";

interface IGraph {
    graph: NetworkGraph;
    sessionGraph: NetworkGraph;
}

const initialState: IGraph = {
    graph: data,
    sessionGraph: data
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
    }
  })

export const { setGraph, clearGraph } = graphSlice.actions

export default graphSlice.reducer