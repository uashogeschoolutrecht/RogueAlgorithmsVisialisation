import { MultiDirectedGraph } from "graphology";
import { GREY } from "../types/colors";
import { NetworkGraph } from "../types/types";

const MIN_NODE_SIZE = 1;
const MAX_NODE_SIZE = 20;
const MIN_EDGE_SIZE = 1;
const MAX_EDGE_SIZE = 4;

export function calculateEgdeValue(val: number, minDegree: number, maxDegree: number){
    let size = ((val - minDegree) / (maxDegree - minDegree)) * 
            (MAX_EDGE_SIZE - MIN_EDGE_SIZE) + MIN_EDGE_SIZE;
    if (size > 1) return size * 2;
    return size;    
}
export function  calculateNodeValue (val: number, minDegree: number, maxDegree: number){
    return ((val - minDegree) / (maxDegree - minDegree)) * 
            (MAX_NODE_SIZE - MIN_NODE_SIZE) + MIN_NODE_SIZE
}
export function calculateTotalLinks (node: string, graph: NetworkGraph){
    let nodeAsNumber = Number.parseInt(node);
    let edgesOfNodes = graph.links.filter(link => link.source === nodeAsNumber );

    return edgesOfNodes.map(edge => edge.similarities.length)
        .reduce((total, current) => total += current, 0);
}
export function getTotalTypesOfLinks(node: string, graph: NetworkGraph){
    let nodeAsNumber = Number.parseInt(node);
    let linksAsSource = graph.links.filter(link => link.source === nodeAsNumber);
    let linksAsTarget = graph.links.filter(link => link.target === nodeAsNumber);

    let totalSimsSource = linksAsSource.map(edge => edge.similarities.length)
        .reduce((total, current) => total += current, 0);
    let totalSimsTarget = linksAsTarget.map(edge => edge.similarities.length)
        .reduce((total, current) => total += current, 0);
    return {
        source: totalSimsSource,
        target: totalSimsTarget
    }

}

export function getRandomPosition(){
    return {
        x: Math.random()*100,
        y: Math.random()*100
    }
};

export function getColor(totalSource: number, totalTarget: number){
    let totalLinks = totalSource + totalTarget;
       if ( totalLinks <= 5)
        return "#777777";
    let sourcePercent = (totalSource / totalLinks) * 100 ;
    let targetPercent = (totalTarget / totalLinks) * 100 ;
    if( sourcePercent > targetPercent){
        return "#363A81";
    }else if (targetPercent > sourcePercent) {
        return "#813636";
    }

    return GREY;
}
