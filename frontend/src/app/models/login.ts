import { APIResponse } from "./api-response";

export interface Login extends APIResponse {
    data: LoginData;
}

interface LoginData {
    username: string;
    token: string;
}
