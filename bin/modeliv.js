"use strict";
var _states = [];
var _actions = [];
var _instances = [];
function state(constructor) {
    console.log("state: " + constructor.name);
    _states.push(constructor);
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var args = [null].concat(args);
        var factoryFunction = constructor.bind.apply(constructor, args);
        var t = new factoryFunction();
        return new Proxy({}, {
            get: function (target, name) {
                console.log("getting " + name + " from " + JSON.stringify(t));
                return target[name];
            }
        });
        //        constructor(args);
    });
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
function dispatch(tier, actionName, args) {
    console.log("dispatch: " + actionName + "(" + JSON.stringify(args).slice(1, -1) + ")");
    var actions = _actions.filter(function (a) { return a.name === actionName; });
    if (!actions.length)
        throw new Error("Unknown action: " + actionName);
    var _loop_1 = function(action) {
        console.log("looking for instance of action. " + _instances.length + " total instances of actions");
        var instances = _instances.filter(function (i) { return i.instance.constructor === action.target.constructor; });
        for (var _i = 0, _a = instances.filter(function (i) { return i.instance.tier === tier; }); _i < _a.length; _i++) {
            var instance = _a[_i];
            console.log("=> " + instance.name);
            var old = JSON.stringify(instance.instance.getAll());
            instance.instance[action.name].apply(instance.instance, args);
            var value = instance.instance.getAll();
            if (old !== JSON.stringify(value)) {
                console.log("new version from " + instance.instance.version);
                value.version = instance.instance.version = (instance.instance.version || 0) + 1;
                console.log("to " + instance.instance.version);
                messages.push({ store: instance.name, action: "setAll", value: value });
                console.log("message: " + JSON.stringify(messages[messages.length - 1]));
            }
        }
    };
    for (var _b = 0, actions_1 = actions; _b < actions_1.length; _b++) {
        var action = actions_1[_b];
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
function dispose(name, instance) {
    console.log("dispose: " + instance.constructor.name);
    _instances = _instances.filter(function (i) { return i.name !== name || i.instance !== instance; });
}
exports.dispose = dispose;
exports.ActionsProxy = function (tier) { return new Proxy({}, {
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
            return dispatch(tier, name, args);
        };
    }
}); };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxpdi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbGl2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbkIsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBRXBCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUVwQixlQUFzQixXQUFxQjtJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBSSxXQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFHMUIsTUFBTSxDQUFZLENBQUM7UUFBQyxjQUFjO2FBQWQsV0FBYyxDQUFkLHNCQUFjLENBQWQsSUFBYztZQUFkLDZCQUFjOztRQUU5QixJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLEdBQUksSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUUvQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ2pCLEdBQUcsWUFBQyxNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1NBQ0osQ0FBQyxDQUFDO1FBR0gsNEJBQTRCO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXJCZSxhQUFLLFFBcUJwQixDQUFBO0FBRUQsZ0JBQXVCLE1BQWMsRUFBRSxJ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