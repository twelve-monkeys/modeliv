export interface Message {
    tier: any;
    name: string;
    value: any;
    store?: any;
}
export declare function state(constructor: Function): void;
export declare function dispatch(tier: any, actionName: string, args: any[], propogate?: boolean): void;
export declare function messagesFor(sv: any[][]): void;
export declare function getStoreVersions(): {
    name: string;
    version: any;
}[];
export declare function ActionsAt(tier: any): any;
export declare function getMessagesToSend(tier?: any): Message[];
export declare function gotMessages(tier: any, messages: Message[]): void;
export declare class TieredState<T> {
    tier: T;
    constructor(tier: T);
}
