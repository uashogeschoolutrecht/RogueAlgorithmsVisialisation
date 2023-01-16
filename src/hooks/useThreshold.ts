import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGraph } from "../slice/graph/graphSlice";
import { RootState } from "../store/store"
import { NetworkGraph } from "../types/types";

export const UseThreshold = (initial: number) => {
    const [threshold, setThreshold] = useState(initial);
    const graph = useSelector((state: RootState) => state.pReducer.graphSlice,
    );
    const dispatch = useDispatch();
    useEffect(() => {
        const ids = graph.sessionGraph.nodes.map(node => node.id);
        const newGraphlinks = graph.sessionGraph.links.map(link => {
            const newSims = link.similarities.filter(sim => sim.score >= threshold);
            if(newSims.length !== 0){
                let sourceTargetIndex = ids.indexOf(link.target);
                let sourceSourceIndex = ids.indexOf(link.source);   

                sourceTargetIndex !== -1 && ids.splice(sourceTargetIndex, 1);
                sourceSourceIndex !== -1 && ids.splice(sourceSourceIndex, 1);
            }
            return {...link, similarities: newSims};
        }).filter(link => link.similarities.length > 0);
        const newGraphNodes = graph.sessionGraph.nodes.filter(node => !ids.includes(node.id));
        const newGraph: NetworkGraph = {nodes: newGraphNodes, links: newGraphlinks};        
        dispatch(setGraph(newGraph));
    }, [threshold]);

    return [threshold, setThreshold];
}