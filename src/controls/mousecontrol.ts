import { Vector } from "../drawing/vector";
import { CanvasSpace } from "../drawing/canvasspace";

export class MouseControl {
    
    constructor(canvasSpace: CanvasSpace){
        var self = this;
        var flag = 0;
        var element = canvasSpace.Canvas;
        var init: Vector;
        element.addEventListener("mousedown", function(e){
            flag = 0;
            init = new Vector(e.offsetX, e.offsetY);
        }, false);
        element.addEventListener("mousemove", function(e){
            flag = 1;
            if(init != null){
                var newVec = new Vector(e.offsetX, e.offsetY);
                self.ondrag(init, newVec);
                init = newVec;
            }
        }, false);
        element.addEventListener("mouseup", function(e){
            if(flag === 0){
                self.onclick(init);
            }
            else if(flag === 1){
                self.ondrag(init, new Vector(e.offsetX, e.offsetY));
            }
            init = null;
        }, false);
    }

    onclick(p: Vector){}
    ondrag(i: Vector, p: Vector){}
}