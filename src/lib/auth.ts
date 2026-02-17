import authStore from "@/stores/auth-store.ts";
import {redirect} from "@tanstack/react-router";

function isAuthenticated() {
    return !!authStore.getState().accessToken;
}

export function requireAuth(fromPath?: string) {
    if (!isAuthenticated()) {
        throw redirect({
            to: "/login",
            search: {
                from: fromPath ?? "/"
            }
        })
    }
}