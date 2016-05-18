import { state, server, actions, dispose, ActionsProxy} from "../modeliv";
import {current_tier, tiers} from "./tiers";

export interface Project {
    guid: string;
    name: string;
    path: string;
    items?: any[];
}

interface UserActions {
    login(name: string, password: string);
    logout();
    setProjects(projects: Project[]);
    selectProject(guid: string);
}

@state
export class User implements UserActions {
    is_logged_in = false;
    projects: Project[] = [];
    current_project_guid: string;

    getAll() {
        return {
            is_logged_in: this.is_logged_in,
            projects: this.projects,
            current_project_guid: this.current_project_guid
        }
    }

    constructor(public tier: tiers = tiers.client) {
        actions("User", this);
    }

    dispose() {
        dispose("User", this);
    }

    @server
    login(name: string, password: string) {
        console.log("login!");
        if ("password for " + name === password) {
            this.is_logged_in = true;
            this.projects = [{ guid: 'guid_1', name: 'project 1', path: 'c:/' }];
            this.current_project_guid
        }
    }

    @server
    logout() {
        this.is_logged_in = false;
        this.projects = [];
    }

    @server
    selectProject(guid: string) {
        this.current_project_guid = guid;
    }

    @server
    setProjects(projects: Project[]) {
        console.log("setProjects");
        this.projects = projects;
    }
}

//export const User = new _User();

export const ActionsClient = <UserActions>ActionsProxy(tiers.client); 
export const ActionsServer = <UserActions>ActionsProxy(tiers.server); 
