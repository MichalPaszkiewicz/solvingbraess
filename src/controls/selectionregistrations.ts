import { SelectionSettings } from "../settings";
import { Road } from "../model/road";
import { Guid } from "../helpers/guid";
import { Lane } from "../model/lane";
import { Direction } from "../model/direction";
import { LocalNetworkViewModel } from "../drawing/localnetworkviewmodel";
import { LocalNetwork } from "../model/localnetwork";
import { IAmACarFlow } from "../interfaces/iamacarflow";

export class JunctionSelectionRegistration{
    constructor(public Key: string, public On: boolean, public eventFunc: (ss: SelectionSettings) => void){

    }
}

export class JunctionSelectionRegistrationList{
    constructor(public SelectionRegistrations: JunctionSelectionRegistration[]){

    }

    filter(filterFunc){
        return this.SelectionRegistrations.filter(filterFunc);
    }
}

export class DefaultJunctionSelectionRegistrationList extends JunctionSelectionRegistrationList{

    constructor(selectionSettings: SelectionSettings, localNetwork: LocalNetwork, lnvm: LocalNetworkViewModel, carFlowFunc: IAmACarFlow){
        super([
            new JunctionSelectionRegistration("t", false, () => {
                var rd = new Road(Guid.newGuid(), selectionSettings.OldId, lnvm.SelectedId, [new Lane(Direction.Multidirectional, (vs) => 1000 + 200*vs)]);
                localNetwork.addRoad(rd);
                lnvm.addRoad(rd);
            }),
            new JunctionSelectionRegistration("q", false, () => {
                localNetwork.calculateQuickestPath(selectionSettings.OldId, lnvm.SelectedId);
            }),
            new JunctionSelectionRegistration("c", false, (selectionSettings: SelectionSettings) => {
                carFlowFunc(selectionSettings, Guid.newGuid());
            })  
        ]);
    }

}