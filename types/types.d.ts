interface ILoginRegistrationState {
    phone?: string,
    step?: number,
}

interface IUser{
    id: number
    name?: string
    phone: number
    role: Users_role
    status: User_status
    DOB?: Date
    cafes: Cafe_user[]
    prize: User_prize[]
    verification_code: String
    created_at: Date
}

interface IPrize{
    id: number
    cafe_id: number
    max_amount: number
    discount: number
    text: string
    image: string
    type: Prize_type
    revenue: number
    probability: number
    step: number
    is_active: boolean
    expires_at: Date
    created_at: Date
}

enum Users_role {
    ADMIN,
    LOCAL_ADMIN,
    USER
}

enum User_status {
    ACTIVE,
    BLOCKED
}

enum Prize_type {
    SCRATCH = "SCRATCH",
    SLOT = "SLOT",
    FREE = "FREE",
}

interface ICookie {
    key: string;
    value: string;
    cookie: {
        path: string;
        httpOnly: boolean;
        maxAge: number;
    };
    [key: string]: any;
    [key: symbol]: any;
}