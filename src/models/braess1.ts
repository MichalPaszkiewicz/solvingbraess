import { Junction } from "../model/junction";
import { Road } from "../model/road";
import { Lane } from "../model/lane";
import { Direction } from "../model/direction";
import { LocalNetwork } from "../model/localnetwork";
import { Settings } from "../settings";
import { Guid } from "../helpers/guid";

export var braess1 = (settings: Settings) => new LocalNetwork([
    new Junction("a"),
    new Junction("b"),
    new Junction("c"),
    new Junction("z")
], [
    new Road("r1","a", "b",[new Lane(Direction.Multidirectional, (vs => vs * 100 * settings.SpeedConstant))]),
    new Road("r2", "a", "c", [new Lane(Direction.Multidirectional, (vs => 1000 * settings.SpeedConstant + 10 * settings.SpeedConstant * vs))]),
    new Road("r3", "b", "z", [new Lane(Direction.Multidirectional, (vs => 1000 * settings.SpeedConstant + 10 * settings.SpeedConstant * vs))]),
    new Road("r4", "c", "z", [new Lane(Direction.Multidirectional, (vs => vs * 100 * settings.SpeedConstant))])
    //new Road("r5", "b", "c", [new Lane(Direction.Multidirectional, (vs => 100 + 10 * vs))])
]);

export var braess1AdditionalRoad = (settings: Settings) =>
    new Road(Guid.newGuid(), "b", "c", [new Lane(Direction.Multidirectional, (vs) => 100 * settings.SpeedConstant + 10 * vs * settings.SpeedConstant)]);