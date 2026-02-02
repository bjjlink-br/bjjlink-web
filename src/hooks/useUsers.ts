
import { AUTH_STORAGE_KEY } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { authUser, createUser, resetPassword } from "@/services/userService.service";
import { CreateUserResponse, RegisterUserBody, UserLogin, UserResetPassword } from "@/utils/types";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

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
    const [user, setUser] = useState<CreateUserResponse>();
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
            if (axios.isAxiosError(err) && err.response) {
                const errorData = err.response.data;
                if (errorData.message === 'email or domain already in use') {
                    setError('Email ou domínio já está em uso');
                } else {
                    setError(errorData.message || 'Erro ao adicionar usuário');
                }
            } else {
                setError((err as Error).message || 'Erro ao adicionar usuário');
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, error, fetchCreateUser, refetch: fetchCreateUser };
}

export const useAuthUser = () => {
    // Estado local para garantir que o erro seja capturado corretamente
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const mutation = useMutation<
        { token: string; user: JWTPayload },
        Error,
        UserLogin
    >({
        mutationFn: async ({ email, password }) => {
            try {
                const response = await authUser({ email, password });
                const { acess_token } = response;
                
                const decodedToken = jwtDecode<JWTPayload>(acess_token);
                
                // Salvar no localStorage
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ acess_token }));
                localStorage.setItem('@Bjjlink-user', JSON.stringify(decodedToken));
                
                // Configurar o token no header da API
                api.defaults.headers.token = acess_token;
                
                // Limpar mensagem de erro em caso de sucesso
                setErrorMessage(null);
                
                return {
                    token: acess_token,
                    user: decodedToken
                };
            } catch (err: any) {
                let message = 'Erro ao fazer login';
                
                if (err.response) {
                    const errorData = err.response.data;
                    if (errorData.statusCode === 403) {
                        message = 'Email ou senha incorretos';
                    } else if (errorData.message) {
                        message = errorData.message;
                    }
                }
                
                // Armazenar a mensagem de erro no estado local
                setErrorMessage(message);
                throw new Error(message);
            }
        },
        retry: 0 // Não tentar novamente em caso de erro
    });

    const fetchAuthUser = async (credentials: UserLogin) => {
        try {
            const result = await mutation.mutateAsync(credentials);
            return result;
        } catch (error) {
            // O erro já foi capturado e armazenado no estado local
            return null;
        }
    };

    return {
        loading: mutation.isPending,
        // Usar o estado local para garantir que o erro esteja disponível imediatamente
        error: errorMessage || (mutation.error ? mutation.error.message : null),
        userInfo: mutation.data?.user || null,
        fetchAuthUser,
        refetch: fetchAuthUser
    };
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