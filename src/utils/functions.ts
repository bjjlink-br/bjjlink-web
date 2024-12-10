import { api } from "@/services/api";

import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext";

export const signOut = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('@Bjjlink-user');
    api.defaults.headers.token = '';
}