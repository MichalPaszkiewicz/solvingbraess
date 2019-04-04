import { Lane } from "./lane";

export class Road {
     constructor(
         public Id: string,
         public StartId: string,
         public EndId: string,
         public Lanes: Lane[],
         public Highlighted: boolean = false
     ){

     }
 }