/// <reference path="jasmine.d.ts"/>
import {using, ClientServerStatesForTesting} from "./lib";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("is not a singleton", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            expect(x.client.tier).toBe("client");
            expect(x.server.tier).toBe("server");
        })
    });
});
