/******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	module.exports = __webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	describe("a model", function () {
	    var x;
	    it("exists", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            expect(x.client).not.toBeNull();
	            expect(x.server).not.toBeNull();
	        });
	    });
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var store_1 = __webpack_require__(3);
	var modeliv_entry_1 = __webpack_require__(4);
	exports.ActionsClient = modeliv_entry_1.ActionsAt("client");
	exports.ActionsServer = modeliv_entry_1.ActionsAt("server");
	function using(item, fn) {
	    try {
	        fn();
	    }
	    finally {
	        item.dispose();
	    }
	}
	exports.using = using;
	var ClientServerStatesForTesting = (function () {
	    function ClientServerStatesForTesting() {
	        this.client = new store_1.ClientState("client");
	        this.server = new store_1.ClientState("server");
	        modeliv_entry_1.getMessagesToSend();
	    }
	    ClientServerStatesForTesting.prototype.dispose = function () {
	        modeliv_entry_1.getMessagesToSend();
	        this.client.dispose();
	        this.server.dispose();
	    };
	    return ClientServerStatesForTesting;
	}());
	exports.ClientServerStatesForTesting = ClientServerStatesForTesting;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var modeliv_entry_1 = __webpack_require__(4);
	var ClientState = (function (_super) {
	    __extends(ClientState, _super);
	    function ClientState() {
	        _super.apply(this, arguments);
	        this.is_logged_in = false;
	        this.projects = [];
	    }
	    ClientState.prototype.login = function (name, password) {
	        if (this.tier === "client")
	            return;
	        console.log("login");
	        if ("password for " + name === password) {
	            this.is_logged_in = true;
	            this.projects = [{ guid: 'guid_1', name: 'project 1', path: 'c:/' }];
	            this.current_project_guid;
	        }
	    };
	    ClientState.prototype.logout = function () {
	        this.is_logged_in = false;
	        this.projects = [];
	    };
	    ClientState.prototype.selectProject = function (guid) {
	        if (this.tier === "server")
	            return;
	        this.current_project_guid = guid;
	    };
	    ClientState.prototype.setProjects = function (projects) {
	        if (this.tier === "client")
	            return;
	        console.log("setProjects");
	        this.projects = projects;
	    };
	    ClientState = __decorate([
	        modeliv_entry_1.state
	    ], ClientState);
	    return ClientState;
	}(modeliv_entry_1.TieredState));
	exports.ClientState = ClientState;


/***/ },
/* 4 */
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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	describe("a model", function () {
	    var x;
	    it("has default values", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            expect(x.client.is_logged_in).toBe(false);
	            expect(x.client.projects).toEqual([]);
	        });
	    });
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	var modeliv_entry_1 = __webpack_require__(4);
	describe("a model", function () {
	    var x;
	    it("can apply actions from other tiers", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsClient.login("a", "password for a");
	            var client_messages = modeliv_entry_1.getMessagesToSend("client");
	            modeliv_entry_1.gotMessages("server", [client_messages[0]]);
	            expect(x.server.is_logged_in).toBeTruthy();
	        });
	    });
	});
	// lib.messagesFor(request.url.slice("api://messages".length + 1).split('&').map(sv => sv.split('=')));
	// function main() {
	//   var message = lib.getMessagesFrom();
	//   if (message) {
	//     var response = JSON.stringify(message);
	//     console.log("sending message: " + response);
	//     callback({ charset: 'utf-8', mimeType: 'application/json', data: new Buffer(response) });
	//     return;
	//   }
	//   setTimeout(main);
	// }
	// main(); 


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	var modeliv_entry_1 = __webpack_require__(4);
	describe("a model", function () {
	    var x;
	    it("can apply changes from other tiers", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsServer.login("a", "password for a");
	            var messages = modeliv_entry_1.getMessagesToSend("server");
	            console.log(JSON.stringify(messages));
	            modeliv_entry_1.gotMessages("client", messages);
	            expect(x.client.is_logged_in).toBeTruthy();
	        });
	    });
	});
	// lib.messagesFor(request.url.slice("api://messages".length + 1).split('&').map(sv => sv.split('=')));
	// function main() {
	//   var message = lib.getMessagesFrom();
	//   if (message) {
	//     var response = JSON.stringify(message);
	//     console.log("sending message: " + response);
	//     callback({ charset: 'utf-8', mimeType: 'application/json', data: new Buffer(response) });
	//     return;
	//   }
	//   setTimeout(main);
	// }
	// main(); 


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	describe("a model", function () {
	    var x;
	    it("can be updated by an action", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsServer.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
	            expect(x.server.projects.length).toBe(1);
	            expect(x.server.projects[0].guid).toBe('g1');
	        });
	    });
	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	describe("a model", function () {
	    var x;
	    it("can execute an action", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsClient.login("a", "password for a");
	            lib_1.ActionsServer.login("a", "password for a");
	            expect(x.client.is_logged_in).toBe(false);
	            expect(x.server.is_logged_in).toBe(true);
	        });
	    });
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	describe("a model", function () {
	    var x;
	    it("is not a singleton", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            expect(x.client.tier).toBe("client");
	            expect(x.server.tier).toBe("server");
	        });
	    });
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	describe("a model", function () {
	    var x;
	    it("is only called for actions of the same tier", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsServer.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
	            expect(x.server.projects.length).toBe(1);
	            expect(x.server.projects[0].guid).toBe('g1');
	            expect(x.client.projects.length).toBe(0);
	        });
	    });
	});


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	describe("a model", function () {
	    var x;
	    it("is readonly", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            x.client.is_logged_in = true;
	            expect(x.client.is_logged_in).toBe(false);
	        });
	    });
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	var modeliv_entry_1 = __webpack_require__(4);
	describe("a model", function () {
	    var x;
	    it("messages are generated for actions", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsClient.login("a", "password for a");
	            var client_messages = modeliv_entry_1.getMessagesToSend("client");
	            var client_message = client_messages[0];
	            expect(client_message).toBeTruthy();
	            expect(client_message.tier).toBe("client");
	            expect(client_message.name).toBe("login");
	            expect(client_message.value).toEqual(["a", "password for a"]);
	        });
	    });
	});
	// lib.messagesFor(request.url.slice("api://messages".length + 1).split('&').map(sv => sv.split('=')));
	// function main() {
	//   var message = lib.getMessagesFrom();
	//   if (message) {
	//     var response = JSON.stringify(message);
	//     console.log("sending message: " + response);
	//     callback({ charset: 'utf-8', mimeType: 'application/json', data: new Buffer(response) });
	//     return;
	//   }
	//   setTimeout(main);
	// }
	// main(); 


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(2);
	var modeliv_entry_1 = __webpack_require__(4);
	describe("a model", function () {
	    var x;
	    it("messages are generated for changes", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsServer.login("a", "password for a");
	            var client_messages = modeliv_entry_1.getMessagesToSend("client");
	            expect(client_messages).toBeNull();
	            var server_messages = modeliv_entry_1.getMessagesToSend("server");
	            var message = server_messages[1];
	            expect(message).toBeTruthy();
	            expect(message.tier).toBe("server");
	            expect(message.name).toBe("setAll");
	            expect(JSON.stringify(message.value)).toBe(JSON.stringify({ is_logged_in: true, projects: [{ guid: 'guid_1', name: 'project 1', path: 'c:/' }], version: 1 }));
	        });
	    });
	});
	// lib.messagesFor(request.url.slice("api://messages".length + 1).split('&').map(sv => sv.split('=')));
	// function main() {
	//   var message = lib.getMessagesFrom();
	//   if (message) {
	//     var response = JSON.stringify(message);
	//     console.log("sending message: " + response);
	//     callback({ charset: 'utf-8', mimeType: 'application/json', data: new Buffer(response) });
	//     return;
	//   }
	//   setTimeout(main);
	// }
	// main(); 


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODdiZTY2YWFjNmU3MjAxNTExNTciLCJ3ZWJwYWNrOi8vL3Rlc3RzL2EubW9kZWwuZXhpc3RzLnNwZWMudHMiLCJ3ZWJwYWNrOi8vL3Rlc3RzL2xpYi50cyIsIndlYnBhY2s6Ly8vdGVzdHMvc3RvcmUudHMiLCJ3ZWJwYWNrOi8vL21vZGVsaXYuZW50cnkudHMiLCJ3ZWJwYWNrOi8vL3Rlc3RzL2EubW9kZWwuaGFzLnZhbHVlcy5zcGVjLnRzIiwid2VicGFjazovLy90ZXN0cy9jYW4gYXBwbHkgYWN0aW9ucyBmcm9tIG90aGVyIHRpZXJzLnNwZWMudHMiLCJ3ZWJwYWNrOi8vL3Rlc3RzL2NhbiBhcHBseSBjaGFuZ2VzIGZyb20gb3RoZXIgdGllcnMuc3BlYy50cyIsIndlYnBhY2s6Ly8vdGVzdHMvY2FuIGJlIHVwZGF0ZWQgYnkgYW4gYWN0aW9uLnNwZWMudHMiLCJ3ZWJwYWNrOi8vL3Rlc3RzL2NhbiBleGVjdXRlIGFuIGFjdGlvbi5zcGVjLnRzIiwid2VicGFjazovLy90ZXN0cy9pcyBub3QgYSBzaW5nbGV0b24uc3BlYy50cyIsIndlYnBhY2s6Ly8vdGVzdHMvaXMgb25seSBjYWxsZWQgZm9yIGFjdGlvbnMgb2YgdGhlIHNhbWUgdGllci5zcGVjLnRzIiwid2VicGFjazovLy90ZXN0cy9pcyByZWFkb25seS5zcGVjLnRzIiwid2VicGFjazovLy90ZXN0cy9tZXNzYWdlcyBhcmUgZ2VuZXJhdGVkIGZvciBhY3Rpb25zLnNwZWMudHMiLCJ3ZWJwYWNrOi8vL3Rlc3RzL21lc3NhZ2VzIGFyZSBnZW5lcmF0ZWQgZm9yIGNoYW5nZXMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7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LENBQUMsQ0FBQzthQUUzQyxJQUFNLGVBQWUsR0FBRyxpQ0FBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNwRCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFFbkMsSUFBTSxlQUFlLEdBQUcsaUNBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEQsSUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNwQyxNQUFNLENBQUUsT0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxPQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFlBQVksRUFBRyxJQUFJLEVBQUUsUUFBUSxFQUFHLENBQUUsRUFBRSxJQUFJLEVBQUcsUUFBUSxFQUFFLElBQUksRUFBRyxXQUFXLEVBQUUsSUFBSSxFQUFHLEtBQUssRUFBRSxDQUFFLEVBQUUsT0FBTyxFQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNwTCxDQUFDLENBQUM7S0FDTixDQUFDLENBQUMsQ0FBQztBQUNQLEVBQUMsQ0FBQyxDQUFDO0FBQ0ssd0dBQXVHO0FBR3ZHLHFCQUFvQjtBQUNwQiwwQ0FBeUM7QUFDekMsb0JBQW1CO0FBQ25CLCtDQUE4QztBQUM5QyxvREFBbUQ7QUFDbkQsaUdBQWdHO0FBQ2hHLGVBQWM7QUFDZCxPQUFNO0FBRU4sdUJBQXNCO0FBQ3RCLEtBQUk7QUFFSixXQUFVIiwiZmlsZSI6Ijg3YmU2NmFhYzZlNzIwMTUxMTU3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4N2JlNjZhYWM2ZTcyMDE1MTE1N1xuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqYXNtaW5lLmQudHNcIi8+XHJcbmltcG9ydCB7dXNpbmcsIENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3Rpbmd9IGZyb20gXCIuL2xpYlwiO1xyXG5cclxuZGVzY3JpYmUoXCJhIG1vZGVsXCIsICgpID0+IHtcclxuICAgIGxldCB4OiBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nO1xyXG5cclxuICAgIGl0KFwiZXhpc3RzXCIsICgpID0+IHtcclxuICAgICAgICB1c2luZyh4ID0gbmV3IENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3RpbmcoKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoeC5jbGllbnQpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgICAgICBleHBlY3QoeC5zZXJ2ZXIpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogdGVzdHMvYS5tb2RlbC5leGlzdHMuc3BlYy50c1xuICoqLyIsImltcG9ydCB7Q2xpZW50U3RhdGUsIFVzZXJBY3Rpb25zfSBmcm9tIFwiLi9zdG9yZVwiO1xyXG5pbXBvcnQge2dldE1lc3NhZ2VzVG9TZW5kLCBBY3Rpb25zQXR9IGZyb20gXCIuLi9tb2RlbGl2LmVudHJ5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQWN0aW9uc0NsaWVudCA9IEFjdGlvbnNBdChcImNsaWVudFwiKSBhcyBVc2VyQWN0aW9ucztcclxuZXhwb3J0IGNvbnN0IEFjdGlvbnNTZXJ2ZXIgPSBBY3Rpb25zQXQoXCJzZXJ2ZXJcIikgYXMgVXNlckFjdGlvbnM7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNpbmcoaXRlbToge2Rpc3Bvc2UoKTp2b2lkfSwgZm46IEZ1bmN0aW9uKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBmbigpOyAgXHJcbiAgICB9IGZpbmFsbHl7XHJcbiAgICAgICAgaXRlbS5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nIHtcclxuICAgICBjbGllbnQ6IENsaWVudFN0YXRlO1xyXG4gICAgIHNlcnZlcjogQ2xpZW50U3RhdGU7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudFN0YXRlKFwiY2xpZW50XCIpO1xyXG4gICAgICAgIHRoaXMuc2VydmVyID0gbmV3IENsaWVudFN0YXRlKFwic2VydmVyXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGdldE1lc3NhZ2VzVG9TZW5kKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgZ2V0TWVzc2FnZXNUb1NlbmQoKTtcclxuICAgICAgICBcclxuICAgICAgICAodGhpcy5jbGllbnQgYXMgYW55KS5kaXNwb3NlKCk7XHJcbiAgICAgICAgKHRoaXMuc2VydmVyIGFzIGFueSkuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogdGVzdHMvbGliLnRzXG4gKiovIiwiaW1wb3J0IHsgc3RhdGUsIEFjdGlvbnNBdCwgVGllcmVkU3RhdGUgfSBmcm9tIFwiLi4vbW9kZWxpdi5lbnRyeVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgdGllcnMgID0gXCJjbGllbnRcIiB8IFwic2VydmVyXCIgfCBcInRhaWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXNlckFjdGlvbnMge1xyXG4gICAgbG9naW4obmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTp2b2lkO1xyXG4gICAgbG9nb3V0KCk6dm9pZDtcclxuICAgIHNldFByb2plY3RzKHByb2plY3RzOiBQcm9qZWN0W10pOnZvaWQ7XHJcbiAgICBzZWxlY3RQcm9qZWN0KGd1aWQ6IHN0cmluZyk6dm9pZDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0IHtcclxuICAgIGd1aWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHBhdGg6IHN0cmluZztcclxuICAgIGl0ZW1zPzogYW55W107XHJcbn1cclxuXHJcbkBzdGF0ZVxyXG4gZXhwb3J0IGNsYXNzIENsaWVudFN0YXRlIGV4dGVuZHMgVGllcmVkU3RhdGU8dGllcnM+IGltcGxlbWVudHMgVXNlckFjdGlvbnMge1xyXG4gICAgaXNfbG9nZ2VkX2luID0gZmFsc2U7XHJcbiAgICBwcm9qZWN0czogUHJvamVjdFtdID0gW107XHJcbiAgICBjdXJyZW50X3Byb2plY3RfZ3VpZDogc3RyaW5nO1xyXG5cclxuICAgIGxvZ2luKG5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMudGllciA9PT0gXCJjbGllbnRcIilcclxuICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxvZ2luXCIpO1xyXG4gICAgICAgIGlmIChcInBhc3N3b3JkIGZvciBcIiArIG5hbWUgPT09IHBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNfbG9nZ2VkX2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFt7IGd1aWQ6ICdndWlkXzEnLCBuYW1lOiAncHJvamVjdCAxJywgcGF0aDogJ2M6LycgfV07XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudF9wcm9qZWN0X2d1aWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxvZ291dCgpIHtcclxuICAgICAgICB0aGlzLmlzX2xvZ2dlZF9pbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RQcm9qZWN0KGd1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHRoaXMudGllciA9PT0gXCJzZXJ2ZXJcIilcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jdXJyZW50X3Byb2plY3RfZ3VpZCA9IGd1aWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UHJvamVjdHMocHJvamVjdHM6IFByb2plY3RbXSkge1xyXG4gICAgICAgIGlmKHRoaXMudGllciA9PT0gXCJjbGllbnRcIilcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXRQcm9qZWN0c1wiKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB0ZXN0cy9zdG9yZS50c1xuICoqLyIsImRlY2xhcmUgY2xhc3MgUHJveHkge1xyXG4gICAgY29uc3RydWN0b3Iob2JqZWN0OiBPYmplY3QsIGhhbmRsZXI6IE9iamVjdCk7XHJcbn1cclxuXHJcbmNvbnN0IF9zdGF0ZXMgPSBbXSBhcyBGdW5jdGlvbltdO1xyXG5pbnRlcmZhY2UgSUluc3RhbmNlIHtcclxuICAgIHRpZXI6IGFueTtcclxuICAgIHZlcnNpb24/OiBudW1iZXI7XHJcbn07XHJcblxyXG5sZXQgX2luc3RhbmNlcyA9IFtdIGFzIHsgbmFtZTogc3RyaW5nLCBpbnN0YW5jZTogYW55IH1bXTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZSB7XHJcbiAgICB0aWVyOiBhbnk7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgc3RvcmU/OiBhbnk7XHJcbn1cclxuXHJcbmxldCBtZXNzYWdlcyA9IFtdIGFzIE1lc3NhZ2VbXTtcclxuXHJcbmZ1bmN0aW9uIGNvbnN0cnVjdChjb25zdHJ1Y3RvcjogRnVuY3Rpb24sIGFyZ3M6IGFueVtdKSB7XHJcbiAgICBhcmdzID0gW251bGxdLmNvbmNhdChhcmdzKTtcclxuICAgIGNvbnN0IGZhY3RvcnlGdW5jdGlvbiA9IGNvbnN0cnVjdG9yLmJpbmQuYXBwbHkoY29uc3RydWN0b3IsIGFyZ3MpO1xyXG4gICAgcmV0dXJuIG5ldyBmYWN0b3J5RnVuY3Rpb24oKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0YXRlKGNvbnN0cnVjdG9yOiBGdW5jdGlvbikge1xyXG4gICAgY29uc3QgbmFtZSA9IChjb25zdHJ1Y3RvciBhcyBhbnkpLm5hbWU7XHJcbiAgICBjb25zb2xlLmxvZyhcInN0YXRlOiBcIiArIG5hbWUpO1xyXG4gICAgX3N0YXRlcy5wdXNoKGNvbnN0cnVjdG9yKTtcclxuXHJcbiAgICB2YXIgbmV3X2NvbnN0cnVjdG9yID0gKCguLi5hcmdzOiBhbnlbXSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gY29uc3RydWN0KGNvbnN0cnVjdG9yLCBhcmdzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImluc3RhbmNlOiBcIiArIGluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG4gICAgICAgIF9pbnN0YW5jZXMucHVzaCh7IG5hbWUsIGluc3RhbmNlIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgICAgIGdldCh0YXJnZXQ6IE9iamVjdCwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gXCJkaXNwb3NlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaXNwb3NlOiBcIiArIGluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbCA9IF9pbnN0YW5jZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW5zdGFuY2VzID0gX2luc3RhbmNlcy5maWx0ZXIoaSA9PiBpLmluc3RhbmNlICE9PSBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaW5zdGFuY2VzLmxlbmd0aCAtIGwgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGlzcG9zZWQgMCBmcm9tIFwiICsgSlNPTi5zdHJpbmdpZnkoX2luc3RhbmNlcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkaXNwb3NlZCBcIiArIChsIC0gX2luc3RhbmNlcy5sZW5ndGgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5kaXNwb3NlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldHRpbmcgXCIgKyBuYW1lICsgXCIgZnJvbSBcIiArIEpTT04uc3RyaW5naWZ5KGluc3RhbmNlKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2VbbmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgbmV3X2NvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcclxuICAgIHJldHVybiBuZXdfY29uc3RydWN0b3IgYXMgYW55IGFzIHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwYXRjaCh0aWVyOiBhbnksIGFjdGlvbk5hbWU6IHN0cmluZywgYXJnczogYW55W10sIHByb3BvZ2F0ZSA9IHRydWUpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZGlzcGF0Y2g6IFwiICsgYWN0aW9uTmFtZSArIFwiKFwiICsgSlNPTi5zdHJpbmdpZnkoYXJncykuc2xpY2UoMSwgLTEpICsgXCIpXCIpO1xyXG5cclxuICAgIGlmIChwcm9wb2dhdGUpXHJcbiAgICAgICAgcXVldWUoXCJhY3Rpb25cIiwgeyB0aWVyLCBuYW1lOiBhY3Rpb25OYW1lLCB2YWx1ZTogYXJncyB9KTtcclxuXHJcbiAgICBjb25zdCBpbnN0YW5jZXMgPSBfaW5zdGFuY2VzLmZpbHRlcihpID0+IGkuaW5zdGFuY2UudGllciA9PT0gdGllcik7XHJcbiAgICBjb25zb2xlLmxvZyhcImxvb2tpbmcgZm9yIGluc3RhbmNlIG9mIGFjdGlvbi4gXCIgKyBpbnN0YW5jZXMubGVuZ3RoICsgXCIgdG90YWwgaW5zdGFuY2VzIG9mIGFjdGlvbnNcIik7XHJcbiAgICBmb3IgKGNvbnN0IGluc3RhbmNlX2luZm8gb2YgaW5zdGFuY2VzLmZpbHRlcihpID0+IHR5cGVvZiBpLmluc3RhbmNlW2FjdGlvbk5hbWVdID09PSBcImZ1bmN0aW9uXCIpKSB7XHJcbiAgICAgICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VfaW5mby5pbnN0YW5jZTtcclxuICAgICAgICBkaXNwYXRjaFRvKGluc3RhbmNlLCB0aWVyLCBpbnN0YW5jZV9pbmZvLm5hbWUsIGluc3RhbmNlW2FjdGlvbk5hbWVdIGFzIEZ1bmN0aW9uLCBhcmdzKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gd2l0aG91dFRpZXIobzogT2JqZWN0KSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobykpO1xyXG4gICAgZGVsZXRlIHZhbHVlLnRpZXI7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BhdGNoVG8oaW5zdGFuY2U6IElJbnN0YW5jZSwgZnJvbV90aWVyOiBhbnksIG5hbWU6IHN0cmluZywgZm46IEZ1bmN0aW9uLCBhcmdzOiBhbnlbXSkge1xyXG4gICAgY29uc29sZS5sb2coXCI9PiBcIiArIG5hbWUpO1xyXG4gICAgY29uc3Qgb2xkID0gSlNPTi5zdHJpbmdpZnkod2l0aG91dFRpZXIoaW5zdGFuY2UpKTtcclxuXHJcbiAgICBmbi5hcHBseShpbnN0YW5jZSwgYXJncyk7XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSB3aXRob3V0VGllcihpbnN0YW5jZSk7XHJcblxyXG4gICAgaWYgKG9sZCAhPT0gSlNPTi5zdHJpbmdpZnkodmFsdWUpKSB7XHJcbiAgICAgICAgbGV0IHZlcnNpb24gPSBpbnN0YW5jZS52ZXJzaW9uO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV3IHZlcnNpb24gZnJvbSBcIiArIHZlcnNpb24pO1xyXG4gICAgICAgIGluc3RhbmNlLnZlcnNpb24gPSAodmVyc2lvbiB8fCAwKSArIDE7XHJcbiAgICAgICAgdmFsdWUudmVyc2lvbiA9IGluc3RhbmNlLnZlcnNpb247XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0byBcIiArIGluc3RhbmNlLnZlcnNpb24pO1xyXG4gICAgICAgIHF1ZXVlKFwiY2hhbmdlXCIsIHsgdGllcjogZnJvbV90aWVyLCBzdG9yZTogbmFtZSwgbmFtZTogXCJzZXRBbGxcIiwgdmFsdWUgfSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibWVzc2FnZTogXCIgKyBKU09OLnN0cmluZ2lmeShtZXNzYWdlc1ttZXNzYWdlcy5sZW5ndGggLSAxXSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBxdWV1ZShyZWFzb246IHN0cmluZywgbWVzc2FnZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmxvZyhcInF1ZXVlaW5nIG1lc3NhZ2UgYmVjYXVzZSBcIiArIHJlYXNvbiArIFwiOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgIG1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXNzYWdlc0ZvcihzdjogYW55W11bXSkge1xyXG4gICAgbWVzc2FnZXMuc3BsaWNlKDAsIG1lc3NhZ2VzLmxlbmd0aCk7XHJcblxyXG4gICAgZm9yIChjb25zdCBpbnN0YW5jZV9pbmZvIG9mIF9pbnN0YW5jZXMpXHJcbiAgICAgICAgaWYgKHN2LmZpbHRlcih2ID0+IHZbMF0gPT09IGluc3RhbmNlX2luZm8ubmFtZSAmJiB2WzFdID49IChpbnN0YW5jZV9pbmZvLmluc3RhbmNlLnZlcnNpb24gfHwgMCkpLmxlbmd0aClcclxuICAgICAgICAgICAgcXVldWUoXCJjaGFuZ2UgKGluaXRpYWwpXCIsIHsgdGllcjogaW5zdGFuY2VfaW5mby5pbnN0YW5jZS50aWVyLCBzdG9yZTogaW5zdGFuY2VfaW5mby5uYW1lLCBuYW1lOiBcInNldEFsbFwiLCB2YWx1ZTogaW5zdGFuY2VfaW5mby5pbnN0YW5jZSB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0b3JlVmVyc2lvbnMoKSB7XHJcbiAgICByZXR1cm4gX2luc3RhbmNlcy5tYXAoaW5zdGFuY2UgPT4gKHtcclxuICAgICAgICBuYW1lOiBpbnN0YW5jZS5uYW1lLFxyXG4gICAgICAgIHZlcnNpb246IGluc3RhbmNlLmluc3RhbmNlLnZlcnNpb24gfHwgMFxyXG4gICAgfSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQWN0aW9uc0F0KHRpZXI6IGFueSk6IGFueSB7XHJcbiAgICByZXR1cm4gbmV3IFByb3h5KHt9LCB7XHJcbiAgICAgICAgZ2V0KHRhcmdldDogT2JqZWN0LCBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwidG9KU09OXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT5cclxuICAgICAgICAgICAgICAgICAgICBcIltQcm94eV1cIjtcclxuICAgICAgICAgICAgaWYgKG5hbWUgPT09IFwiaW5zcGVjdFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgXCJbUHJveHlpbnNwZWN0XVwiO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT5cclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHRpZXIsIG5hbWUsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWVzc2FnZXNUb1NlbmQodGllcjogYW55ID0gbnVsbCkge1xyXG4gICAgY29uc29sZS5sb2coXCJnZXRNZXNzYWdlc0Zyb206IFwiICsgdGllciArIFwiIGhhdmUgXCIgKyBtZXNzYWdlcy5sZW5ndGggKyBcIiBxdWV1ZWQgbWVzc2FnZXNcIik7XHJcbiAgICBjb25zdCByZXN1bHQgPSBtZXNzYWdlcy5maWx0ZXIobSA9PiB0aWVyID09IG51bGwgfHwgbS50aWVyID09PSB0aWVyKTtcclxuICAgIG1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKG0gPT4gdGllciAhPSBudWxsICYmIG0udGllciAhPT0gdGllcik7XHJcbiAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IG51bGw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnb3RNZXNzYWdlcyh0aWVyOiBhbnksIG1lc3NhZ2VzOiBNZXNzYWdlW10pIHtcclxuICAgIGNvbnNvbGUubG9nKFwiZ290TWVzc2FnZXMgYXQgdGllciBcIiArIHRpZXIgKyBcIjogXCIgKyBtZXNzYWdlcy5sZW5ndGggKyBcIiBtZXNzYWdlc1wiKTtcclxuICAgIGZvciAodmFyIG0gb2YgbWVzc2FnZXMpXHJcbiAgICAgICAgaWYgKG0ubmFtZSA9PT0gXCJzZXRBbGxcIiAmJiBtLnN0b3JlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlcyA9IF9pbnN0YW5jZXMuZmlsdGVyKGkgPT4gaS5uYW1lID09PSBtLnN0b3JlICYmIGkuaW5zdGFuY2UudGllciA9PT0gdGllcik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgaWYgKG0udmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHN0b3JlIG9mIHN0b3JlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUuaW5zdGFuY2Vba2V5XSA9IG0udmFsdWVba2V5XTtcclxuXHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHRpZXIsIG0ubmFtZSwgbS52YWx1ZSwgZmFsc2UpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGllcmVkU3RhdGU8VD4ge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRpZXI6IFQpIHsgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogbW9kZWxpdi5lbnRyeS50c1xuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqYXNtaW5lLmQudHNcIi8+XHJcbmltcG9ydCB7dXNpbmcsIENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3Rpbmd9IGZyb20gXCIuL2xpYlwiO1xyXG5cclxuZGVzY3JpYmUoXCJhIG1vZGVsXCIsICgpID0+IHtcclxuICAgIGxldCB4OiBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nO1xyXG5cclxuICAgIGl0KFwiaGFzIGRlZmF1bHQgdmFsdWVzXCIsICgpID0+IHtcclxuICAgICAgICB1c2luZyh4ID0gbmV3IENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3RpbmcoKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBlY3QoeC5jbGllbnQuaXNfbG9nZ2VkX2luKS50b0JlKGZhbHNlKTtcclxuICAgICAgICAgICAgZXhwZWN0KHguY2xpZW50LnByb2plY3RzKS50b0VxdWFsKFtdKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB0ZXN0cy9hLm1vZGVsLmhhcy52YWx1ZXMuc3BlYy50c1xuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqYXNtaW5lLmQudHNcIi8+XHJcbmltcG9ydCB7QWN0aW9uc0NsaWVudCwgdXNpbmcsICBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nfSBmcm9tIFwiLi9saWJcIjtcclxuaW1wb3J0IHtnZXRNZXNzYWdlc1RvU2VuZCwgZ290TWVzc2FnZXMsIGRpc3BhdGNofSBmcm9tIFwiLi4vbW9kZWxpdi5lbnRyeVwiO1xyXG5cclxuZGVzY3JpYmUoXCJhIG1vZGVsXCIsICgpID0+IHtcclxuICAgIGxldCB4OiBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nO1xyXG5cclxuICAgIGl0KFwiY2FuIGFwcGx5IGFjdGlvbnMgZnJvbSBvdGhlciB0aWVyc1wiLCAoKSA9PiB7XHJcbiAgICAgICAgdXNpbmcoeCA9IG5ldyBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nKCksICgpID0+IHtcclxuICAgICAgICAgICAgQWN0aW9uc0NsaWVudC5sb2dpbihcImFcIiwgXCJwYXNzd29yZCBmb3IgYVwiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudF9tZXNzYWdlcyA9IGdldE1lc3NhZ2VzVG9TZW5kKFwiY2xpZW50XCIpO1xyXG4gICAgICAgICAgICBnb3RNZXNzYWdlcyhcInNlcnZlclwiLCBbY2xpZW50X21lc3NhZ2VzWzBdXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBleHBlY3QoeC5zZXJ2ZXIuaXNfbG9nZ2VkX2luKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59KTtcclxuICAgICAgICAvLyBsaWIubWVzc2FnZXNGb3IocmVxdWVzdC51cmwuc2xpY2UoXCJhcGk6Ly9tZXNzYWdlc1wiLmxlbmd0aCArIDEpLnNwbGl0KCcmJykubWFwKHN2ID0+IHN2LnNwbGl0KCc9JykpKTtcclxuXHJcblxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgICAgICAgLy8gICB2YXIgbWVzc2FnZSA9IGxpYi5nZXRNZXNzYWdlc0Zyb20oKTtcclxuICAgICAgICAvLyAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgICAgLy8gICAgIHZhciByZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgbWVzc2FnZTogXCIgKyByZXNwb25zZSk7XHJcbiAgICAgICAgLy8gICAgIGNhbGxiYWNrKHsgY2hhcnNldDogJ3V0Zi04JywgbWltZVR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJywgZGF0YTogbmV3IEJ1ZmZlcihyZXNwb25zZSkgfSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyAgIH1cclxuXHJcbiAgICAgICAgLy8gICBzZXRUaW1lb3V0KG1haW4pO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gbWFpbigpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHRlc3RzL2NhbiBhcHBseSBhY3Rpb25zIGZyb20gb3RoZXIgdGllcnMuc3BlYy50c1xuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqYXNtaW5lLmQudHNcIi8+XHJcbmltcG9ydCB7QWN0aW9uc1NlcnZlciwgdXNpbmcsICBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nfSBmcm9tIFwiLi9saWJcIjtcclxuaW1wb3J0IHtnZXRNZXNzYWdlc1RvU2VuZCwgZ290TWVzc2FnZXMsIGRpc3BhdGNofSBmcm9tIFwiLi4vbW9kZWxpdi5lbnRyeVwiO1xyXG5cclxuZGVzY3JpYmUoXCJhIG1vZGVsXCIsICgpID0+IHtcclxuICAgIGxldCB4OiBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nO1xyXG5cclxuICAgIGl0KFwiY2FuIGFwcGx5IGNoYW5nZXMgZnJvbSBvdGhlciB0aWVyc1wiLCAoKSA9PiB7XHJcbiAgICAgICAgdXNpbmcoeCA9IG5ldyBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nKCksICgpID0+IHtcclxuICAgICAgICAgICAgQWN0aW9uc1NlcnZlci5sb2dpbihcImFcIiwgXCJwYXNzd29yZCBmb3IgYVwiKTtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXMgPSBnZXRNZXNzYWdlc1RvU2VuZChcInNlcnZlclwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkobWVzc2FnZXMpKTtcclxuICAgICAgICAgICAgZ290TWVzc2FnZXMoXCJjbGllbnRcIiwgbWVzc2FnZXMpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHguY2xpZW50LmlzX2xvZ2dlZF9pbikudG9CZVRydXRoeSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufSk7XHJcbiAgICAgICAgLy8gbGliLm1lc3NhZ2VzRm9yKHJlcXVlc3QudXJsLnNsaWNlKFwiYXBpOi8vbWVzc2FnZXNcIi5sZW5ndGggKyAxKS5zcGxpdCgnJicpLm1hcChzdiA9PiBzdi5zcGxpdCgnPScpKSk7XHJcblxyXG5cclxuICAgICAgICAvLyBmdW5jdGlvbiBtYWluKCkge1xyXG4gICAgICAgIC8vICAgdmFyIG1lc3NhZ2UgPSBsaWIuZ2V0TWVzc2FnZXNGcm9tKCk7XHJcbiAgICAgICAgLy8gICBpZiAobWVzc2FnZSkge1xyXG4gICAgICAgIC8vICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG1lc3NhZ2U6IFwiICsgcmVzcG9uc2UpO1xyXG4gICAgICAgIC8vICAgICBjYWxsYmFjayh7IGNoYXJzZXQ6ICd1dGYtOCcsIG1pbWVUeXBlOiAnYXBwbGljYXRpb24vanNvbicsIGRhdGE6IG5ldyBCdWZmZXIocmVzcG9uc2UpIH0pO1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICB9XHJcblxyXG4gICAgICAgIC8vICAgc2V0VGltZW91dChtYWluKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIG1haW4oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB0ZXN0cy9jYW4gYXBwbHkgY2hhbmdlcyBmcm9tIG90aGVyIHRpZXJzLnNwZWMudHNcbiAqKi8iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiamFzbWluZS5kLnRzXCIvPlxyXG5pbXBvcnQge0FjdGlvbnNTZXJ2ZXIsIHVzaW5nLCBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nfSBmcm9tIFwiLi9saWJcIjtcclxuXHJcbmRlc2NyaWJlKFwiYSBtb2RlbFwiLCAoKSA9PiB7XHJcbiAgICBsZXQgeDogQ2xpZW50U2VydmVyU3RhdGVzRm9yVGVzdGluZztcclxuXHJcbiAgICBpdChcImNhbiBiZSB1cGRhdGVkIGJ5IGFuIGFjdGlvblwiLCAoKSA9PiB7XHJcbiAgICAgICAgdXNpbmcoeCA9IG5ldyBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nKCksICgpID0+IHtcclxuICAgICAgICAgICAgQWN0aW9uc1NlcnZlci5zZXRQcm9qZWN0cyhbeyBuYW1lOiAncDEnLCBndWlkOiAnZzEnLCBpdGVtczogW10sIHBhdGg6ICcnIH1dKTtcclxuICAgICAgICAgICAgZXhwZWN0KHguc2VydmVyLnByb2plY3RzLmxlbmd0aCkudG9CZSgxKTtcclxuICAgICAgICAgICAgZXhwZWN0KHguc2VydmVyLnByb2plY3RzWzBdLmd1aWQpLnRvQmUoJ2cxJyk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogdGVzdHMvY2FuIGJlIHVwZGF0ZWQgYnkgYW4gYWN0aW9uLnNwZWMudHNcbiAqKi8iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiamFzbWluZS5kLnRzXCIvPlxyXG5pbXBvcnQge0FjdGlvbnNDbGllbnQsIEFjdGlvbnNTZXJ2ZXIsIHVzaW5nLCBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nfSBmcm9tIFwiLi9saWJcIjtcclxuXHJcbmRlc2NyaWJlKFwiYSBtb2RlbFwiLCAoKSA9PiB7XHJcbiAgICBsZXQgeDogQ2xpZW50U2VydmVyU3RhdGVzRm9yVGVzdGluZztcclxuXHJcbiAgICBpdChcImNhbiBleGVjdXRlIGFuIGFjdGlvblwiLCAoKSA9PiB7XHJcbiAgICAgICAgdXNpbmcoeCA9IG5ldyBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nKCksICgpID0+IHtcclxuICAgICAgICAgICAgQWN0aW9uc0NsaWVudC5sb2dpbihcImFcIiwgXCJwYXNzd29yZCBmb3IgYVwiKTtcclxuICAgICAgICAgICAgQWN0aW9uc1NlcnZlci5sb2dpbihcImFcIiwgXCJwYXNzd29yZCBmb3IgYVwiKTtcclxuICAgICAgICAgICAgZXhwZWN0KHguY2xpZW50LmlzX2xvZ2dlZF9pbikudG9CZShmYWxzZSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh4LnNlcnZlci5pc19sb2dnZWRfaW4pLnRvQmUodHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHRlc3RzL2NhbiBleGVjdXRlIGFuIGFjdGlvbi5zcGVjLnRzXG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImphc21pbmUuZC50c1wiLz5cclxuaW1wb3J0IHt1c2luZywgQ2xpZW50U2VydmVyU3RhdGVzRm9yVGVzdGluZ30gZnJvbSBcIi4vbGliXCI7XHJcblxyXG5kZXNjcmliZShcImEgbW9kZWxcIiwgKCkgPT4ge1xyXG4gICAgbGV0IHg6IENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3Rpbmc7XHJcblxyXG4gICAgaXQoXCJpcyBub3QgYSBzaW5nbGV0b25cIiwgKCkgPT4ge1xyXG4gICAgICAgIHVzaW5nKHggPSBuZXcgQ2xpZW50U2VydmVyU3RhdGVzRm9yVGVzdGluZygpLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cGVjdCh4LmNsaWVudC50aWVyKS50b0JlKFwiY2xpZW50XCIpO1xyXG4gICAgICAgICAgICBleHBlY3QoeC5zZXJ2ZXIudGllcikudG9CZShcInNlcnZlclwiKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB0ZXN0cy9pcyBub3QgYSBzaW5nbGV0b24uc3BlYy50c1xuICoqLyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJqYXNtaW5lLmQudHNcIi8+XHJcbmltcG9ydCB7QWN0aW9uc1NlcnZlciwgdXNpbmcsIENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3Rpbmd9IGZyb20gXCIuL2xpYlwiO1xyXG5cclxuZGVzY3JpYmUoXCJhIG1vZGVsXCIsICgpID0+IHtcclxuICAgIGxldCB4OiBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nO1xyXG5cclxuICAgIGl0KFwiaXMgb25seSBjYWxsZWQgZm9yIGFjdGlvbnMgb2YgdGhlIHNhbWUgdGllclwiLCAoKSA9PiB7XHJcbiAgICAgICAgdXNpbmcoeCA9IG5ldyBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nKCksICgpID0+IHtcclxuICAgICAgICAgICAgQWN0aW9uc1NlcnZlci5zZXRQcm9qZWN0cyhbeyBuYW1lOiAncDEnLCBndWlkOiAnZzEnLCBpdGVtczogW10sIHBhdGg6ICcnIH1dKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGV4cGVjdCh4LnNlcnZlci5wcm9qZWN0cy5sZW5ndGgpLnRvQmUoMSk7XHJcbiAgICAgICAgICAgIGV4cGVjdCh4LnNlcnZlci5wcm9qZWN0c1swXS5ndWlkKS50b0JlKCdnMScpO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KHguY2xpZW50LnByb2plY3RzLmxlbmd0aCkudG9CZSgwKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB0ZXN0cy9pcyBvbmx5IGNhbGxlZCBmb3IgYWN0aW9ucyBvZiB0aGUgc2FtZSB0aWVyLnNwZWMudHNcbiAqKi8iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiamFzbWluZS5kLnRzXCIvPlxyXG5pbXBvcnQge3VzaW5nLCBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nfSBmcm9tIFwiLi9saWJcIjtcclxuXHJcbmRlc2NyaWJlKFwiYSBtb2RlbFwiLCAoKSA9PiB7XHJcbiAgICBsZXQgeDogQ2xpZW50U2VydmVyU3RhdGVzRm9yVGVzdGluZztcclxuXHJcbiAgICBpdChcImlzIHJlYWRvbmx5XCIsICgpID0+IHtcclxuICAgICAgICB1c2luZyh4ID0gbmV3IENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3RpbmcoKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICB4LmNsaWVudC5pc19sb2dnZWRfaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBleHBlY3QoeC5jbGllbnQuaXNfbG9nZ2VkX2luKS50b0JlKGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB0ZXN0cy9pcyByZWFkb25seS5zcGVjLnRzXG4gKiovIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImphc21pbmUuZC50c1wiLz5cclxuaW1wb3J0IHtBY3Rpb25zQ2xpZW50LCB1c2luZywgQ2xpZW50U2VydmVyU3RhdGVzRm9yVGVzdGluZ30gZnJvbSBcIi4vbGliXCI7XHJcbmltcG9ydCB7Z2V0TWVzc2FnZXNUb1NlbmR9IGZyb20gXCIuLi9tb2RlbGl2LmVudHJ5XCI7XHJcblxyXG5kZXNjcmliZShcImEgbW9kZWxcIiwgKCkgPT4ge1xyXG4gICAgbGV0IHg6IENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3Rpbmc7XHJcblxyXG4gICAgaXQoXCJtZXNzYWdlcyBhcmUgZ2VuZXJhdGVkIGZvciBhY3Rpb25zXCIsICgpID0+IHtcclxuICAgICAgICB1c2luZyh4ID0gbmV3IENsaWVudFNlcnZlclN0YXRlc0ZvclRlc3RpbmcoKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBBY3Rpb25zQ2xpZW50LmxvZ2luKFwiYVwiLCBcInBhc3N3b3JkIGZvciBhXCIpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY2xpZW50X21lc3NhZ2VzID0gZ2V0TWVzc2FnZXNUb1NlbmQoXCJjbGllbnRcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudF9tZXNzYWdlID0gY2xpZW50X21lc3NhZ2VzWzBdO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KGNsaWVudF9tZXNzYWdlKS50b0JlVHJ1dGh5KCk7XHJcbiAgICAgICAgICAgIGV4cGVjdChjbGllbnRfbWVzc2FnZS50aWVyKS50b0JlKFwiY2xpZW50XCIpO1xyXG4gICAgICAgICAgICBleHBlY3QoKGNsaWVudF9tZXNzYWdlIGFzIGFueSkubmFtZSkudG9CZShcImxvZ2luXCIpO1xyXG4gICAgICAgICAgICBleHBlY3QoKGNsaWVudF9tZXNzYWdlIGFzIGFueSkudmFsdWUpLnRvRXF1YWwoW1wiYVwiLFwicGFzc3dvcmQgZm9yIGFcIl0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufSk7XHJcbiAgICAgICAgLy8gbGliLm1lc3NhZ2VzRm9yKHJlcXVlc3QudXJsLnNsaWNlKFwiYXBpOi8vbWVzc2FnZXNcIi5sZW5ndGggKyAxKS5zcGxpdCgnJicpLm1hcChzdiA9PiBzdi5zcGxpdCgnPScpKSk7XHJcblxyXG5cclxuICAgICAgICAvLyBmdW5jdGlvbiBtYWluKCkge1xyXG4gICAgICAgIC8vICAgdmFyIG1lc3NhZ2UgPSBsaWIuZ2V0TWVzc2FnZXNGcm9tKCk7XHJcbiAgICAgICAgLy8gICBpZiAobWVzc2FnZSkge1xyXG4gICAgICAgIC8vICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJzZW5kaW5nIG1lc3NhZ2U6IFwiICsgcmVzcG9uc2UpO1xyXG4gICAgICAgIC8vICAgICBjYWxsYmFjayh7IGNoYXJzZXQ6ICd1dGYtOCcsIG1pbWVUeXBlOiAnYXBwbGljYXRpb24vanNvbicsIGRhdGE6IG5ldyBCdWZmZXIocmVzcG9uc2UpIH0pO1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gICB9XHJcblxyXG4gICAgICAgIC8vICAgc2V0VGltZW91dChtYWluKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIG1haW4oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB0ZXN0cy9tZXNzYWdlcyBhcmUgZ2VuZXJhdGVkIGZvciBhY3Rpb25zLnNwZWMudHNcbiAqKi8iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiamFzbWluZS5kLnRzXCIvPlxyXG5pbXBvcnQge0FjdGlvbnNTZXJ2ZXIsIHVzaW5nLCBDbGllbnRTZXJ2ZXJTdGF0ZXNGb3JUZXN0aW5nfSBmcm9tIFwiLi9saWJcIjtcclxuaW1wb3J0IHtnZXRNZXNzYWdlc1RvU2VuZH0gZnJvbSBcIi4uL21vZGVsaXYuZW50cnlcIjtcclxuXHJcbmRlc2NyaWJlKFwiYSBtb2RlbFwiLCAoKSA9PiB7XHJcbiAgICBsZXQgeDogQ2xpZW50U2VydmVyU3RhdGVzRm9yVGVzdGluZztcclxuXHJcbiAgICBpdChcIm1lc3NhZ2VzIGFyZSBnZW5lcmF0ZWQgZm9yIGNoYW5nZXNcIiwgKCkgPT4ge1xyXG4gICAgICAgIHVzaW5nKHggPSBuZXcgQ2xpZW50U2VydmVyU3RhdGVzRm9yVGVzdGluZygpLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIEFjdGlvbnNTZXJ2ZXIubG9naW4oXCJhXCIsIFwicGFzc3dvcmQgZm9yIGFcIik7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjbGllbnRfbWVzc2FnZXMgPSBnZXRNZXNzYWdlc1RvU2VuZChcImNsaWVudFwiKTtcclxuICAgICAgICAgICAgZXhwZWN0KGNsaWVudF9tZXNzYWdlcykudG9CZU51bGwoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlcl9tZXNzYWdlcyA9IGdldE1lc3NhZ2VzVG9TZW5kKFwic2VydmVyXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gc2VydmVyX21lc3NhZ2VzWzFdO1xyXG5cclxuICAgICAgICAgICAgZXhwZWN0KG1lc3NhZ2UpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICAgICAgZXhwZWN0KG1lc3NhZ2UudGllcikudG9CZShcInNlcnZlclwiKTtcclxuICAgICAgICAgICAgZXhwZWN0KChtZXNzYWdlIGFzIGFueSkubmFtZSkudG9CZShcInNldEFsbFwiKTtcclxuICAgICAgICAgICAgZXhwZWN0KEpTT04uc3RyaW5naWZ5KChtZXNzYWdlIGFzIGFueSkudmFsdWUpKS50b0JlKEpTT04uc3RyaW5naWZ5KHsgaXNfbG9nZ2VkX2luIDogdHJ1ZSwgcHJvamVjdHMgOiBbIHsgZ3VpZCA6ICdndWlkXzEnLCBuYW1lIDogJ3Byb2plY3QgMScsIHBhdGggOiAnYzovJyB9IF0sIHZlcnNpb24gOiAxIH0pKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn0pO1xyXG4gICAgICAgIC8vIGxpYi5tZXNzYWdlc0ZvcihyZXF1ZXN0LnVybC5zbGljZShcImFwaTovL21lc3NhZ2VzXCIubGVuZ3RoICsgMSkuc3BsaXQoJyYnKS5tYXAoc3YgPT4gc3Yuc3BsaXQoJz0nKSkpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gZnVuY3Rpb24gbWFpbigpIHtcclxuICAgICAgICAvLyAgIHZhciBtZXNzYWdlID0gbGliLmdldE1lc3NhZ2VzRnJvbSgpO1xyXG4gICAgICAgIC8vICAgaWYgKG1lc3NhZ2UpIHtcclxuICAgICAgICAvLyAgICAgdmFyIHJlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwic2VuZGluZyBtZXNzYWdlOiBcIiArIHJlc3BvbnNlKTtcclxuICAgICAgICAvLyAgICAgY2FsbGJhY2soeyBjaGFyc2V0OiAndXRmLTgnLCBtaW1lVHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLCBkYXRhOiBuZXcgQnVmZmVyKHJlc3BvbnNlKSB9KTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgfVxyXG5cclxuICAgICAgICAvLyAgIHNldFRpbWVvdXQobWFpbik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBtYWluKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogdGVzdHMvbWVzc2FnZXMgYXJlIGdlbmVyYXRlZCBmb3IgY2hhbmdlcy5zcGVjLnRzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==