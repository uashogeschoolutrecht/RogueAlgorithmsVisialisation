import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RepeatIcon from '@mui/icons-material/Repeat';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import { useSigma } from "@react-sigma/core";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEdge } from "../slice/edge/edgeSlice";
import { setShow } from "../slice/modal/modalSlice";
import { clearNodes, swap } from "../slice/selectedNode/selectedNodesSlice";
import { RootState } from "../store/store";
import { Edge } from "../types/types";

export interface EdgeInfoProps {
    id?: string;
    className?: string;
    style?: CSSProperties;
}

export const SelectedNodes: FC<EdgeInfoProps> = (props) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => ({
        from: state.pReducer.selectedNodesSlice.from,   
        to: state.pReducer.selectedNodesSlice.to,
        graph: state.pReducer.graphSlice}));
    const [link, setLink] = useState<Edge | null> (null);

    const GetUrl = (nodeId: Number) => {
        const websites = state.graph.graph.nodes;
        const selected = websites.find(w => w.id === nodeId);
        return selected?.label
    }
    const handleClear = () => {
        dispatch(clearNodes());
    }
    const handleSwap = () => {
        dispatch(swap());
    }

    useEffect(() => {
        if(state.from === null || state.to === null)
            setLink(null);
        
        const edges = state.graph.graph.links;
        const selected = edges.find(e => e.source === Number.parseInt(state.from!) && 
            e.target === Number.parseInt(state.to!));
        if(selected === undefined)
            setLink(null);
        else
            setLink(selected);

    }, [dispatch, state.from, state.to])
    
    const handleModal = () => {
        if(link == null) 
            return;

        dispatch(setEdge(link)); 
        dispatch(setShow({show:true, type:"edge"}));    
    }
    const combinationExists = () => {
        if(state.from === null || state.to === null){
            return false;
        }
        const edges = state.graph.graph.links;
        const selected = edges.find(e => e.source === Number.parseInt(state.from! ) && e.target === Number.parseInt(state.to!));
        if(selected === undefined)
            return false;
        return true;
    }
    const getTitle = () => {
        return link == null ? "There is no combinations between" : "See similarities"
    }

    return(
        <div style={props.style}>
            <p><strong>Source:</strong></p>
            {state.from && 
            <p>{GetUrl(Number.parseInt(state.from))}</p>
            }
            <p><strong>Target:</strong></p>
            {state.to &&
            <p>{GetUrl(Number.parseInt(state.to))}</p>
            }
            <div className="tool-bar">
                <Tooltip title="Clear selected">
                    <IconButton onClick={handleClear}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Swap websites">
                    <IconButton onClick={handleSwap}>
                        <RepeatIcon />
                    </IconButton>
                </Tooltip>
                {link !== null &&
                    <Tooltip title={getTitle()} disableInteractive={link == null}>
                    <IconButton onClick={handleModal}>
                        <OpenInBrowserIcon />
                    </IconButton>
                    </Tooltip>
                }
            </div>
        </div>
    );
}
