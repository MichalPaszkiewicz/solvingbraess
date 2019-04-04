import { IAmADrawingSpace } from "../interfaces/iamadrawingspace";
import { IAmSettings } from "../interfaces/iamsetttings";

export abstract class Drawing {
    drawOrder = 10;
    constructor(
        public X: number,
        public Y: number,
        public Scale: number
    ){

    }

    abstract draw(drawingSpace: IAmADrawingSpace, settings: IAmSettings): void;
}