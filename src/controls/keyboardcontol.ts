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