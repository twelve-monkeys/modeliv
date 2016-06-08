(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	var _states = [];
	;
	var _instances = [];
	var messages = [];
	function construct(constructor, args) {
	    args = [null].concat(args);
	    var factoryFunction = constructor.bind.apply(constructor, args);
	    return new factoryFunction();
	}
	function state(constructor) {
	    var name = constructor.name;
	    console.log("state: " + name);
	    _states.push(constructor);
	    var new_constructor = (function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        var instance = construct(constructor, args);
	        console.log("instance: " + instance.constructor.name);
	        _instances.push({ name: name, instance: instance });
	        return new Proxy({}, {
	            get: function (target, name) {
	                if (name === "dispose")
	                    return function () {
	                        console.log("dispose: " + instance.constructor.name);
	                        var l = _instances.length;
	                        _instances = _instances.filter(function (i) { return i.instance !== instance; });
	                        if (_instances.length - l == 0)
	                            console.log("disposed 0 from: " + JSON.stringify(_instances));
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
	    return new_constructor;
	}
	exports.state = state;
	function dispatch(tier, actionName, args, propogate) {
	    if (propogate === void 0) { propogate = true; }
	    console.log("dispatch: " + actionName + "(" + JSON.stringify(args).slice(1, -1) + ")");
	    if (propogate)
	        queue("action", { tier: tier, name: actionName, value: args });
	    var instances = _instances.filter(function (i) { return i.instance.tier === tier; });
	    console.log("looking for instance of action. " + instances.length + " total instances of actions");
	    for (var _i = 0, _a = instances.filter(function (i) { return typeof i.instance[actionName] === "function"; }); _i < _a.length; _i++) {
	        var instance_info = _a[_i];
	        var instance = instance_info.instance;
	        dispatchTo(instance, tier, instance_info.name, instance[actionName], args);
	    }
	}
	exports.dispatch = dispatch;
	function withoutTier(o) {
	    var value = JSON.parse(JSON.stringify(o));
	    delete value.tier;
	    return value;
	}
	function dispatchTo(instance, from_tier, name, fn, args) {
	    console.log("=> " + name);
	    var old = JSON.stringify(withoutTier(instance));
	    fn.apply(instance, args);
	    var value = withoutTier(instance);
	    if (old !== JSON.stringify(value)) {
	        var version = instance.version;
	        console.log("new version from " + version);
	        instance.version = (version || 0) + 1;
	        value.version = instance.version;
	        console.log("to " + instance.version);
	        queue("change", { tier: from_tier, store: name, name: "setAll", value: value });
	        console.log("message: " + JSON.stringify(messages[messages.length - 1]));
	    }
	}
	function queue(reason, message) {
	    console.log("queueing message because " + reason + ": " + JSON.stringify(message));
	    messages.push(message);
	}
	function messagesFor(sv) {
	    messages.splice(0, messages.length);
	    var _loop_1 = function(instance_info) {
	        if (sv.filter(function (v) { return v[0] === instance_info.name && v[1] >= (instance_info.instance.version || 0); }).length)
	            queue("change (initial)", { tier: instance_info.instance.tier, store: instance_info.name, name: "setAll", value: instance_info.instance });
	    };
	    for (var _i = 0, _instances_1 = _instances; _i < _instances_1.length; _i++) {
	        var instance_info = _instances_1[_i];
	        _loop_1(instance_info);
	    }
	}
	exports.messagesFor = messagesFor;
	function getStoreVersions() {
	    return _instances.map(function (instance) { return ({
	        name: instance.name,
	        version: instance.instance.version || 0
	    }); });
	}
	exports.getStoreVersions = getStoreVersions;
	function ActionsAt(tier) {
	    return new Proxy({}, {
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
	    });
	}
	exports.ActionsAt = ActionsAt;
	function getMessagesToSend(tier) {
	    if (tier === void 0) { tier = null; }
	    console.log("getMessagesFrom: " + tier + " have " + messages.length + " queued messages");
	    var result = messages.filter(function (m) { return tier == null || m.tier === tier; });
	    messages = messages.filter(function (m) { return tier != null && m.tier !== tier; });
	    return result.length ? result : null;
	}
	exports.getMessagesToSend = getMessagesToSend;
	function gotMessages(tier, messages) {
	    console.log("gotMessages at tier " + tier + ": " + messages.length + " messages");
	    for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
	        var m = messages_1[_i];
	        if (m.name === "setAll" && m.store) {
	            var stores = _instances.filter(function (i) { return i.name === m.store && i.instance.tier === tier; });
	            for (var key in m.value)
	                if (m.value.hasOwnProperty(key))
	                    for (var _a = 0, stores_1 = stores; _a < stores_1.length; _a++) {
	                        var store = stores_1[_a];
	                        store.instance[key] = m.value[key];
	                    }
	        }
	        else
	            dispatch(tier, m.name, m.value, false);
	    }
	}
	exports.gotMessages = gotMessages;
	var TieredState = (function () {
	    function TieredState(tier) {
	        this.tier = tier;
	    }
	    return TieredState;
	}());
	exports.TieredState = TieredState;


/***/ }
/******/ ])));
//# sourceMappingURL=modeliv.entry.js.map
//# sourceURL=modeliv.entry.ts