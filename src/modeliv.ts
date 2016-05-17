const _states = [];
const _actions = [];

const _instances = [];

export function state(constructor: Function) {
    //    console.log("state: " + (constructor as any).name);
    _states.push(constructor);
}

export function server(target: Object, name: string, descriptor: PropertyDescriptor) {
    //    console.log("action: " + name);
    _actions.push({ target, name, descriptor });
    // return descriptor;
    // if(!_states.any(c => c == target))
    //     throw new Error("@action must be delcared on a method inside a @state class");
}

const messages = [];

function dispatch(actionName: string, args: any[]) {
    console.log("dispatch: " + actionName + "(" + JSON.stringify(args).slice(1, -1) + ")");
    const actions = _actions.filter(a => a.name === actionName);
    if (!actions.length)
        throw new Error("Unknown action: " + actionName);

    for (const action of actions) {
        console.log("looking for instance of action. " + _instances.length + " total instances of actions");
        const instances = _instances.filter(i => i.instance.constructor === action.target.constructor);
        for (const instance of instances) {
            console.log("=> " + instance.name);
            const old = JSON.stringify(instance.instance.getAll());
            instance.instance[action.name].apply(instance.instance, args);
            const value = instance.instance.getAll();
            if (old !== JSON.stringify(value)) {
                console.log("new version from " + instance.instance.version);
                value.version = instance.instance.version = (instance.instance.version || 0) + 1;
                console.log("to " + instance.instance.version);
                console.log("yes " + value.version);
                messages.push({ store: instance.name, action: "setAll", value });
                console.log("message: " + JSON.stringify(messages[messages.length - 1]));
            }
        }
    }
}

export function messagesFor(sv: any[][]) {
    messages.splice(0, messages.length);

    for (const instance of _instances) {
        const existing_version = instance.instance.version || 0;
        let has_already = false;
        for (const  store_version of sv) {
            const store = store_version[0];
            const version = store_version[1];
            if (store === instance.name && version >= existing_version)
                has_already = true;
        }

        if (has_already)
            continue;
        const value = instance.instance.getAll();
        messages.push({ store: instance.name, action: "setAll", value });
    }
}

export function getStoreVersions() {
    const result = [];
    for (const instance of _instances)
        result.push({ name: instance.name, version: instance.instance.version || 0 });
    return result;
}

export function actions(name: string, instance: any) {
    //    console.log("instance: " + instance.constructor.name);
    _instances.push({ name, instance });
}

declare class Proxy {
    constructor(object, handler);
}

export const ActionsProxy = <any>new Proxy({}, {
    get(target, name) {
        if (name === "toJSON")
            return () =>
                "[Proxy]";
        if (name === "inspect")
            return () =>
                "[Proxyinspect]";

        return (...args: any[]) =>
            dispatch(name, args);
    }
});

export function nextMessageToSend() {
    return messages.length ? messages.shift() : null;
}

export function message(message) {
    for (const instance of _instances)
        if (instance.name === message.store) {
            const new_value = message.value;
            for (const key in new_value)
                if (new_value.hasOwnProperty(key))
                    instance.instance[key] = new_value[key];
        }
}