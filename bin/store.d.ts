import { TieredState } from "../modeliv.entry";
export declare type tiers = "client" | "server" | "tail";
export interface UserActions {
    login(name: string, password: string): void;
    logout(): void;
    setProjects(projects: Project[]): void;
    selectProject(guid: string): void;
}
export interface Project {
    guid: string;
    name: string;
    path: string;
    items?: any[];
}
export declare class ClientState extends TieredState<tiers> implements UserActions {
    is_logged_in: boolean;
    projects: Project[];
    current_project_guid: string;
    login(name: string, password: string): void;
    logout(): void;
    selectProject(guid: string): void;
    setProjects(projects: Project[]): void;
}
