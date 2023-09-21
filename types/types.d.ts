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
    daily_code?: string,
    cafe_id: number
    prizes: User_prize[]
    visits: IVisit[]
    verification_code: String
    updated_at: string
    created_at: string
}

interface IVisit{
    id: number,
    user_id: number,
    cafe_id: number,
    visit_date: string,
    user?: IUser,
    cafe?: ICafe
}

interface IPrize{
    id: number
    cafe_id: number
    max_amount: number
    discount: number
    text: string
    image: string
    step_image: string
    type: Prize_type
    cost: number,
    revenue: number
    probability: number
    is_active: boolean
    expires_at: number
    created_at: string
}

interface IUserPrize{
    id: number
    prize_id: number,
    used: null | Date,
    opened: null | Date,
    user_id: number,
    created_at: string,
    updated_at: string,
    expires_at: null | string,
    prize: IPrize
}

interface ICafe {
    id: number,
    name: string,
    email: string,
    address: string | null,
    logo: string,
    color: string,
    send_phone: string,
    ftw: number,
    link_eng: string | null,
    link_heb: string | null,
    contact_phone: string | null,
    contact_name: string | null,
    daily_code: string,
    created_at: string,
    users?: IUser[]
    prizes?: IPrize[]
    visits?: IVisit[]
}

enum Users_role {
    ADMIN = "ADMIN",
    SUPERADMIN ="SUPERADMIN",
    USER = "USER"
}

enum User_status {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
}

enum Prize_type {
    SCRATCH = "SCRATCH",
    SLOT = "SLOT",
    FREE = "FREE",
    FIRST = "FIRST",
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