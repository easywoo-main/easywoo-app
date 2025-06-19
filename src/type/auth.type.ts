export type Login = {
    userName: string;
    password: string;
}

export type Admin = {
    id: string;
    userName: string;
    roleId: string;
    createdAt: string;
    updatedAt: string;
}

export type AuthState = {
    admin: Admin;
    accessToken: string;
    refreshToken: string;
}

export type CreateAdminDto = {
    userName: string;
    password: string;
    roleId: string;
}

export type UpdateAdminDto = Partial<CreateAdminDto>;