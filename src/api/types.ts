export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    token: string;
};

export type RegisterRequest = {
    email: string;
    username: string;
    password: string;
}

export type RegisterResponse = {
    token: string;
}

export type Company = {
    id: number;
    name: string;
    description: string;
    location: string;
    websiteUrl: string;
    logoUrl: string;
}