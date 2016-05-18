/// <reference path="jasmine.d.ts"/>

import {User, ActionsClient, ActionsServer} from "./store";

import {tiers} from "./tiers";

describe("a model,", () => {
    let client: User;
    let server: User;
    beforeEach(() => {
        client = new User();
        server = new User(tiers.server);
    });
    afterEach(() => {
        client.dispose();
        server.dispose();
    });
    it("exists", () => {
        expect(client).not.toBeNull();
    });
    it("has a value", () => {
        expect(client.is_logged_in).toBe(false);
    });
    it("can coexist", () => {
        expect(client.tier).toBe(tiers.client);
        expect(server.tier).toBe(tiers.server);
    });
    it("is silently read-only", () => {
        client.is_logged_in = true;
        expect(client.is_logged_in).toBe(false);        
    });
    it("actions can write", () => {
        ActionsClient.setProjects([{name: 'p1', guid:'g1', items:[], path:''}]);
        const projects = client.projects;
        expect(projects.length).toBe(1);
        expect(projects[0].guid).toBe('g1');
    });
    it("can act independently", () => {
        ActionsClient.setProjects([{name: 'p1', guid:'g1', items:[], path:''}]);
        let projects = client.projects;
        expect(projects.length).toBe(1);
        expect(projects[0].guid).toBe('g1');
        
        projects = server.projects;
        expect(projects.length).toBe(0);        
    });
    it("can act independently", () => {
        ActionsClient.setProjects([{name: 'p1', guid:'g1', items:[], path:''}]);
        let projects = client.projects;
        expect(projects.length).toBe(1);
        expect(projects[0].guid).toBe('g1');
        
        projects = server.projects;
        expect(projects.length).toBe(0);        
    });
    it("can execute an action", () => {
        ActionsClient.login("a","password for a");
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