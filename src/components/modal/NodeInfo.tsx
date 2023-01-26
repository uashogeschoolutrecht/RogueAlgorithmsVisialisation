import { CSSProperties, FC } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "../../styles/Graph.css";
import { Similarity } from "../Similarity";

export interface NodeInfoProps {
    id?: string;
    className?: string;
    style?: CSSProperties;
}

export const NodeInfo: FC<NodeInfoProps> = (props) => {
    const state = useSelector((state: RootState) => ({
        website: state.pReducer.websiteSlice.website,   
        graph: state.pReducer.graphSlice.graph}));

    const getWebsite = (id: number) => {
        return state.graph.nodes.find(w => w.id === id);
    }
    
    return(
        <div className="node-info-container">
            <h1>{state.website.label}</h1>
            <div className="similarities-container">
                <div className="container">
                    <h3>{state.graph.links.filter(link => link.source === state.website.id)
                        .map(link => link.similarities)
                        .reduce((prev, current) => prev.concat(current)).length} Original post:</h3>
                    <div className="similarity-container">
                        {state.graph.links.filter(link => link.source === state.website.id)
                        .map(link => link.similarities.map( 
                            sim => <Similarity similarity={sim} key={sim.originalUrl+ sim.foundUrl} 
                            link={link} 
                            sourceWebsite={link.source}
                            targetWebsite={link.target}
                            heading="Website who copied: "/> 
                            )         
                        )}
                    </div>
                </div>
                <div className="container">
                    <h3>{state.graph.links.filter(link => link.target === state.website.id)
                        .map(link => link.similarities)
                        .reduce((prev, current) => prev.concat(current)).length} Copied post:</h3>
                    <div className="similarity-container">
                        {state.graph.links.filter(link => link.target === state.website.id)
                        .map(link => link.similarities.map( 
                            sim => <Similarity similarity={sim} key={sim.originalUrl+ sim.foundUrl} 
                            link={link} 
                            sourceWebsite={link.source}
                            targetWebsite={link.target}
                            heading="Copied from: " /> 
                            )         
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
