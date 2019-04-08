import { Path } from "../model/path";
import { CanvasSpace } from "./canvasspace";
import { Settings } from "../settings";
import { Guid } from "../helpers/guid";

var colours = ["red", "navy", "black", "darkorange"]

export class Car{

    Id = Guid.newGuid();
    Stage = 0;
    Position = 0;
    Started = false;
    Finished = false;
    Colour = colours[Math.floor(Math.random() * 4)]
    
    private _stageStartTime = new Date().getTime();
    private _carStartTime;

    constructor(public Path: Path, public finalReport: (totalTime: number) => void){

    }

    update(){
        if(this.Finished){
            return;
        }
        let currentTime = new Date().getTime() - this._stageStartTime;

        if(!this.Started){
            this.Path.RoadSequence[this.Stage].Lanes[0].addVehicle(this.Id);
            this.Started = true;
            this._carStartTime = new Date().getTime();
        }

        var remainingTime = this.Path.RoadSequence[this.Stage].Lanes[0].getRemainingTravelTime(this.Position);

        this.Position += (currentTime / (remainingTime > 0 ? remainingTime : 0.01)) * (1 - this.Position);   //(currentTime % 5000) / 5000;

        if(this.Position >= 1){
            this.Path.RoadSequence[this.Stage].Lanes[0].removeVehicle(this.Id);
            this.Position = 0;
            this.Stage++;
            if(this.Stage >= this.Path.RoadSequence.length){
                this.Finished = true;
                var totalTime = new Date().getTime() - this._carStartTime;
                this.finalReport(totalTime);
                return;
            }
            this.Path.RoadSequence[this.Stage].Lanes[0].addVehicle(this.Id);
        }
        this._stageStartTime = new Date().getTime();
    }
}