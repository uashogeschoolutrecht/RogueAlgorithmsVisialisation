import { useLoadGraph } from "@react-sigma/core";
import { useLayoutCirclepack } from "@react-sigma/layout-circlepack";
import { useLayoutForce } from "@react-sigma/layout-force";
import { useLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import { useLayoutNoverlap } from "@react-sigma/layout-noverlap";
import { MultiDirectedGraph } from "graphology";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "vis-network";
import { setShow } from "../../slice/modal/modalSlice";
import { RootState } from "../../store/store";
import { calculateEgdeValue, calculateNodeValue, calculateTotalLinks,  getColor, getRandomPosition, getTotalTypesOfLinks } from "../../utils/graphUtils";

export default () => {
    const graph = useSelector((state: RootState) => state.pReducer.graphSlice.graph)
    const loadGraph = useLoadGraph();
    const { assign } = useLayoutNoverlap();
    const dispatch = useDispatch();

    useEffect(() => {
      const Multigraph = new MultiDirectedGraph();
      graph.nodes.forEach(node => Multigraph.addNode(node.id, 
      {
        ...getRandomPosition(), 
        ...node,
      }));        
      console.log("Adding nodes");
      const scores = Multigraph.nodes().map((node) => Multigraph.getNodeAttribute(node, "totalSimilarities"));      
      const similaritiesCountList = graph.links.map(edge => edge.similarities.length);
      const minEdgeDegree = Math.min(...similaritiesCountList);
      const maxEgdeDegree = Math.max(...similaritiesCountList)
      const minNodeDegree = Math.min(...scores);
      const maxNodeDegree = Math.max(...scores);

      console.log("Adding edges");
      graph.links.forEach(link => Multigraph.addDirectedEdgeWithKey(`${link.source}-${link.target}`, link.source, link.target, 
          {   
              // weight: calculateEgdeValue(link.similarities.length, minEdgeDegree, maxEgdeDegree), 
              size: calculateEgdeValue(link.similarities.length, minEdgeDegree, maxEgdeDegree)
          }));
      console.log("Setting size and color");
      Multigraph.forEachNode(node => {
        Multigraph.setNodeAttribute(node, "size",
          calculateNodeValue(
            (Multigraph.getNodeAttribute(node, "totalSimilarities") + Multigraph.getNodeAttribute(node, "amountOfConnections") ) 
            + calculateTotalLinks(node, graph), minNodeDegree, maxNodeDegree)
        );
        let links = getTotalTypesOfLinks(node, graph);
        Multigraph.setNodeAttribute(node, "color",
          getColor(links.source, links.target) 
        );
      });
      loadGraph(Multigraph);
      assign();
      dispatch(setShow({show:false, type:""}))
    }, [graph]);

    return null;
  };