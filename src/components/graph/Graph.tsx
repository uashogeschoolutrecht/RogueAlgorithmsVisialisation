import { useLoadGraph } from "@react-sigma/core";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { MultiDirectedGraph } from "graphology";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { calculateEgdeValue, calculateNodeValue, calculateTotalLinks, getColor, getRandomPosition, getTotalTypesOfLinks } from "../../utils/graphUtils";


export const Graph = () => {
    const graph = useSelector((state: RootState) => state.pReducer.graphSlice.graph)
    const loadGraph = useLoadGraph();
    const { positions, assign } = useLayoutForceAtlas2();
    
    useEffect(() => {
      // Create the graph     
        const Multigraph = new MultiDirectedGraph();
        graph.nodes.forEach(node => Multigraph.addNode(node.id, 
            {
                ...getRandomPosition(), 
                ...node,
            }, ));
        const scores = Multigraph.nodes().map((node) => Multigraph.getNodeAttribute(node, "amountOfConnections"));      
        const similaritiesCountList = graph.links.map(edge => edge.similarities.length);
        const minEdgeDegree = Math.min(...similaritiesCountList);
        const maxEgdeDegree = Math.max(...similaritiesCountList)
        const minNodeDegree = Math.min(...scores);
        const maxNodeDegree = Math.max(...scores);
            
        graph.links.forEach(link => Multigraph.addDirectedEdgeWithKey(`${link.source}-${link.target}`, link.source, link.target, 
            {   
                // weight: calculateEgdeValue(link.similarities.length, minEdgeDegree, maxEgdeDegree), 
                size: calculateEgdeValue(link.similarities.length, minEdgeDegree, maxEgdeDegree)
            }));

        Multigraph.forEachNode(node => {
            Multigraph.setNodeAttribute(node, "size",
                calculateNodeValue(
                    (Multigraph.getNodeAttribute(node, "amountOfConnections") / 3 ) + calculateTotalLinks(node, graph), minNodeDegree, maxNodeDegree)
            );
            let links = getTotalTypesOfLinks(node, graph);
            Multigraph.setNodeAttribute(node, "color",
                   getColor(links.source, links.target) 
            );
        }
        );        

      loadGraph(Multigraph);
      assign();
      
    }, [assign, loadGraph, graph]);

    return null;
  };