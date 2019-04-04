import { Drawing } from "./drawing";
import { IAmADrawingSpace } from "../interfaces/iamadrawingspace";
import { IAmSettings } from "../interfaces/iamsetttings";
import { Styles } from "./styles";

export class RoadViewModel extends Drawing {
    drawOrder = 20;

    constructor(
        x: number,
        y: number,
        public X2: number,
        public Y2: number,
        scale = 1,
        public Highlighted: boolean
    ){
        super(x, y, scale);
    }

    draw(drawingSpace: IAmADrawingSpace, settings: IAmSettings): void {
        drawingSpace.Context.beginPath();
        drawingSpace.Context.moveTo(this.X, this.Y);
        drawingSpace.Context.lineTo(this.X2, this.Y2);
        Styles.strokeTarmac(drawingSpace.Context, this.Highlighted);
        drawingSpace.Context.closePath();

        drawingSpace.Context.beginPath();
        drawingSpace.Context.moveTo(this.X, this.Y);
        drawingSpace.Context.lineTo(this.X2, this.Y2);
        Styles.strokeWhiteLine(drawingSpace.Context);        
        drawingSpace.Context.closePath();        
    }
}