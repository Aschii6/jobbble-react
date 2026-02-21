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

export async function fetchCompanyById(companyId: number): Promise<Company> {
    const response = await fetch(`${BASE_URL}/companies/${companyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.getState().accessToken}`,
        },
    });

    console.log(response);

    if (response.status === 401) {
        //
    }
    if (!response.ok) {
        const message = await parseErrorMessage(response);
        throw new Error(message || "Failed to fetch company details");
    }

    return response.json();
}

export async function createCompany(companyData: Omit<Company, "id">): Promise<Company> {
    const response = await fetch(`${BASE_URL}/companies`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.getState().accessToken}`,
        },
        body: JSON.stringify(companyData),
    });

    if (response.status === 401) {
        //
    }
    if (response.status !== 201) {
        const message = await parseErrorMessage(response);
        throw new Error(message || "Failed to add company");
    }

    return response.json();
}

export async function deleteCompanyById(companyId: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/companies/${companyId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.getState().accessToken}`,
        },
    });

    if (response.status === 401) {
        //
    }
    if (!response.ok) {
        const message = await parseErrorMessage(response);
        throw new Error(message || "Failed to delete company");
    }
}