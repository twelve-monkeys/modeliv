/// <reference path="jasmine.d.ts"/>
import {using, ClientServerStatesForTesting} from "./lib";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("exists", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            expect(x.client).not.toBeNull();
            expect(x.server).not.toBeNull();
        })
    });
});