import type {Company} from "@/api/types.ts";
import {parseErrorMessage} from "@/api/utils.ts";
import authStore from "@/stores/auth-store.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export async function fetchCompanies(): Promise<Company[]> {
    const response = await fetch(`${BASE_URL}/companies`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.getState().accessToken}`,
        },
    });

    if (response.status === 401) {
        // TODO: Redirect to login, clear auth state
    }
    if (!response.ok) {
        const message = await parseErrorMessage(response);
        throw new Error(message || "Failed to fetch companies");
    }

    return response.json();
}