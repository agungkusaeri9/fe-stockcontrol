import { Group } from "./group";

export type Requester = {
    id: number;
    name: string;
    group:Group | null;
}