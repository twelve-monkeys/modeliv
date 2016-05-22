/// <reference path="jasmine.d.ts"/>
import {ActionsServer, using, ClientServerStatesForTesting} from "./lib";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("is only called for actions of the same tier", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsServer.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
            
            expect(x.server.projects.length).toBe(1);
            expect(x.server.projects[0].guid).toBe('g1');

            expect(x.client.projects.length).toBe(0);
        })
    });
});
