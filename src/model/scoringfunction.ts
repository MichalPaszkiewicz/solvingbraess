import { Road } from "./road";
import { Junction } from "./junction";

export type RoadScoringFunction = (road: Road) => number;
export type JunctionScoringFunction = (junction: Junction) => number;