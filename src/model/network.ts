import { IAmARoadNetwork } from "../interfaces/iamaroadnetwork";
import { Road } from "./road";
import { Junction } from "./junction";
import { Path } from "./path";

export class Network implements IAmARoadNetwork {
    

    constructor(
        public SubNetworks: IAmARoadNetwork[]
    ){

    }

    addNetwork(network: IAmARoadNetwork){
        this.SubNetworks.push(network);
    }

    getPaths(
        junction1Id: string, 
        junction2Id: string, 
        roadScoringFunction?: (road: Road) => number, 
        junctionScoringFunction?: (junction: Junction) => number): Path[] {
        throw new Error("Method not implemented.");
    }
}