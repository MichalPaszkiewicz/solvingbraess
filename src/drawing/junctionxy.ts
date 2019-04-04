import { Vector } from "./vector";
import { Junction } from "../model/junction";

export class JunctionXY {
    public V: Vector = new Vector(0,0);
    public A: Vector;
    public Selected: boolean = false;
    constructor(public Junction: Junction, public P: Vector, public Roads: string[]){

    }
    update(C: Vector, otherJunctions: JunctionXY[], otherRoads: Vector[]){
        if(this.Selected){
            return;
        }
        var self = this;
        self.A = (self.P.directionVector(C).times(0.5).add(self.P.subtract(C).reverse().times(0.001)));
        otherJunctions.forEach(j => {
            self.A = self.A.add((self.P.subtract(j.P)).inverse().times(11));
            if(self.Roads.some(r => r == j.Junction.Id)){
                self.A = self.A.add(j.P.directionVector(self.P).reverse().times(0.5));
            }
        });
        otherRoads.forEach(r => {
            self.A = self.A.add((self.P.subtract(r)).inverse().times(8));
        });
        //dampen
        self.A = self.A.subtract(self.V.times(0.08));

        this.V = this.V.add(this.A).limit(4);
        this.P = this.P.add(this.V);
    }
    didIGetClicked(clickPos: Vector, scale: number = 1){
        return this.P.distance(clickPos) < 22 * scale;
    }
}
