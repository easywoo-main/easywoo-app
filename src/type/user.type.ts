

export interface User {
    id: string;
    email: string;
    name: string;
    photo?: string;
    password: string;
    isVerified: boolean;
    hasQuizCompleted: boolean;
    googleUserId?: string;
    appleUserId?: string;
}