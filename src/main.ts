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
import { Guid } from "./helpers/guid";

var canvasSpace = CanvasSpace.fromId("main");
var graphCanvas = CanvasSpace.fromId("graph");
var settings = new Settings();

var speedConst = 2;

var ln = new LocalNetwork([
    new Junction("a"),
    new Junction("b"),
    new Junction("c"),
    new Junction("z")
], [
    new Road("r1","a", "b",[new Lane(Direction.Multidirectional, (vs => vs * 100 * speedConst))]),
    new Road("r2", "a", "c", [new Lane(Direction.Multidirectional, (vs => 1000 * speedConst + 10 * speedConst * vs))]),
    new Road("r3", "b", "z", [new Lane(Direction.Multidirectional, (vs => 1000 * speedConst + 10 * speedConst * vs))]),
    new Road("r4", "c", "z", [new Lane(Direction.Multidirectional, (vs => vs * 100 * speedConst))])
    //new Road("r5", "b", "c", [new Lane(Direction.Multidirectional, (vs => 100 + 10 * vs))])
]);

var n = new LocalNetworkViewModel(canvasSpace, 1, ln);

//n.addCar(new Car(ln.calculateQuickestPath("a", "z")));

n.run(settings);

var mc = new MouseControl(canvasSpace);

class JunctionSelectionRegistration{
    constructor(public Key: string, public On: boolean, public eventFunc: (oldId: string, newId: string) => void){

    }
}

var maxNum = 0;
var nums = [];
var averagingNum = 2;

var graphI = 0;
graphCanvas.Context.lineWidth = 3;
graphCanvas.Context.strokeStyle = "#0a730a";

var logNum = (n: number) => {
    if(n > maxNum){
        maxNum = n;
        console.log("max: " + maxNum);
    }
    nums.push(n);
    if(nums.length > averagingNum){
        var tot = 0;
        nums.forEach(n => {
            tot += n;
        });
        //console.log("avg: " + (tot/10));
        if(graphI > graphCanvas.Width){
            graphCanvas.Context.clearRect(0,0, graphCanvas.Width, graphCanvas.Height);
            graphI = 0;
        }
        graphCanvas.Context.beginPath();
        graphCanvas.Context.moveTo(graphI, graphCanvas.Bottom);
        graphCanvas.Context.lineTo(graphI, graphCanvas.Bottom - graphCanvas.Height * (tot / (5000* speedConst * averagingNum)))
        graphCanvas.Context.stroke();
        graphCanvas.Context.closePath();
        graphI+=5;
        nums = [];
    }
}

var carFlow = (oi, ni, id: string) => {
    let carNumbers = n.Cars.length;
    if(carNumbers < 20){
        ln.unHighlight();
        var path = ln.calculateQuickestPath(oi, ni);
        path.RoadSequence.forEach(r => r.Highlighted = true);
        path.JunctionSequence.forEach(j => j.Highlighted = true);
        n.addCar(new Car(path, logNum));
    } 
    //console.log(carNumbers);
    window.setTimeout(() => {
        carFlow(oi, ni, id);
    }, 10 * speedConst + 20 * speedConst * Math.random())
}

var selectionRegistrations: JunctionSelectionRegistration[] = [
    new JunctionSelectionRegistration("t", false, () => {
        var rd = new Road("r" + num, oldId, n.SelectedId, [new Lane(Direction.Multidirectional, (vs) => 1000 + 200*vs)]);
        ln.addRoad(rd);
        n.addRoad(rd);
    }),
    new JunctionSelectionRegistration("q", false, () => {
        ln.calculateQuickestPath(oldId, n.SelectedId);
    }),
    new JunctionSelectionRegistration("c", false, (oldId, newId) => {
        carFlow(oldId, newId, Guid.newGuid());
        // let oi = oldId;
        // let ni = newId;
        // window.setInterval(() => {
        //     ln.unHighlight();
        //     n.addCar(new Car(ln.calculateQuickestPath(oi, ni)));
        // }, 500 + 1000 * Math.random())
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

var braessButton = document.getElementById("braess");
braessButton.onclick = () => {
    graphCanvas.Context.strokeStyle = "#dd6f6f";
    var rd = new Road("r" + num, "b", "c", [new Lane(Direction.Multidirectional, (vs) => 100 * speedConst + 10*vs*speedConst)]);
    ln.addRoad(rd);
    n.addRoad(rd);
    braessButton.remove();
}

export class Main{

}