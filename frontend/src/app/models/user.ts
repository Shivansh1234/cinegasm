import { APIResponse } from "./api-response";

export interface User extends APIResponse {
    data: UserData;
}

export interface UserData {
    username: string;
}