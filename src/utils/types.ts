
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

export type UserResetPassword = {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export type PlanType = {
    name: string;
    price: number;
    discount?: string;
    description: string;
    features: string[];
    popular?: boolean;
}

export enum AccountStatus {
    TRIALING = 'TRIALING',
    ACTIVE = 'ACTIVE',
    PAST_DUE = 'PAST_DUE',
    UNPAID = 'UNPAID',
    CANCELED = 'CANCELED',
    INCOMPLETE = 'INCOMPLETE',
    NEWLY_CREATED = 'NEWLY_CREATED',
}

export type UserAccountInfo = {
    username: string;
    sub: string;
    roles: string[];
    email: string;
    account_id: string;
    status: AccountStatus;
    domain: string;
    iat: number;
    exp: number
}