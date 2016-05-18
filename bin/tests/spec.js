/// <reference path="jasmine.d.ts"/>
"use strict";
var store_1 = require("./store");
var tiers_1 = require("./tiers");
describe("a model,", function () {
    var client;
    var server;
    beforeEach(function () {
        client = new store_1.User();
        server = new store_1.User(tiers_1.tiers.server);
    });
    afterEach(function () {
        client.dispose();
        server.dispose();
    });
    it("exists", function () {
        expect(client).not.toBeNull();
    });
    it("has a value", function () {
        expect(client.is_logged_in).toBe(false);
    });
    it("can coexist", function () {
        expect(client.tier).toBe(tiers_1.tiers.client);
        expect(server.tier).toBe(tiers_1.tiers.server);
    });
    it("is silently read-only", function () {
        client.is_logged_in = true;
        expect(client.is_logged_in).toBe(false);
    });
    it("actions can write", function () {
        store_1.ActionsClient.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
        var projects = client.projects;
        expect(projects.length).toBe(1);
        expect(projects[0].guid).toBe('g1');
    });
    it("can act independently", function () {
        store_1.ActionsClient.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
        var projects = client.projects;
        expect(projects.length).toBe(1);
        expect(projects[0].guid).toBe('g1');
        projects = server.projects;
        expect(projects.length).toBe(0);
    });
    it("can act independently", function () {
        store_1.ActionsClient.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
        var projects = client.projects;
        expect(projects.length).toBe(1);
        expect(projects[0].guid).toBe('g1');
        projects = server.projects;
        expect(projects.length).toBe(0);
    });
    it("can execute an action", function () {
        store_1.ActionsClient.login("a", "password for a");
        expect(client.is_logged_in).toBe(true);
    });
});
// lib.messagesFor(request.url.slice("api://messages".length + 1).split('&').map(sv => sv.split('=')));
// function main() {
//   var message = lib.nextMessageToSend();
//   if (message) {
//     var response = JSON.stringify(message);
//     console.log("sending message: " + response);
//     callback({ charset: 'utf-8', mimeType: 'application/json', data: new Buffer(response) });
//     return;
//   }
//   setTimeout(main);
// }
// main(); 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0cy9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQzs7QUFFcEMsc0JBQWlELFNBQVMsQ0FBQyxDQUFBO0FBRTNELHNCQUFvQixTQUFTLENBQUMsQ0FBQTtBQUU5QixRQUFRLENBQUMsVUFBVSxFQUFFO0lBQ2pCLElBQUksTUFBWSxDQUFDO0lBQ2pCLElBQUksTUFBWSxDQUFDO0lBQ2pCLFVBQVUsQ0FBQztRQUNQLE1BQU0sR0FBRyxJQUFJLFlBQUksRUFBRSxDQUFDO1FBQ3BCLE1BQU0sR0FBRyxJQUFJLFlBQUksQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxTQUFTLENBQUM7UUFDTixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNULE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsYUFBYSxFQUFFO1FBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDSCxFQUFFLENBQUMsYUFBYSxFQUFFO1FBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNILEVBQUUsQ0FBQyx1QkFBdUIs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