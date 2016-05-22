/// <reference path="jasmine.d.ts"/>
import {ActionsClient, using, ClientServerStatesForTesting} from "./lib";
import {getMessagesToSend} from "../modeliv.entry";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("messages are generated for actions", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsClient.login("a", "password for a");

            const client_messages = getMessagesToSend("client");
            const client_message = client_messages[0];

            expect(client_message).toBeTruthy();
            expect(client_message.tier).toBe("client");
            expect((client_message as any).name).toBe("login");
            expect((client_message as any).value).toEqual(["a","password for a"]);
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