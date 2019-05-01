import { Vector } from "../drawing/vector";
import { CanvasSpace } from "../drawing/canvasspace";
import { JunctionSelectionRegistrationList } from "./selectionregistrations";
import { LocalNetwork } from "../model/localnetwork";
import { SelectionSettings, Settings } from "../settings";
import { Road } from "../model/road";
import { Guid } from "../helpers/guid";
import { Lane } from "../model/lane";
import { Direction } from "../model/direction";
import { LocalNetworkViewModel } from "../drawing/localnetworkviewmodel";

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

export class StandardMouseSetup{
    constructor(mc: MouseControl, 
        settings: Settings,
        ss: SelectionSettings, 
        selectionRegistrations: JunctionSelectionRegistrationList, 
        localNetwork: LocalNetwork, 
        lnvm: LocalNetworkViewModel,
        graphCtx: CanvasRenderingContext2D,
        braessRoad: Road){
        mc.onclick = (p) => {
            var srs = selectionRegistrations.filter(sr => sr.On);
            if(srs.length > 0){
                srs.forEach(sr => {
                    lnvm.unclick();
                    localNetwork.unHighlight();
                    lnvm.click(p);
                    if(lnvm.SelectedId != null && lnvm.SelectedId != ss.OldId){
                        ss.NewId = lnvm.SelectedId;
                        sr.eventFunc(ss);
                    }
                    sr.On = false;
                });
                return;
            }
            lnvm.unclick();
            localNetwork.unHighlight();
            lnvm.click(p);
        }
        mc.ondrag = (i, p) => {
            lnvm.unclick();
            localNetwork.unHighlight();
            lnvm.drag(i, p);
        }
        
        document.getElementById("recentre").onclick = () => {
            lnvm.recentre();
        }
        
        var braessButton = document.getElementById("braess");
        braessButton.onclick = () => {
            graphCtx.strokeStyle = "#dd6f6f";
            var rd = braessRoad;
            localNetwork.addRoad(rd);
            lnvm.addRoad(rd);
            braessButton.remove();
        }
        
        var liveDecisionToggle = document.getElementById("toggleGps");
        liveDecisionToggle.onclick = () => {
            liveDecisionToggle.innerText = settings.LiveDecisionMaking ?  "Live decisions ON" : "Live decisions OFF"
            settings.LiveDecisionMaking = !settings.LiveDecisionMaking;
        };
    }
}