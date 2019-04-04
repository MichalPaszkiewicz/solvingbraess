import { Path } from "../model/path";
import { CanvasSpace } from "./canvasspace";
import { Settings } from "../settings";
import { Guid } from "../helpers/guid";

export class Car{

    Id = Guid.newGuid();
    Stage = 0;
    Position = 0;
    Started = false;
    Finished = false;
    
    private _stageStartTime = new Date().getTime();

    constructor(public Path: Path){

    }

    update(){
        if(this.Finished){
            return;
        }
        let currentTime = new Date().getTime() - this._stageStartTime;

        if(!this.Started){
            this.Path.RoadSequence[this.Stage].Lanes[0].addVehicle(this.Id);
            this.Started = true;
        }

        var remainingTime = this.Path.RoadSequence[this.Stage].Lanes[0].getRemainingTravelTime(this.Position);

        this.Position += (currentTime / (remainingTime > 0 ? remainingTime : 0.01)) * (1 - this.Position);   //(currentTime % 5000) / 5000;

        if(this.Position >= 1){
            this.Path.RoadSequence[this.Stage].Lanes[0].removeVehicle(this.Id);
            this.Position = 0;
            this.Stage++;
            if(this.Stage >= this.Path.RoadSequence.length){
                this.Finished = true;
                return;
            }
            this.Path.RoadSequence[this.Stage].Lanes[0].addVehicle(this.Id);
        }
        this._stageStartTime = new Date().getTime();
    }
}