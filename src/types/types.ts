import { type } from "os"

export type WebsiteNode = {
    id: number;
    label: string
    totalArticles: number,
    amountOfConnections: number,
    totalArticlesScraped?: number, 
    totalSimilarities?: number
}
export type Edge = {
    source: number;
    target: number;
    amountOfCopies: number;
    similarities: Similarity[];
}

export type Similarity = {
    originalUrl: string;
    foundUrl: string;
    score : number;
    originalDate: string;
    foundDate: string;
    originalLan: string;
    foundLan: string;
}
export type NetworkGraph = {
    nodes: WebsiteNode[];
    links: Edge[];
}
