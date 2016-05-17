"use strict";
var _states = [];
var _actions = [];
var _instances = [];
function state(constructor) {
    console.log("state: " + constructor.name);
    _states.push(constructor);
}
exports.state = state;
function server(target, name, descriptor) {
    console.log("action: " + name);
    _actions.push({ target: target, name: name, descriptor: descriptor });
    // return descriptor;
    // if(!_states.any(c => c == target))
    //     throw new Error("@action must be delcared on a method inside a @state class");
}
exports.server = server;
var messages = [];
function dispatch(actionName, args) {
    console.log("dispatch: " + actionName + "(" + JSON.stringify(args).slice(1, -1) + ")");
    var actions = _actions.filter(function (a) { return a.name === actionName; });
    if (!actions.length)
        throw new Error("Unknown action: " + actionName);
    var _loop_1 = function(action) {
        console.log("looking for instance of action. " + _instances.length + " total instances of actions");
        var instances = _instances.filter(function (i) { return i.instance.constructor === action.target.constructor; });
        for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
            var instance = instances_1[_i];
            console.log("=> " + instance.name);
            var old = JSON.stringify(instance.instance.getAll());
            instance.instance[action.name].apply(instance.instance, args);
            var value = instance.instance.getAll();
            if (old !== JSON.stringify(value)) {
                console.log("new version from " + instance.instance.version);
                value.version = instance.instance.version = (instance.instance.version || 0) + 1;
                console.log("to " + instance.instance.version);
                console.log("yes " + value.version);
                messages.push({ store: instance.name, action: "setAll", value: value });
                console.log("message: " + JSON.stringify(messages[messages.length - 1]));
            }
        }
    };
    for (var _a = 0, actions_1 = actions; _a < actions_1.length; _a++) {
        var action = actions_1[_a];
        _loop_1(action);
    }
}
function messagesFor(sv) {
    messages.splice(0, messages.length);
    for (var _i = 0, _instances_1 = _instances; _i < _instances_1.length; _i++) {
        var instance = _instances_1[_i];
        var existing_version = instance.instance.version || 0;
        var has_already = false;
        for (var _a = 0, sv_1 = sv; _a < sv_1.length; _a++) {
            var store_version = sv_1[_a];
            var store = store_version[0];
            var version = store_version[1];
            if (store === instance.name && version >= existing_version)
                has_already = true;
        }
        if (has_already)
            continue;
        var value = instance.instance.getAll();
        messages.push({ store: instance.name, action: "setAll", value: value });
    }
}
exports.messagesFor = messagesFor;
function getStoreVersions() {
    var result = [];
    for (var _i = 0, _instances_2 = _instances; _i < _instances_2.length; _i++) {
        var instance = _instances_2[_i];
        result.push({ name: instance.name, version: instance.instance.version || 0 });
    }
    return result;
}
exports.getStoreVersions = getStoreVersions;
function actions(name, instance) {
    console.log("instance: " + instance.constructor.name);
    _instances.push({ name: name, instance: instance });
}
exports.actions = actions;
exports.ActionsProxy = new Proxy({}, {
    get: function (target, name) {
        if (name === "toJSON")
            return function () {
                return "[Proxy]";
            };
        if (name === "inspect")
            return function () {
                return "[Proxyinspect]";
            };
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return dispatch(name, args);
        };
    }
});
function nextMessageToSend() {
    return messages.length ? messages.shift() : null;
}
exports.nextMessageToSend = nextMessageToSend;
function message(message) {
    for (var _i = 0, _instances_3 = _instances; _i < _instances_3.length; _i++) {
        var instance = _instances_3[_i];
        if (instance.name === message.store) {
            var new_value = message.value;
            for (var key in new_value)
                if (new_value.hasOwnProperty(key))
                    instance.instance[key] = new_value[key];
        }
    }
}
exports.message = message;
//# sourceMappingURL=modeliv.js.map