/// <reference path="jasmine.d.ts"/>
import {using, ClientServerStatesForTesting} from "./lib";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("has default values", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            expect(x.client.is_logged_in).toBe(false);
            expect(x.client.projects).toEqual([]);
        })
    });
});
