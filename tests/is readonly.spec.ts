/// <reference path="jasmine.d.ts"/>
import {using, ClientServerStatesForTesting} from "./lib";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("is readonly", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            x.client.is_logged_in = true;
            expect(x.client.is_logged_in).toBe(false);
        })
    });
});
