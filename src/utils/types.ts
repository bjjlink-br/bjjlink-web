
export type UserResponse = {
	name: string;
	email: string;
	domain: string
	createdAt: string;
	_id: string;
}

export type UserLogin = {
    email: string;
    password: string;
}

export type RegisterUserBody = {
    name: string;
	email: string;
    password: string;
    domain: string
}

export interface AuthState {
    acess_token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface AuthContextData extends AuthState {
    signIn: (credentials: UserLogin) => Promise<void>;
    signOut: () => void;
}