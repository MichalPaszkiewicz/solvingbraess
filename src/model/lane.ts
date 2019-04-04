import { Direction } from "./direction";
import { TravelTimeFunction } from "./traveltimefunction";

export class Lane {
    
    constructor(
        public Direction: Direction,        
        public TravelTimeFunction: TravelTimeFunction
    ){

    }

}