/// <reference path="jasmine.d.ts"/>
import {ActionsServer, using, ClientServerStatesForTesting} from "./lib";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("can be updated by an action", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsServer.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
            expect(x.server.projects.length).toBe(1);
            expect(x.server.projects[0].guid).toBe('g1');
        })
    });
});
