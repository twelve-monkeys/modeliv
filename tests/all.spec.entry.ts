/// <reference path="jasmine.d.ts"/>
import {ActionsClient, ActionsServer, using, ClientServerStatesForTesting} from "./lib";
import {getMessagesToSend, gotMessages, dispatch} from "../modeliv.entry";

describe("a model", () => {
    let x: ClientServerStatesForTesting;

    it("exists", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            expect(x.client).not.toBeNull();
            expect(x.server).not.toBeNull();
        })
    });

    it("has default values", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            expect(x.client.is_logged_in).toBe(false);
            expect(x.client.projects).toEqual([]);
        })
    });

    it("can apply actions from other tiers", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsClient.login("a", "password for a");

            const client_messages = getMessagesToSend("client");
            gotMessages("server", [client_messages[0]]);

            expect(x.server.is_logged_in).toBeTruthy();
        })
    });

    it("can apply changes from other tiers", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsServer.login("a", "password for a");
            const messages = getMessagesToSend("server");
            console.log(JSON.stringify(messages));
            gotMessages("client", messages);

            expect(x.client.is_logged_in).toBeTruthy();
        })
    });

    it("can be updated by an action", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsServer.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);
            expect(x.server.projects.length).toBe(1);
            expect(x.server.projects[0].guid).toBe('g1');
        })
    });

    it("can execute an action", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsClient.login("a", "password for a");
            ActionsServer.login("a", "password for a");
            expect(x.client.is_logged_in).toBe(false);
            expect(x.server.is_logged_in).toBe(true);
        })
    });

    it("is not a singleton", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            expect(x.client.tier).toBe("client");
            expect(x.server.tier).toBe("server");
        })
    });
    
    it("is only called for actions of the same tier", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsServer.setProjects([{ name: 'p1', guid: 'g1', items: [], path: '' }]);

            expect(x.server.projects.length).toBe(1);
            expect(x.server.projects[0].guid).toBe('g1');

            expect(x.client.projects.length).toBe(0);
        })
    });

    it("is readonly", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            x.client.is_logged_in = true;
            expect(x.client.is_logged_in).toBe(false);
        })
    });

    it("messages are generated for actions", () => {
        using(x = new ClientServerStatesForTesting(), () => {
            ActionsClient.login("a", "password for a");

            const client_messages = getMessagesToSend("client");
            const client_message = client_messages[0];

            expect(client_message).toBeTruthy();
            expect(client_message.tier).toBe("client");
            expect((client_message as any).name).toBe("login");
            expect((client_message as any).value).toEqual(["a", "password for a"]);
        })
    });

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
            expect(JSON.stringify((message as any).value)).toBe(JSON.stringify({ is_logged_in: true, projects: [{ guid: 'guid_1', name: 'project 1', path: 'c:/' }], version: 1 }));
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