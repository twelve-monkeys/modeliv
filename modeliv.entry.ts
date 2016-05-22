declare class Proxy {
    constructor(object: Object, handler: Object);
}

const _states = [] as Function[];
interface IInstance {
    tier: any;
    version?: number;
};

let _instances = [] as { name: string, instance: any }[];

export interface Message {
    tier: any;
    name: string;
    value: any;
    store?: any;
}

let messages = [] as Message[];

function construct(constructor: Function, args: any[]) {
    args = [null].concat(args);
    const factoryFunction = constructor.bind.apply(constructor, args);
    return new factoryFunction();
}

export function state(constructor: Function) {
    const name = (constructor as any).name;
    console.log("state: " + name);
    _states.push(constructor);

    var new_constructor = ((...args: any[]) => {
        const instance = construct(constructor, args);
        console.log("instance: " + instance.constructor.name);
        _instances.push({ name, instance });

        return new Proxy({}, {
            get(target: Object, name: string) {
                if (name === "dispose")
                    return () => {
                        console.log("dispose: " + instance.constructor.name);
                        var l = _instances.length;
                        _instances = _instances.filter(i => i.instance !== instance);
                        if (_instances.length - l == 0)
                            console.log("disposed 0 from " + JSON.stringify(_instances));

                        console.log("disposed " + (l - _instances.length));

                        if (instance.dispose)
                            instance.dispose();
                    };
                console.log("getting " + name + " from " + JSON.stringify(instance));
                return instance[name];
            }
        });
    });
    new_constructor.prototype = constructor.prototype;
    return new_constructor as any as void;
}

export function dispatch(tier: any, actionName: string, args: any[], propogate = true) {
    console.log("dispatch: " + actionName + "(" + JSON.stringify(args).slice(1, -1) + ")");

    if (propogate)
        queue("action", { tier, name: actionName, value: args });

    const instances = _instances.filter(i => i.instance.tier === tier);
    console.log("looking for instance of action. " + instances.length + " total instances of actions");
    for (const instance_info of instances.filter(i => typeof i.instance[actionName] === "function")) {
        var instance = instance_info.instance;
        dispatchTo(instance, tier, instance_info.name, instance[actionName] as Function, args);
    }
}

function withoutTier(o: Object) {
    const value = JSON.parse(JSON.stringify(o));
    delete value.tier;
    return value;
}

function dispatchTo(instance: IInstance, from_tier: any, name: string, fn: Function, args: any[]) {
    console.log("=> " + name);
    const old = JSON.stringify(withoutTier(instance));

    fn.apply(instance, args);

    const value = withoutTier(instance);

    if (old !== JSON.stringify(value)) {
        let version = instance.version;
        console.log("new version from " + version);
        instance.version = (version || 0) + 1;
        value.version = instance.version;
        console.log("to " + instance.version);
        queue("change", { tier: from_tier, store: name, name: "setAll", value });

        console.log("message: " + JSON.stringify(messages[messages.length - 1]));
    }
}

function queue(reason: string, message: any) {
    console.log("queueing message because " + reason + ": " + JSON.stringify(message));
    messages.push(message);
}

export function messagesFor(sv: any[][]) {
    messages.splice(0, messages.length);

    for (const instance_info of _instances)
        if (sv.filter(v => v[0] === instance_info.name && v[1] >= (instance_info.instance.version || 0)).length)
            queue("change (initial)", { tier: instance_info.instance.tier, store: instance_info.name, name: "setAll", value: instance_info.instance });
}

export function getStoreVersions() {
    return _instances.map(instance => ({
        name: instance.name,
        version: instance.instance.version || 0
    }));
}

export function ActionsAt(tier: any): any {
    return new Proxy({}, {
        get(target: Object, name: string) {
            if (name === "toJSON")
                return () =>
                    "[Proxy]";
            if (name === "inspect")
                return () =>
                    "[Proxyinspect]";

            return (...args: any[]) =>
                dispatch(tier, name, args);
        }
    });
}

export function getMessagesToSend(tier: any = null) {
    console.log("getMessagesFrom: " + tier + " have " + messages.length + " queued messages");
    const result = messages.filter(m => tier == null || m.tier === tier);
    messages = messages.filter(m => tier != null && m.tier !== tier);
    return result.length ? result : null;
}

export function gotMessages(tier: any, messages: Message[]) {
    console.log("gotMessages at tier " + tier + ": " + messages.length + " messages");
    for (var m of messages)
        if (m.name === "setAll" && m.store) {
            const stores = _instances.filter(i => i.name === m.store && i.instance.tier === tier);
            for (var key in m.value)
                if (m.value.hasOwnProperty(key))
                    for (const store of stores)
                        store.instance[key] = m.value[key];

        } else
            dispatch(tier, m.name, m.value, false);
}

export class TieredState<T> {
    constructor(public tier: T) { }
}