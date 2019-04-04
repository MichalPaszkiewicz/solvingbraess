import { Junction } from "../model/junction";
import { Road } from "../model/road";
import { RoadScoringFunction, JunctionScoringFunction } from "../model/scoringfunction";
import { Path } from "../model/path";

export interface IAmARoadNetwork {
    
    getPaths(
        junction1Id: string, 
        junction2Id: string, 
        roadScoringFunction?: RoadScoringFunction, 
        junctionScoringFunction?: JunctionScoringFunction): Path[];

}