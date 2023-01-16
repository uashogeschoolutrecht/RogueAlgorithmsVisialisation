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
    const sigma = useSigma();
    const graph = sigma.getGraph();
    const dispatch = useDispatch();
    const [draggedNode, setDraggedNode] = useState<string | null>(null);
       
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
            GetInfoOfNode(Number.parseInt(event.node));
        },
        enterNode: (event) => {         
            setHoveredNode(event.node);
        },
        leaveNode: (event) => {
            setHoveredNode(null);
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
        downNode: (e) => {
            setDraggedNode(e.node);
            sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
          },
          mouseup: (e) => {
            if (draggedNode) {
              setDraggedNode(null);
              sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
            }
          },
          mousedown: (e) => {
            // Disable the autoscale at the first down interaction
            if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
          },
          mousemove: (e) => {
            if (draggedNode) {
              // Get new position of node
              const pos = sigma.viewportToGraph(e);
              sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
              sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);
  
              // Prevent sigma to move camera:
              e.preventSigmaDefault();
              e.original.preventDefault();
              e.original.stopPropagation();
            }
          },
          touchup: (e) => {
            if (draggedNode) {
              setDraggedNode(null);
              sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
            }
          },
          touchdown: (e) => {
            // Disable the autoscale at the first down interaction
            if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
          },
          touchmove: (e) => {
            if (draggedNode) {
              // Get new position of node
              const pos = sigma.viewportToGraph(e.touches[0]);
              sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
              sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);
  
              // Prevent sigma to move camera:
              e.original.preventDefault();
              e.original.stopPropagation();
            }
          },
        });
      }, [registerEvents, sigma, draggedNode]);

    useEffect(() => {
        setSettings({
          nodeReducer: (node, data) => {
            const graph = sigma.getGraph();
            const newData: Attributes = { ...data, highlighted: data.highlighted || false };  
            
            if (!hoveredNode && !hoveredEdge) {
                return newData;
            }
            if (node === hoveredNode || (hoveredNode && graph.neighbors(hoveredNode).includes(node)) || 
                hoveredEdge?.split('-').includes(node) ) {
                newData.highlighted = true;
                newData.color = "#00A1E1";
            } else {
                newData.color = "#E2E2E2";
                newData.highlighted = false;
            }
            if (node === hoveredNode){
              newData.size = Math.round(newData.size * 1.5) + 5;
            }
            return newData;
          },
          edgeReducer: (edge, data) => {
            const graph = sigma.getGraph();
            const newData: Attributes = { ...data, hidden: false};            

            if(hoveredEdge === edge){
                newData.color = "#E6302B";
                newData.size = Math.round(newData.size * 1.5) + 3
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
      }, [hoveredNode, hoveredEdge, setSettings, sigma, graph]);

    return null;
}