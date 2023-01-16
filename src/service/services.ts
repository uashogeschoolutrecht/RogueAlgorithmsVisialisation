import axios from "axios";

export const getGraph = async() => {
    return axios.get('/api/v1/graph');
}

export const getGraphWithThreshold =async (threshold: number) => {
    return axios.get(`/api/v1/graph?threshold=${threshold}`)
}