import {useMutation} from "@tanstack/react-query";
import {login} from "@/api/auth.ts";

export function useLogin() {
    return useMutation({
        mutationFn: login,
    });
}