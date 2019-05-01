import { CanvasSpace } from "./canvasspace";
import { Settings } from "../settings";

export class TravelTimeDisplay{

    Nums: number[] = [];
    private _graphIndex: number = 0;

    constructor(public canvasSpace: CanvasSpace, public AnalysisGroupingSize: number, public Settings: Settings){
        canvasSpace.Context.lineWidth = 3;
        canvasSpace.Context.strokeStyle = "#0a730a";
    }

    addTravelTime(n: number){
        this.Nums.push(n);
        if(this.Nums.length > this.AnalysisGroupingSize){
            var tot = 0;
            this.Nums.forEach(n => {
                tot += n;
            });
            if(this._graphIndex > this.canvasSpace.Width){
                this.canvasSpace.Context.clearRect(0,0, this.canvasSpace.Width, this.canvasSpace.Height);
                this._graphIndex = 0;
            }
            this.canvasSpace.Context.beginPath();
            this.canvasSpace.Context.moveTo(this._graphIndex, this.canvasSpace.Bottom);
            this.canvasSpace.Context.lineTo(this._graphIndex, this.canvasSpace.Bottom - this.canvasSpace.Height * (tot / (8000* this.Settings.SpeedConstant * this.AnalysisGroupingSize)))
            this.canvasSpace.Context.stroke();
            this.canvasSpace.Context.closePath();
            this._graphIndex += 5;
            this.Nums = [];
        }
    }
}