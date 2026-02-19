import {useMutation} from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

async function parseErrorMessage(response: Response) {
    const text = await response.text();
    try {
        const data = JSON.parse(text) as {message?: string};
        return data?.message ?? text;
    } catch {
        return text;
    }
}

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

export function useLoginMutation() {
    return useMutation({
        mutationFn: login,
    });
}
