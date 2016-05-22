/// <reference path="jasmine.d.ts"/>
import {ActionsClient, ActionsServer, using, ClientServerStatesForTesting} from "./lib";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("can execute an action", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsClient.login("a", "password for a");
            ActionsServer.login("a", "password for a");
            expect(x.client.is_logged_in).toBe(false);
            expect(x.server.is_logged_in).toBe(true);
        })
    });
});

