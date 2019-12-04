import { Road } from "./road";
import { Junction } from "./junction";
import { TravelTimeFunction } from "./traveltimefunction";
import { Lane } from "./lane";
import { Direction } from "./direction";
import { IAmARoadNetwork } from "../interfaces/iamaroadnetwork";
import { Path } from "./path";

export class LocalNetwork implements IAmARoadNetwork {

    constructor(
        public Junctions: Junction[],
        public Roads: Road[]
    ){

    }

    addJunction(junction: Junction){
        this.Junctions.push(junction);
    }

    connectJunctions(id: string, junction1Id: string, junction2Id: string){
        this.Roads.push(new Road(id, junction1Id, junction2Id, []));
    }

    addRoad(road: Road){
        this.Roads.push(road);
    }

    addLaneToRoad(roadId: string, travelTimeFunction: TravelTimeFunction, direction: Direction = Direction.Multidirectional){
        var relevantRoads = this.Roads.filter(r => r.Id === roadId);

        if(relevantRoads.length < 1){
            throw new Error(`No road exists with Id: ${roadId}`);
        }

        relevantRoads[0].Lanes.push(new Lane(direction, travelTimeFunction));
    }

    getPaths(
        junction1Id: string, 
        junction2Id: string, 
        roadScoringFunction?: (road: Road) => number, 
        junctionScoringFunction?: (junction: Junction) => number): Path[] {
        throw new Error("Method not implemented.");
    }

    findJunction(id: string){
        return this.Junctions.filter(j => j.Id == id)[0];
    }

    findRoads(id: string): Road[]{
        return this.Roads.filter(r => r.StartId == id || r.EndId == id);
    }

    findOppositeJunctionOfRoad(junctionId: string, road: Road){
        if(road.StartId == junctionId){
            return this.findJunction(road.EndId);
        }
        return this.findJunction(road.StartId);
    }

    calculateQuickestPathBetweenJunctions(junction1: Junction, junction2: Junction){
        if(junction1 == null || junction2 == null){
            return;
        }
        var self = this;
        var usedJunctions: Junction[] = [junction1];
        var paths: Path[] = [new Path((r) => r.Lanes[0].getRemainingTravelTime(0), () => 0, [junction1], [])];
        var destinationFound = false;
        while(!destinationFound){
            var minScore = Infinity;
            var min: Path = paths[0];
            var minIndex = 0;
            for(var i = 0; i < paths.length; i++){
                var pathScore = paths[i].getScore();
                if(pathScore <= minScore){
                    minScore = pathScore;
                    min = paths[i];
                    minIndex = i;
                }
            }

            var minPathLastJunction = min.getLatestJunction();

            if(minPathLastJunction == junction2){
                destinationFound = true;
                return min;
            }            

            var childPaths = self.findRoads(minPathLastJunction.Id).map(r => 
                new Path(
                min.roadScoringFunction,
                min.junctionScoringFunction,
                [...min.JunctionSequence, self.findOppositeJunctionOfRoad(minPathLastJunction.Id, r)], 
                [...min.RoadSequence, r]));

            paths.splice(minIndex, 1);
            paths = paths.concat(childPaths.filter(cp => !cp.hasDuplicateJunctions()));
        }  
    }

    calculateQuickestPath(junction1Id: string, junction2Id: string){
        return this.calculateQuickestPathBetweenJunctions(this.findJunction(junction1Id), this.findJunction(junction2Id));
    }

    unHighlight(){
        this.Junctions.forEach(j => j.Highlighted = false);
        this.Roads.forEach(r => r.Highlighted = false);
    }
}