import { APIResponse } from "./api-response";

export interface Register extends APIResponse {
    data: RegisterData;
}

interface RegisterData {
    username: string;
}
