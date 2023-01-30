import { ControlsContainer, FullScreenControl, SearchControl, SigmaContainer, ZoomControl } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { LayoutNoverlapControl } from "@react-sigma/layout-noverlap";
import { GraphEvents } from "./graph/GraphEvents";
import { MultiDirectedGraph } from "graphology";
import { Legend } from "./Legend";
import React from "react";
import Spinner from "./Spinner";
import { SelectedNodes } from "./SelectedNodes";
// @ts-ignore
const LazyGraph = React.lazy(() => import('./graph/Graph'));
export const Graphcontainer = () => {
    return(
        <SigmaContainer 
        
            graph={MultiDirectedGraph}
            settings={{
                defaultEdgeType: "arrow",
                labelDensity: 0.07,
                labelGridCellSize: 60,
                labelRenderedSizeThreshold: 15,
                labelFont: "Lato, sans-serif",
                zIndex: true, }}>
            <React.Suspense fallback={<Spinner/>}>
                <LazyGraph/>
            </React.Suspense>
            
            <ControlsContainer position={"top-right"}>
                <SearchControl style={{ width: "250px"}} />
            </ControlsContainer>
            <ControlsContainer position={"top-left"}>
                <SelectedNodes style={{ width: "250px", textAlign: "center"}}  />
            </ControlsContainer>
            <ControlsContainer position={"bottom-right"}>
                <ZoomControl />
                <LayoutNoverlapControl />
                <FullScreenControl />
            </ControlsContainer>
            <ControlsContainer position={"bottom-left"}>
                <Legend />
            </ControlsContainer>
            <GraphEvents />
        </SigmaContainer>
    )
}
