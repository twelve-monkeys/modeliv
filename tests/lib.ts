import {ClientState, UserActions} from "./store";
import {getMessagesToSend, ActionsAt} from "../modeliv.entry";

export const ActionsClient = ActionsAt("client") as UserActions;
export const ActionsServer = ActionsAt("server") as UserActions;

export function using(item: {dispose():void}, fn: Function) {
    try {
      fn();  
    } finally{
        item.dispose();
    }
}

export class ClientServerStatesForTesting {
     client: ClientState;
     server: ClientState;
    
    constructor() {
        this.client = new ClientState("client");
        this.server = new ClientState("server");
        
        getMessagesToSend();
    }
    
    dispose() {
        getMessagesToSend();
        
        (this.client as any).dispose();
        (this.server as any).dispose();
    }
}