interface ILoginRegistrationState {
    phone?: string,
    step?: number,
    path?: string
}

interface IUser{
    id: number
    name?: string
    phone: number
    role: Users_role
    status: User_status
    DOB?: String
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
    current_amount: number
    text: string
    image: string
    step_image: string
    type: Prize_type
    cost: number,
    revenue: number
    probability: number
    is_active: boolean
    users?: IUserPrize[]
    expires_at: number
    created_at: string
}

interface IUserPrize{
    id: number
    prize_id: number,
    used: null | Date,
    opened: null | Date,
    is_won: boolean,
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
    env_version: Env_version,
    contact_phone: string | null,
    contact_name: string | null,
    daily_code: string,
    created_at: string,
    users?: IUser[]
    prizes?: IPrize[]
    visits?: IVisit[]
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