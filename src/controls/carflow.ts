import { SelectionSettings, Settings } from "../settings";
import { IAmACarFlow } from "../interfaces/iamacarflow";
import { LocalNetworkViewModel } from "../drawing/localnetworkviewmodel";
import { Car } from "../drawing/car";
import { LocalNetwork } from "../model/localnetwork";
import { TravelTimeDisplay } from "../drawing/traveltimedisplay";

export var carFlow: (lnvm: LocalNetworkViewModel, ln: LocalNetwork, travelTimeDisplay: TravelTimeDisplay, settings: Settings) => 
                            IAmACarFlow = (lnvm, ln, travelTimeDisplay, settings) => 
                                (selectionSettings: SelectionSettings, id: string) => {
    let carNumbers = lnvm.Cars.length;
    if(carNumbers < settings.NumberOfCars){
        ln.unHighlight();
        var path = ln.calculateQuickestPath(selectionSettings.OldId, selectionSettings.NewId);
        path.RoadSequence.forEach(r => r.Highlighted = true);
        path.JunctionSequence.forEach(j => j.Highlighted = true);
        let cr = new Car(path, (n) => travelTimeDisplay.addTravelTime(n));
        if(settings.LiveDecisionMaking){
            cr.updatePathAtJunctions((j) => ln.calculateQuickestPath(j.Id, selectionSettings.NewId));
        }
        lnvm.addCar(cr);
    } 
    //console.log(carNumbers);
    window.setTimeout(() => {
        carFlow(lnvm, ln, travelTimeDisplay, settings)(selectionSettings, id);
    }, settings.CarInsertionRate)
}