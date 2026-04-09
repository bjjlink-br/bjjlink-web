import {
  CreateUserResponse,
  RegisterUserBody,
  UserLogin,
  UserResetPassword,
} from "@/utils/types";
import { api } from "./api";

export const createUser = async (
  userData: RegisterUserBody,
): Promise<CreateUserResponse> => {
  const response = await api.post<CreateUserResponse>("/account", userData);
  return response.data;
};

export const authUser = async (
  userData: UserLogin,
): Promise<{ acess_token: string }> => {
  const response = await api.post<{ acess_token: string }>(
    "/account/auth",
    userData,
  );
  return response.data;
};

export const resetPassword = async (
  userData: UserResetPassword,
): Promise<void> => {
  await api.post<void>("/account/password/recovery", userData);
};

export const updatePassword = async (
  token: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  await api.patch<void>(
    "/account/password",
    { currentPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const updateAccount = async (
  token: string,
  data: { name: string; domain: string; phone: string },
): Promise<void> => {
  await api.put<void>("/account", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updatePublicProfile = async (token: string): Promise<void> => {
  console.log({ tokennarequest: token });
  await api.patch<void>("/account/public", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const resetPasswordWithToken = async (
  token: string,
  password: string,
  passwordConfirmation: string,
): Promise<void> => {
  await api.post<void>(`/account/password/reset/${token}`, {
    password,
    passwordConfirmation,
  });
};
