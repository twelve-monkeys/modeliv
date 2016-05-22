/// <reference path="jasmine.d.ts"/>
import {ActionsClient, using,  ClientServerStatesForTesting} from "./lib";
import {getMessagesToSend, gotMessages, dispatch} from "../modeliv.entry";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("can apply actions from other tiers", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsClient.login("a", "password for a");

            const client_messages = getMessagesToSend("client");
            gotMessages("server", [client_messages[0]]);
            
            expect(x.server.is_logged_in).toBeTruthy();
        })
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