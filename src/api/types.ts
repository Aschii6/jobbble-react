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

export const APPLICATION_STATUSES = ["NONE", "APPLIED", "UNDERWAY", "ACCEPTED", "REJECTED", "GHOSTED"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export type Application = {
    id: number;
    title: string;
    description: string;
    status: ApplicationStatus;
    company: Company;
    steps: ApplicationStep[];
}

export type ApplicationStep = {
    id: number;
    title: string;
    description: string;
    date: string | null;
    time: string | null;
}