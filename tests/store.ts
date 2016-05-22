import { state, ActionsAt, TieredState } from "../modeliv.entry";

export type tiers  = "client" | "server" | "tail";

export interface UserActions {
    login(name: string, password: string):void;
    logout():void;
    setProjects(projects: Project[]):void;
    selectProject(guid: string):void;
}

export interface Project {
    guid: string;
    name: string;
    path: string;
    items?: any[];
}

@state
 export class ClientState extends TieredState<tiers> implements UserActions {
    is_logged_in = false;
    projects: Project[] = [];
    current_project_guid: string;

    login(name: string, password: string) {
        if(this.tier === "client")
            return;             
        console.log("login");
        if ("password for " + name === password) {
            this.is_logged_in = true;
            this.projects = [{ guid: 'guid_1', name: 'project 1', path: 'c:/' }];
            this.current_project_guid
        }
    }
    
    logout() {
        this.is_logged_in = false;
        this.projects = [];
    }

    selectProject(guid: string) {
        if(this.tier === "server")
            return; 
            
        this.current_project_guid = guid;
    }

    setProjects(projects: Project[]) {
        if(this.tier === "client")
            return; 
            
        console.log("setProjects");
        this.projects = projects;
    }
}