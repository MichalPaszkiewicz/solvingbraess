export class Styles{        
    
    static fillGrass(ctx: CanvasRenderingContext2D): any {
        ctx.fillStyle = "green";
        ctx.fill();               
        ctx.setLineDash([]);                 
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    static fillTarmac(ctx: CanvasRenderingContext2D, highlighted: boolean = false){
        ctx.fillStyle = "#828385";
        if(highlighted){
            ctx.fillStyle = "#08a5d8";
        }
        ctx.fill();
    }

    static strokeTarmac(ctx: CanvasRenderingContext2D, highlighted: boolean = false){
        ctx.strokeStyle = "#828385";
        if(highlighted){
            ctx.strokeStyle = "#08a5d8";
        }
        ctx.setLineDash([]);        
        ctx.lineWidth = 11;
        ctx.stroke();        
    }

    static strokeWhiteLine(ctx: CanvasRenderingContext2D){
        ctx.strokeStyle = "white";
        ctx.setLineDash([4, 2]);
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}