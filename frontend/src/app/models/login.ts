import { APIResponse } from "./api-response";

export interface Login extends APIResponse {
    data: {
        username: string;
        token: string;
    }
}
