import { CanvasSpace } from "./drawing/canvasspace";
import { JunctionViewModel } from "./drawing/junctionviewmodel";
import { Settings } from "./settings";
import { RoadViewModel } from "./drawing/roadviewmodel";
import { LocalNetworkViewModel } from "./drawing/localnetworkviewmodel";
import {Junction} from "./model/junction";
import { Road } from "./model/road";
import { Vector } from "./drawing/vector";
import { MouseControl } from "./controls/mousecontrol";
import { LocalNetwork } from "./model/localnetwork";
import { KeyboardControl } from "./controls/keyboardcontol";
import { Car } from "./drawing/car";
import { Lane } from "./model/lane";
import { Direction } from "./model/direction";

var canvasSpace = CanvasSpace.fromId("main");
var settings = new Settings();

var ln = new LocalNetwork([
    new Junction("a"),
    new Junction("b"),
    new Junction("c"),
    new Junction("z"),
], [
    new Road("r1","a", "b",[new Lane(Direction.Multidirectional, (vs => vs * 500))]),
    new Road("r2", "a", "c", [new Lane(Direction.Multidirectional, (vs => 5000 + 50 * vs))]),
    new Road("r3", "b", "z", [new Lane(Direction.Multidirectional, (vs => 5000 + 50 * vs))]),
    new Road("r4", "c", "z", [new Lane(Direction.Multidirectional, (vs => vs * 500))]),
    //new Road("r5", "b", "c", [new Lane(Direction.Multidirectional, (vs => 100 + 10 * vs))])
]);

var n = new LocalNetworkViewModel(canvasSpace, 1, ln);

n.addCar(new Car(ln.calculateQuickestPath("a", "z")));

n.run(settings);

var mc = new MouseControl(canvasSpace);

class JunctionSelectionRegistration{
    constructor(public Key: string, public On: boolean, public eventFunc: (oldId: string, newId: string) => void){

    }
}

var carFlow = (oi, ni) => {
    window.setInterval(() => {
        ln.unHighlight();
        n.addCar(new Car(ln.calculateQuickestPath(oi, ni)));
    }, 500 + 1000 * Math.random())
}

var selectionRegistrations: JunctionSelectionRegistration[] = [
    new JunctionSelectionRegistration("t", false, () => {
        var rd = new Road("r" + num, oldId, n.SelectedId, [new Lane(Direction.Multidirectional, (vs) => 500 + 50*vs)]);
        ln.addRoad(rd);
        n.addRoad(rd);
    }),
    new JunctionSelectionRegistration("q", false, () => {
        ln.calculateQuickestPath(oldId, n.SelectedId);
    }),
    new JunctionSelectionRegistration("c", false, (oldId, newId) => {
        let oi = oldId;
        let ni = newId;
        window.setInterval(() => {
            ln.unHighlight();
            n.addCar(new Car(ln.calculateQuickestPath(oi, ni)));
        }, 500 + 1000 * Math.random())
    })   
];
var oldId: string;
mc.onclick = (p) => {
    var srs = selectionRegistrations.filter(sr => sr.On);
    if(srs.length > 0){
        srs.forEach(sr => {
            n.unclick();
            ln.unHighlight();
            n.click(p);
            if(n.SelectedId != null && n.SelectedId != oldId){
                sr.eventFunc(oldId, n.SelectedId);
            }
            sr.On = false;
        });
        return;
    }
    n.unclick();
    ln.unHighlight();
    n.click(p);
}
mc.ondrag = (i, p) => {
    n.unclick();
    ln.unHighlight();
    n.drag(i, p);
}

var num = 6;
var kc = new KeyboardControl();
kc.registerOnKey("j", () => {
    var j = window.prompt("new name of junction?");
    if(!j){
        return;
    }
    var junc = new Junction(j);
    ln.addJunction(junc);
    n.addJunction(junc);
});
kc.registerOnKey("r", () => {
    var j1 = window.prompt("from?");
    var j2 = window.prompt("to?");
    if(!j1 || !j2){
        return;
    }
    var rd = new Road("r" + num, j1, j2, []);
    num++;
    ln.addRoad(rd);
    n.addRoad(rd);
});
kc.registerOnKey("t", () => {
    oldId = n.SelectedId;   
    selectionRegistrations.filter(sr => sr.Key == "t")[0].On = true; 
});
kc.registerOnKey("q", () => {
    oldId = n.SelectedId;   
    selectionRegistrations.filter(sr => sr.Key == "q")[0].On = true; 
});
kc.registerOnKey("c", () => {
    oldId = n.SelectedId;   
    selectionRegistrations.filter(sr => sr.Key == "c")[0].On = true; 
});

document.getElementById("recentre").onclick = () => {
    n.recentre();
}

export class Main{

}