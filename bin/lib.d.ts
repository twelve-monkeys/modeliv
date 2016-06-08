import { ClientState, UserActions } from "./store";
export declare const ActionsClient: UserActions;
export declare const ActionsServer: UserActions;
export declare function using(item: {
    dispose(): void;
}, fn: Function): void;
export declare class ClientServerStatesForTesting {
    client: ClientState;
    server: ClientState;
    constructor();
    dispose(): void;
}
