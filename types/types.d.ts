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
    SCRATCH,
    SLOT,
    FREE
}