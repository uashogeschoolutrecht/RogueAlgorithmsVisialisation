import { ControlsContainer, FullScreenControl, SearchControl, SigmaContainer, ZoomControl } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import { Graph } from "./graph/Graph";
import { GraphEvents } from "./graph/GraphEvents";
import { MultiDirectedGraph } from "graphology";
import { Legend } from "./Legend";


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
            <Graph/>
            <ControlsContainer position={"top-right"}>
                <SearchControl style={{ width: "250px"}} />
            </ControlsContainer>
            <ControlsContainer position={"bottom-right"}>
                <ZoomControl />
                <LayoutForceAtlas2Control  autoRunFor={1000}/>
                <FullScreenControl />
            </ControlsContainer>
            <ControlsContainer position={"bottom-left"}>
                <Legend />
            </ControlsContainer>
            <GraphEvents />
        </SigmaContainer>
    )
}
