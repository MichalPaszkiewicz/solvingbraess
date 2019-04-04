import { Vector } from "../drawing/vector";
import { CanvasSpace } from "../drawing/canvasspace";

export class MouseControl {
    
    constructor(canvasSpace: CanvasSpace){
        var self = this;
        var flag = 0;
        var element = canvasSpace.Canvas;
        var ticks = 0;
        var init: Vector;
        element.addEventListener("mousedown", function(e){
            flag = 0;
            ticks = new Date().getTime();
            init = new Vector(e.offsetX, e.offsetY);
        }, false);
        element.addEventListener("mousemove", function(e){
            flag = 1;
            let now = new Date().getTime();
            if(init != null && (now - ticks > 100)){
                var newVec = new Vector(e.offsetX, e.offsetY);
                self.ondrag(init, newVec);
                init = newVec;
            }
            else{
                flag = 0;
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