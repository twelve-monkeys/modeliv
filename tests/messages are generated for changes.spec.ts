/// <reference path="jasmine.d.ts"/>
import {ActionsServer, using, ClientServerStatesForTesting} from "./lib";
import {getMessagesToSend} from "../modeliv.entry";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("messages are generated for changes", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsServer.login("a", "password for a");

            const client_messages = getMessagesToSend("client");
            expect(client_messages).toBeNull();
            
            const server_messages = getMessagesToSend("server");
            const message = server_messages[1];

            expect(message).toBeTruthy();
            expect(message.tier).toBe("server");
            expect((message as any).name).toBe("setAll");
            expect(JSON.stringify((message as any).value)).toBe(JSON.stringify({ is_logged_in : true, projects : [ { guid : 'guid_1', name : 'project 1', path : 'c:/' } ], version : 1 }));
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