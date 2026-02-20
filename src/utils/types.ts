
export type UserResponse = {
	name: string;
	email: string;
	domain: string
	createdAt: string;
	_id: string;
    token: string;
}

export type CreateUserResponse = {
    account: UserResponse;
    token: string;
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

export type PlanFeature = {
    name: string;
    available: boolean;
}

export type PlanType = {
    name: string;
    price: number;
    discount?: string;
    description: string;
    descriptionDetail?: string;
    features: PlanFeature[];
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
    name: string;
    sub: string;
    roles: string[];
    email: string;
    account_id: string;
    status: AccountStatus;
    domain: string;
    profile_photo?: string;
    iat: number;
    exp: number
}