import { APIResponse } from "./api-response";

export interface Register extends APIResponse {
    data: {
        username: string;
    }
}