import type {LoginRequest, LoginResponse} from "@/api/types.ts";
import {parseErrorMessage} from "@/api/utils.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export async function login(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const message = await parseErrorMessage(response);
        throw new Error(message || "Login failed");
    }

    return response.json();
}