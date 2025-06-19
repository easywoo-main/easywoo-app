export type Login = {
    userName: string;
    password: string;
}

export type Admin = {
    id: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
}

export type AuthState = {
    admin: Admin;
    accessToken: string;
    refreshToken: string;
}