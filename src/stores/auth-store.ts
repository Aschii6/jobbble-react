import {createStore} from "zustand/vanilla";
import {useStore} from "zustand";

type AuthState = {
    accessToken: string | undefined;

    actions: {
        setAccessToken: (token: string) => void;
        clearAccessToken: () => void;
    }
}

const authStore = createStore<AuthState>((set) => ({
    accessToken: undefined,
    actions: {
        setAccessToken: (token: string) => {
            set({accessToken: token});
        },
        clearAccessToken: () => {
            set({accessToken: undefined});
        }
    }
}));

export const selectAccessToken = (state: AuthState) => state.accessToken;

export const useAccessToken = () => useStore(authStore, selectAccessToken);

export default authStore;