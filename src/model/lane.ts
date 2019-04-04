import { Direction } from "./direction";
import { TravelTimeFunction } from "./traveltimefunction";

export class Lane {

    Vehicles:string[] = [];

    get VehicleCount(){
        return this.Vehicles.length;
    }

    constructor(
        public Direction: Direction,        
        public TravelTimeFunction: TravelTimeFunction
    ){

    }

    addVehicle(id:string){
        if(!this.Vehicles.some(v => v == id)){
            this.Vehicles.push(id);
        }
    }

    removeVehicle(id: string){
        this.Vehicles = this.Vehicles.filter(v => v != id);
    }

    getRemainingTravelTime(position: number){
        let ttt = this.TravelTimeFunction(this.VehicleCount);
        return (1 - position) * ttt;
    }
}