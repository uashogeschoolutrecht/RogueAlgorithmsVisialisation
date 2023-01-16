import { combineReducers } from "@reduxjs/toolkit";
import edgeSlice from "./edge/edgeSlice";

import graphSlice from "./graph/graphSlice";
import modalSlice from "./modal/modalSlice";
import scoreThresholdSlice from "./scoreThreshold/scoreThreshold";
import websiteSlice from "./website/websiteSlice";

export const rootReducer = combineReducers({
    graphSlice: graphSlice,
    scoreThresholdSlice: scoreThresholdSlice,
    websiteSlice: websiteSlice,
    modalSlice: modalSlice,
    edgeSlice: edgeSlice
});
const pReducer = (state: any, action: any) => {
    return rootReducer(state, action)
}
  
export default pReducer;