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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="jasmine.d.ts"/>
	var lib_1 = __webpack_require__(1);
	var modeliv_entry_1 = __webpack_require__(3);
	describe("a model", function () {
	    var x;
	    it("exists", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            expect(x.client).not.toBeNull();
	            expect(x.server).not.toBeNull();
	        });
	    });
	    it("has default values", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            expect(x.client.is_logged_in).toBe(false);
	            expect(x.client.projects).toEqual([]);
	        });
	    });
	    it("can apply actions from other tiers", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsClient.login("a", "password for a");
	            var client_messages = modeliv_entry_1.getMessagesToSend("client");
	            modeliv_entry_1.gotMessages("server", [client_messages[0]]);
	            expect(x.server.is_logged_in).toBeTruthy();
	        });
	    });
	    it("can apply changes from other tiers", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsServer.login("a", "password for a");
	            var messages = modeliv_entry_1.getMessagesToSend("server");
	            console.log(JSON.stringify(messages));
	            modeliv_entry_1.gotMessages("client", messages);
	            expect(x.client.is_logged_in).toBeTruthy();
	        });
	    });
	    it("can be updated by an action", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsServer.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
	            expect(x.server.projects.length).toBe(1);
	            expect(x.server.projects[0].guid).toBe('g1');
	        });
	    });
	    it("can execute an action", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsClient.login("a", "password for a");
	            lib_1.ActionsServer.login("a", "password for a");
	            expect(x.client.is_logged_in).toBe(false);
	            expect(x.server.is_logged_in).toBe(true);
	        });
	    });
	    it("is not a singleton", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            expect(x.client.tier).toBe("client");
	            expect(x.server.tier).toBe("server");
	        });
	    });
	    it("is only called for actions of the same tier", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            lib_1.ActionsServer.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
	            expect(x.server.projects.length).toBe(1);
	            expect(x.server.projects[0].guid).toBe('g1');
	            expect(x.client.projects.length).toBe(0);
	        });
	    });
	    it("is readonly", function () {
	        lib_1.using(x = new lib_1.ClientServerStatesForTesting(), function () {
	            x.client.is_logged_in = true;
	            expect(x.client.is_logged_in).toBe(false);
	        });
	    });
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var store_1 = __webpack_require__(2);
	var modeliv_entry_1 = __webpack_require__(3);
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
/* 2 */
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
	var modeliv_entry_1 = __webpack_require__(3);
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
/* 3 */
/***/ function(module, exports) {

	module.exports = require("./modeliv");

/***/ }
/******/ ])));
//# sourceMappingURL=all.spec.js.map
//# sourceURL=all.spec.entry.ts