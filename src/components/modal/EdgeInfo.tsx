import { CSSProperties, FC } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "../../styles/Graph.css";
import { Similarity } from "../Similarity";

export interface EdgeInfoProps {
    id?: string;
    className?: string;
    style?: CSSProperties;
}

export const EdgeInfo: FC<EdgeInfoProps> = (props) => {
    const state = useSelector((state: RootState) => ({
        edge: state.pReducer.edgeSlice.edge,   
        graph: state.pReducer.graphSlice.graph}));

    const getWebsite = (id: number) => {
        return state.graph.nodes.find(w => w.id == id);
    }
    return(
        <div className="inner">
            <div className="header">
                <div className="website-link"><h2>Source: <u>{getWebsite(state.edge.source)?.label}</u></h2></div>
                <strong className="from-to-pointer">-{">"}</strong>
                <div className="website-link"><h2>Target: {getWebsite(state.edge.target)?.label}</h2></div>
            </div>
            <div className="similarity-container">
            {state.edge.similarities.map(sim => 
                <Similarity similarity={sim} key={sim.originalUrl+ sim.foundUrl} 
                    link={state.edge} 
                    heading=""
                    showHeader={false}/> 
                    )}            
            </div>     
        </div>
    );
}
