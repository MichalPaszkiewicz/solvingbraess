import { Drawing } from "./drawing";
import { IAmADrawingSpace } from "../interfaces/iamadrawingspace";
import { IAmSettings } from "../interfaces/iamsetttings";
import { Styles } from "./styles";

export class JunctionViewModel extends Drawing {
    constructor(
        x: number,
        y: number,
        scale: number,
        public Name: string,
        public Highlighted: boolean
    ){
        super(x, y, scale);
    }
    drawOrder = 20;
    draw(drawingSpace: IAmADrawingSpace, settings: IAmSettings, selected: boolean = false): void {
        drawingSpace.Context.beginPath();
        drawingSpace.Context.arc(this.X, this.Y, settings.Scale * 22, 0, 2 * Math.PI);
        Styles.fillTarmac(drawingSpace.Context, this.Highlighted);
        if(selected){
            drawingSpace.Context.setLineDash([]);
            drawingSpace.Context.strokeStyle = "green";
            drawingSpace.Context.lineWidth = 3;
            drawingSpace.Context.stroke();
        }
        drawingSpace.Context.closePath();

        drawingSpace.Context.beginPath();
        drawingSpace.Context.arc(this.X, this.Y, settings.Scale * 10, 0, 2 * Math.PI);
        Styles.fillGrass(drawingSpace.Context);
        drawingSpace.Context.closePath();
        
        drawingSpace.Context.beginPath();
        drawingSpace.Context.arc(this.X, this.Y, settings.Scale * 16, 0, 2 * Math.PI);
        Styles.strokeWhiteLine(drawingSpace.Context);        
        drawingSpace.Context.closePath();  

        drawingSpace.Context.beginPath();
        drawingSpace.Context.textAlign = "center";
        drawingSpace.Context.textBaseline = "middle";
        drawingSpace.Context.font = "15px Consolas"
        drawingSpace.Context.fillStyle = "white";
        drawingSpace.Context.fillText(this.Name, this.X, this.Y);   
        drawingSpace.Context.closePath();
    }
}