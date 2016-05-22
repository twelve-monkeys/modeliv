/// <reference path="jasmine.d.ts"/>
import {ActionsServer, using,  ClientServerStatesForTesting} from "./lib";
import {getMessagesToSend, gotMessages, dispatch} from "../modeliv.entry";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("can apply changes from other tiers", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsServer.login("a", "password for a");
            const messages = getMessagesToSend("server");
            console.log(JSON.stringify(messages));
            gotMessages("client", messages);

            expect(x.client.is_logged_in).toBeTruthy();
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