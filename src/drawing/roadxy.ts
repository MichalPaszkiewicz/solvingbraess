import { Vector } from "./vector";

export class RoadXY extends Vector{

    constructor(public X: number, public Y: number, public AverageRoadTravelTime: number){
        super(X, Y);
    }

    static fromVector(vector: Vector, averageRoadTravelTime){
        return new RoadXY(vector.X, vector.Y, averageRoadTravelTime);
    }

}