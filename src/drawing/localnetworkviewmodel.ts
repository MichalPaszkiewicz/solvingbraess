import { Drawing } from "./drawing";
import { IAmADrawingSpace } from "../interfaces/iamadrawingspace";
import { IAmSettings } from "../interfaces/iamsetttings";
import { Road } from "../model/road";
import { Junction } from "../model/junction";
import { JunctionViewModel } from "./junctionviewmodel";
import { RoadViewModel } from "./roadviewmodel";
import { Vector } from "./vector";
import { JunctionXY } from "./junctionxy";
import { LocalNetwork } from "../model/localnetwork";

export class LocalNetworkViewModel extends Drawing {

    Junctions: JunctionXY[];
    RoadsXY: Vector[] = [];

    constructor(public DrawingSpace: IAmADrawingSpace, scale: number, public Network: LocalNetwork){
        super(DrawingSpace.Left + DrawingSpace.Width / 2, DrawingSpace.Top + DrawingSpace.Height / 2, scale);
        var self = this;        
        this.Junctions = self.Network.Junctions.map(j => {
            var rs = self.Network.Roads.filter(r => r.StartId == j.Id).map(r => r.EndId);
            var re = self.Network.Roads.filter(r => r.EndId == j.Id).map(r => r.StartId);
            return new JunctionXY(j, (new Vector(this.X, this.Y)).random(20), rs.concat(re))
        });
    }

    recentre(){
        this.Junctions.forEach(j => j.P = (new Vector(this.X, this.Y)).random(20));
    }

    addRoad(road: Road){
        this.Junctions.forEach(j => {
            if(j.Junction.Id == road.StartId){
                j.Roads.push(road.EndId);
            }   
            if(j.Junction.Id == road.EndId){
                j.Roads.push(road.StartId);
            }
        })
    }

    addJunction(junction: Junction){
        this.Junctions.push(new JunctionXY(junction, (new Vector(this.X, this.Y)).random(20), []));
    }
    
    draw(drawingSpace: IAmADrawingSpace, settings: IAmSettings): void {
        var self = this;
        drawingSpace.Context.clearRect(drawingSpace.Left, drawingSpace.Top, drawingSpace.Width, drawingSpace.Height);
        this.RoadsXY = [];
        this.Network.Roads.forEach(r => {
            var j1 = this.Junctions.filter(j => j.Junction.Id == r.StartId)[0];
            var j2 = this.Junctions.filter(j => j.Junction.Id == r.EndId)[0];
            
            var rvm = new RoadViewModel(j1.P.X, j1.P.Y, j2.P.X, j2.P.Y, settings.Scale, r.Highlighted);
            rvm.draw(drawingSpace, settings);
            self.RoadsXY.push(j1.P.add(j2.P.subtract(j1.P).times(0.5)));
        });

        this.Junctions.forEach(j => {
            var jvm = new JunctionViewModel(j.P.X, j.P.Y, settings.Scale, j.Junction.Id, j.Junction.Highlighted);
            jvm.draw(drawingSpace, settings, j.Selected);
        })
    }

    run(settings: IAmSettings){
        var self = this;
        self.Junctions.forEach(j => {
            j.update(new Vector(self.X, self.Y), self.Junctions.filter(j2 => !j2.P.equals(j.P)), self.RoadsXY);
        });

        self.draw(self.DrawingSpace, settings);

        window.requestAnimationFrame(() => {
            self.run(settings);
        });
    }

    click(clickPos: Vector){
        var selecteds = this.Junctions.filter(j => j.didIGetClicked(clickPos, this.Scale))
        
        if(selecteds.length > 0){
            this.SelectedId = selecteds[0].Junction.Id;            
            selecteds[0].Selected = true;
        }
    }

    SelectedId: string;

    drag(init: Vector, to: Vector){
        var selecteds = this.Junctions.filter(j => j.didIGetClicked(init, this.Scale))
        
        if(selecteds.length > 0){
            this.SelectedId = selecteds[0].Junction.Id;
            selecteds[0].Selected = true;
            selecteds[0].P = to;
        }
    }

    unclick(){
        this.SelectedId = null;
        this.Junctions.forEach(j => j.Selected = false);
    }
}

