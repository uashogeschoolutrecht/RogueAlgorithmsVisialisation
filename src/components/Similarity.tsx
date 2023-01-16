import { FC, useState } from "react"
import { Edge, Similarity as simType } from "../types/types";
import '../styles/Graph.css';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export interface NodeInfoProps {
    similarity: simType;
    link: Edge;
    heading: string;
    targetWebsite?: number | undefined;
    sourceWebsite?: number | undefined;
}

export const Similarity: FC<NodeInfoProps> = (props) => {
    const [isComparing, setComparing] = useState<Boolean>(false);
    const state = useSelector((state: RootState) => ({
        website: state.pReducer.websiteSlice.website,   
        graph: state.pReducer.graphSlice.graph}));

    const getWebsite = (id: number | undefined) => {
        if(id === undefined) return;
        return state.graph.nodes.find(w => w.id === id);
    }
    const compareArticles = () => {

        var w = window.open("","Comparing two articles",'fullscreen="yes"');
        if (w == null)
            return;
        window.moveTo(0, 0);
        if (document) {
            w.window.resizeTo(window.screen.availWidth, window.screen.availHeight);
        } else{
            if (w.window.outerHeight < window.screen.availHeight || w.window.outerWidth < window.screen.availWidth) {
                w.window.outerHeight = window.screen.availHeight;
                w.window.outerWidth = window.screen.availWidth;
            }
        }
        w.document.body.innerHTML = `
            <div className="row" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 1rem;height:100%;">
                <iframe src=${props.similarity.originalUrl} title="Original article" width="100%" height="100%">
                </iframe>
                <iframe src=${props.similarity.foundUrl} title="Found article" width="100%" height="100%">
                </iframe>
            </div>`;
    }

    return(
        <div className="similarity">
            <div className="article-wrapper">
                <div className="row">
                    <strong>{getWebsite(props.sourceWebsite)?.label}</strong>
                    <strong>{getWebsite(props.targetWebsite)?.label}</strong>
                </div>
                <button onClick={compareArticles}>Compare the two articles</button>
                {!isComparing && <>
                    <strong>Link to: </strong>
                    <div className="row">
                    <a href={props.similarity.originalUrl} target="_blank" rel="noreferrer">Original article</a>
                    <a href={props.similarity.foundUrl} target="_blank" rel="noreferrer">Found article</a>
                    </div>
                    <strong>Language: </strong>
                    <div className="row">
                        <p>{props.similarity.originalLan}</p>
                        <p>{props.similarity.foundLan}</p>
                    </div>
                </>}
                {isComparing && <>
                    <div className="row">
                        <iframe src={props.similarity.originalUrl} title="Original article" width={"100%"} height={"400px"}/>
                        <iframe src={props.similarity.foundUrl} title="Found article" width={"100%"} height={"400px"}/>
                    </div>
                </>}
            </div>
            <strong>Similarity score: </strong> {props.similarity.score}
        </div>
    )
}
