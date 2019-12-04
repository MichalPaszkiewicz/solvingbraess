import { IAmSettings } from "./interfaces/iamsetttings";

export class Settings implements IAmSettings {
    EdgeTension = 1;
    VertexRepulsion = 1;
    Scale = 1;
    SpeedConstant = 1;
    LiveDecisionMaking = false;
    NumberOfCars = 100;
    // 20
    CarInsertionRate = 60 * this.SpeedConstant + 0 * this.SpeedConstant * Math.random()
    // 40 * ....
}

export class SelectionSettings{
    OldId: string = null;
    NewId: string = null;

    constructor(){

    }
}