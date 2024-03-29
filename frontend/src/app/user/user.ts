import { APIResponse } from "../app-models/api-response";

export interface UserRes extends APIResponse {
    data: User;
}

export interface User {
    fname: string;
    lname: string;
    username: string;
}