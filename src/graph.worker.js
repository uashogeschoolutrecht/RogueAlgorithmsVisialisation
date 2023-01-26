
import { MultiDirectedGraph } from "graphology";
import { NetworkGraph } from "./types/types";
import { getRandomPosition, calculateEgdeValue, calculateNodeValue, calculateTotalLinks, getTotalTypesOfLinks, getColor } from "./utils/graphUtils";

onmessage = (event) => {
    console.log(event)
    const data = JSON.parse(event.graph);
    // Do the heavy computations here
    const Multigraph = createGraph(data);
    postMessage();
}


// export default () => new Worker('./graph.worker.js');

export const worker_script = URL.createObjectURL(blob);