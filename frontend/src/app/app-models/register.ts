import { APIResponse } from "./api-response";

export interface RegisterRes extends APIResponse {
    data: Register;
}

interface Register {
    username: string;
}
