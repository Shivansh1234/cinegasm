import { APIResponse } from "./api-response";

export interface LoginRes extends APIResponse {
    data: Login;
}

interface Login {
    username: string;
    token: string;
}
