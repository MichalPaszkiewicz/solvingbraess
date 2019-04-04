import { IAmADrawingSpace } from "../interfaces/iamadrawingspace";

export class CanvasSpace implements IAmADrawingSpace {
    get Bottom(){
        return this.Top + this.Height;
    }
    get Right(){
        return this.Left + this.Width;
    }
    constructor(
        public Canvas: HTMLCanvasElement,
        public Context: CanvasRenderingContext2D, 
        public Left: number,
        public Top: number,
        public Width: number,
        public Height: number
    ){

    }

    static fromId(id: string){
        var canvas = <HTMLCanvasElement>document.getElementById(id);
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        return new CanvasSpace(canvas, canvas.getContext("2d"), 0, 0, canvas.width, canvas.height);
    }
}