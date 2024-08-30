import { Users } from "./users";
import { Asstes } from "./assets";

export interface Database {
    users: Users;
    assets: Asstes;
}