
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { authUser, createUser, resetPassword } from "@/services/userService.service";
import { RegisterUserBody, UserLogin, UserResetPassword, UserResponse } from "@/utils/types";
import { useState } from "react";

export const useCreateUser = () => {
    const [user, setUser] = useState<UserResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCreateUser = async (userData: RegisterUserBody) => {
        setLoading(true);
        try {
            const newUser = await createUser(userData);
            setUser(newUser);
            setError(null);
            return newUser;
        } catch (err) {
            setError((err as Error).message || 'Erro ao adicionar usuário');
            return null
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, fetchCreateUser, refetch: fetchCreateUser };
}

export const useAuthUser = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAuthUser = async ({ email, password }: UserLogin) => {
        setLoading(true);
        try {
            const response = await authUser({ email, password });
            const { acess_token } = response;
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ acess_token }));
            api.defaults.headers.token = acess_token;
            setError(null);
            const token = acess_token
            return token;
        } catch (err) {
            setError((err as Error).message || 'Erro ao adicionar usuário');
            return null
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, fetchAuthUser, refetch: fetchAuthUser };
}

export const useRecoveryPassword = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecoveryPassword = async ({ email, password, passwordConfirmation }: UserResetPassword) => {
        setLoading(true);
        try {
            await resetPassword({ email, password, passwordConfirmation });
            setError(null);
            return 'success';
        } catch (err) {
            setError((err as Error).message || 'Erro ao adicionar usuário');
            return null
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, fetchRecoveryPassword, refetch: fetchRecoveryPassword };
}