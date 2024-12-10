import { RegisterUserBody, UserLogin, UserResponse } from "@/utils/types";
import { api } from "./api";

export const createUser = async (userData: RegisterUserBody): Promise<UserResponse> => {
    const response = await api.post<UserResponse>('/account', userData);
    return response.data;
};

export const authUser = async (userData: UserLogin): Promise<{ acess_token: string }> => {
    const response = await api.post<{ acess_token: string }>('/account/auth', userData);
    return response.data;
};