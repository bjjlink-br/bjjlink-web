
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { authUser, createUser, resetPassword } from "@/services/userService.service";
import { RegisterUserBody, UserLogin, UserResetPassword, UserResponse } from "@/utils/types";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

// Interface para o payload do JWT
interface JWTPayload {
    sub: string; // ID do usuário
    email: string;
    name?: string;
    role?: string;
    exp: number; // timestamp de expiração
    iat: number; // timestamp de criação
    [key: string]: string | number | boolean | undefined; // outras propriedades que podem estar no token
}

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
    const [userInfo, setUserInfo] = useState<JWTPayload | null>(null);

    const fetchAuthUser = async ({ email, password }: UserLogin) => {
        setLoading(true);
        try {
            const response = await authUser({ email, password });
            const { acess_token } = response;
            
            const decodedToken = jwtDecode<JWTPayload>(acess_token);
            
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ acess_token }));
            
            localStorage.setItem('@Bjjlink-user', JSON.stringify(decodedToken));
            
            api.defaults.headers.token = acess_token;
            
            setUserInfo(decodedToken);
            setError(null);
            
            return {
                token: acess_token,
                user: decodedToken
            };
        } catch (err) {
            setError((err as Error).message || 'Erro ao fazer login');
            return null
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, userInfo, fetchAuthUser, refetch: fetchAuthUser };
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