import { APIResponse } from "./api-response";

export interface User extends APIResponse {
    data: UserData;
}

interface UserData {
    username: string;
}