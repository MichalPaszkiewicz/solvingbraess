import { LocalNetwork } from "../model/localnetwork";
import { Junction } from "../model/junction";
import { LocalNetworkViewModel } from "../drawing/localnetworkviewmodel";
import { Guid } from "../helpers/guid";
import { Road } from "../model/road";
import { SelectionSettings } from "../settings";
import { JunctionSelectionRegistrationList } from "./selectionregistrations";

type KeyFunc = () => void;

class KeyFuncRegistration{
    constructor(public Key: string, public KeyFunc: KeyFunc){

    }
}

export class KeyboardControl{

    registrations: KeyFuncRegistration[] = [];

    constructor(){
        var self = this;
        window.onkeydown = (e) => {
            var key = e.keyCode || e.charCode;

            if(key == 8 || key == 46){
                self.onKey("delete");   
                return false;
            }
        }
        window.onkeypress = (e) => {
            self.onKey(String.fromCharCode(e.charCode || e.keyCode));                        
        }
    }

    private onKey(k: string){
        this.registrations.filter(r => r.Key == k).forEach(r => r.KeyFunc());
    }

    registerOnKey(key: string, kf: KeyFunc){
        this.registrations.push(new KeyFuncRegistration(key, kf));
    };
}

export class StandardKeyboardSetup{

    constructor(ln: LocalNetwork, lnvm: LocalNetworkViewModel, selectionSettings: SelectionSettings, selectionRegistrations: JunctionSelectionRegistrationList){
        var kc = new KeyboardControl();
        kc.registerOnKey("j", () => {
            var j = window.prompt("new name of junction?");
            if(!j){
                return;
            }
            var junc = new Junction(j);
            ln.addJunction(junc);
            lnvm.addJunction(junc);
        });
        kc.registerOnKey("r", () => {
            var j1 = window.prompt("from?");
            var j2 = window.prompt("to?");
            if(!j1 || !j2){
                return;
            }
            var rd = new Road(Guid.newGuid(), j1, j2, []);
            ln.addRoad(rd);
            lnvm.addRoad(rd);
        });
        kc.registerOnKey("t", () => {
            selectionSettings.OldId = lnvm.SelectedId;   
            selectionRegistrations.filter(sr => sr.Key == "t")[0].On = true; 
        });
        kc.registerOnKey("q", () => {
            selectionSettings.OldId = lnvm.SelectedId;   
            selectionRegistrations.filter(sr => sr.Key == "q")[0].On = true; 
        });
        kc.registerOnKey("c", () => {
            selectionSettings.OldId = lnvm.SelectedId;   
            selectionRegistrations.filter(sr => sr.Key == "c")[0].On = true; 
        });
    }
}