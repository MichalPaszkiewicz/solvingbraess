export class Vector{
    constructor(public X: number, public Y: number){

    }
    distance(otherVector: Vector){
        return Math.sqrt((this.X - otherVector.X)*(this.X - otherVector.X) + (this.Y - otherVector.Y)*(this.Y - otherVector.Y));
    }
    add(otherVector: Vector){
        return new Vector(this.X + otherVector.X, this.Y + otherVector.Y);
    }
    subtract(otherVector: Vector){
        return new Vector(this.X - otherVector.X, this.Y - otherVector.Y);
    }
    times(m: number){
        return new Vector(this.X * m, this.Y * m);
    }
    equals(otherVector: Vector){
        return (this.X == otherVector.X) && (this.Y == otherVector.Y);
    }
    directionVector(otherVector: Vector){
        return otherVector.subtract(this).times(1/this.distance(otherVector));
    }
    inverse(){
        return new Vector(1/this.X, 1/this.Y);
    }
    reverse(){
        return new Vector(-this.X, -this.Y);
    }
    limit(magnitude: number){
        var max = this.times(magnitude / this.distance(new Vector(0,0)));
        var x = this.X < 0 ? Math.max(this.X, max.X) : Math.min(this.X, max.X);
        var y = this.Y < 0 ? Math.max(this.Y, max.Y) : Math.min(this.Y, max.Y);
        return new Vector(x, y);
    }
    random(distance: number){
        return new Vector(this.X + Math.random() * distance - distance / 2, this.Y + Math.random() * distance - distance / 2);
    }
}