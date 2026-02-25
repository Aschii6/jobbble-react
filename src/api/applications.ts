import authStore from "@/stores/auth-store.ts";
import type {Application} from "@/api/types.ts";
import {parseErrorMessage} from "@/api/utils.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export async function fetchApplications(): Promise<Application[]> {
    const response = await fetch(`${BASE_URL}/applications`, {
        method: "GET",
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
        throw new Error(message || "Failed to fetch applications");
    }

    return response.json();
}

export async function fetchApplicationById(applicationId: number): Promise<Application> {
    const response = await fetch(`${BASE_URL}/applications/${applicationId}`, {
        method: "GET",
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
        throw new Error(message || "Failed to fetch application details");
    }

    return response.json();
}

export async function createApplication(applicationData: Omit<Application, "id">): Promise<Application> {
    const response = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.getState().accessToken}`,
        },
        body: JSON.stringify(applicationData),
    });

    if (response.status === 401) {
        //
    }
    if (!response.ok) {
        const message = await parseErrorMessage(response);
        throw new Error(message || "Failed to create application");
    }

    return response.json();
}

export async function updateApplication(applicationId: number, applicationData: Partial<Application>): Promise<Application> {
    const response = await fetch(`${BASE_URL}/applications/${applicationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.getState().accessToken}`,
        },
        body: JSON.stringify(applicationData),
    });

    if (response.status === 401) {
        //
    }
    if (!response.ok) {
        const message = await parseErrorMessage(response);
        throw new Error(message || "Failed to update application");
    }

    return response.json();
}
