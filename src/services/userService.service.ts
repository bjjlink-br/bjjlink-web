import { CreateUserResponse, RegisterUserBody, UserLogin, UserResetPassword } from "@/utils/types";
import { api } from "./api";

export const createUser = async (userData: RegisterUserBody): Promise<CreateUserResponse> => {
    const response = await api.post<CreateUserResponse>('/account', userData);
    return response.data;
};

export const authUser = async (userData: UserLogin): Promise<{ acess_token: string }> => {
    const response = await api.post<{ acess_token: string }>('/account/auth', userData);
    return response.data;
};

export const resetPassword = async (userData: UserResetPassword): Promise<void> => {
    await api.post<void>('/account/password/recovery', userData);
};