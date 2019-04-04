import { Junction } from "./junction";
import { Road } from "./road";
import { RoadScoringFunction, JunctionScoringFunction } from "./scoringfunction";

export class Path {
    IsLastJunction = true;
    RoadSequence: Road[] = [];
    JunctionSequence: Junction[] = [];

    Score = 0;

    constructor(
        public roadScoringFunction: RoadScoringFunction, 
        public junctionScoringFunction: JunctionScoringFunction = (junction: Junction) => 0,
        junctions: Junction[], roads: Road[]){
            var self = this;
            junctions.forEach(j => {
                self.addJunction(j);                
            });
            roads.forEach(r => {
                self.addRoad(r);
            })
    }

    addRoad(road: Road){
        this.RoadSequence.push(road);
        this.Score += this.roadScoringFunction(road);
        this.IsLastJunction = false;
    }

    addJunction(junction: Junction){
        this.JunctionSequence.push(junction);
        this.Score += this.junctionScoringFunction(junction);
        this.IsLastJunction = true;
    }

    getLatestJunction(){
        return this.JunctionSequence[this.JunctionSequence.length - 1];
    }
}