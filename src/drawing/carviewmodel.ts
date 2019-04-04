import { Drawing } from "./drawing";
import { IAmADrawingSpace } from "../interfaces/iamadrawingspace";
import { IAmSettings } from "../interfaces/iamsetttings";
import { Styles } from "./styles";

export class CarViewModel extends Drawing {
    drawOrder = 20;

    constructor(
        x: number,
        y: number,
        public W: number,
        public H: number,
        public Theta: number,
        public scale: number = 1
    ){
        super(x, y, scale)
    }

    draw(drawingSpace: IAmADrawingSpace, settings: IAmSettings): void {
        drawingSpace.Context.beginPath();
        drawingSpace.Context.fillStyle = "red";
        drawingSpace.Context.rotate(this.Theta);
        drawingSpace.Context.fillRect(this.X, this.Y, this.W, this.H);
        drawingSpace.Context.closePath(); 
        drawingSpace.Context.rotate(-this.Theta);
    }
}