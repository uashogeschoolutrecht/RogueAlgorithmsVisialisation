import { useRegisterEvents, useSetSettings, useSigma } from "@react-sigma/core";
import { Attributes } from "graphology-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEdge } from "../../slice/edge/edgeSlice";
import { setShow } from "../../slice/modal/modalSlice";
import { setWebsite } from "../../slice/website/websiteSlice";
import { RootState } from "../../store/store";


export const GraphEvents = () => {
    const state = useSelector((state: RootState) => state.pReducer);
    const registerEvents = useRegisterEvents();
    const setSettings = useSetSettings();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [hoveredEdge, setHoveredEgde] = useState<string | null>(null);
    const [nodes, setNodes] = useState<{fromNode: string | null, toNode: string | null}>({fromNode: null,toNode: null});
    const sigma = useSigma();
    const graph = sigma.getGraph();
    const dispatch = useDispatch();
       
    const GetInfoOfNode = (nodeId: number) => {
      const websites = state.graphSlice.graph.nodes;
      const selected = websites.find(w => w.id === nodeId);
      if(selected === undefined)
        return;
      dispatch(setWebsite(selected)); 
      dispatch(setShow({show:true, type:"website"}));       
    }

    const GetInfoOfEdge = (source: number, target: number) => {
      const edges = state.graphSlice.graph.links;
      const selected = edges.find(e => e.source === source && e.target === target);
      if(selected === undefined)
        return;
      dispatch(setEdge(selected)); 
      dispatch(setShow({show:true, type:"edge"}));       
    }
    useEffect(() => {
      // Register the events
      registerEvents({
        // node events
        clickNode: (event) => {
          if(event.event.original.ctrlKey){
            if(nodes.fromNode == null){
              setNodes({fromNode: event.node, toNode: nodes.toNode});
            }else{
              setNodes({fromNode: nodes.fromNode, toNode: event.node});
              GetInfoOfEdge(Number.parseInt(nodes.fromNode), Number.parseInt(nodes.toNode ?? event.node));
            }
          }else{
            GetInfoOfNode(Number.parseInt(event.node));
          }
          
        },
        enterNode: (event) => {         
            setHoveredNode(event.node);
        },
        leaveNode: (event) => {
            setHoveredNode(null);
        },
        click: (event) => {
          
          if(event.original.shiftKey){
            setNodes({fromNode: null,toNode: null});
          }
          
        },
        // edge events
        clickEdge: (event) => {
            GetInfoOfEdge(
              Number.parseInt(event.edge.split('-')[0]), 
              Number.parseInt(event.edge.split('-')[1]));
        },
        enterEdge: (event) => {          
          setHoveredEgde(event.edge)},
        leaveEdge: (event) => setHoveredEgde(null),
        // sigma kill
        kill: () => console.log("kill"),
        // sigma camera update
        // updated: (event) => ,
        });
      }, [registerEvents, sigma, nodes]);

    useEffect(() => {
        setSettings({
          nodeReducer: (node, data) => {
            const graph = sigma.getGraph();
            const newData: Attributes = { ...data, highlighted: data.highlighted || false };  
            
            if(node === nodes.fromNode || node === nodes.toNode){
              newData.highlighted = true;
            }
            if (!hoveredNode && !hoveredEdge) {
                return newData;
            }
            if (node === hoveredNode || /*(hoveredNode && graph.neighbors(hoveredNode).includes(node)) || */
                
                hoveredEdge?.split('-').includes(node) ) {
                newData.highlighted = true;
                newData.color = "#00A1E1";
            } else {
                newData.color = "#E2E2E2";
                newData.highlighted = false;
            }
            if (node === hoveredNode){
              newData.size = Math.round(newData.size * 1.5) + 2;
            }
            return newData;
          },
          edgeReducer: (edge, data) => {
            const graph = sigma.getGraph();
            const newData: Attributes = { ...data, hidden: false};            

            if(hoveredEdge === edge){
                newData.color = "#E6302B";
                newData.size = Math.round(newData.size * 1.5) + 1
                return newData;
            }
            if(!hoveredNode && !hoveredEdge)
                return newData;
            
            if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
                newData.hidden = true;
            }
            else if(hoveredNode){
                newData.color = "#E6302B";
                newData.size = 5
            }
            return newData;
          }
        });
      }, [hoveredNode, hoveredEdge, setSettings, sigma, graph, nodes]);

    return null;
}