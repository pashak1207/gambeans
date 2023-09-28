const AuthClientService = {
    async generateVerificationCode(phone:string):Promise<{message?:string, phone?: number, name?: string, DOB?: string}> {
        const response = await fetch(`/api/auth/generate`, {
            method: 'POST',
            body: JSON.stringify({
                phone 
            })
        })

        return await response.json()
    },

    async login(phone:string, code:string):Promise<{message?:string, isCorrect?:boolean, isRegistrated?:boolean, isBlocked?:boolean}> {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
                code
            })
        })

        return await response.json()
    },

    async validatePhone(phone:string):Promise<{message?:string, phoneValid?:boolean, phoneNumber?:string}> {
        const response = await fetch(`/api/auth/validatePhone`, {
            method: 'POST',
            body: JSON.stringify({
                phone 
            })
        })

        return await response.json()
    },

    async registration(phone:string, name:string, dob:Date, email: string):Promise<{message?:string, isSuccess?:boolean, isAdmin?:boolean}>{
        const response = await fetch(`/api/auth/registration`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
                name,
                dob,
                email
            })
        })

        return await response.json()
    },
    
    async getMe(param = ""):Promise<{message?:string, newVisit?:IVisit} | IUser | any>{
        const response = await fetch(`/api/auth/me?${param}`)
        
        return await response.json()
    },

    async logOut():Promise<{message:string,}>{
        
        const response = await fetch(`/api/auth/logout`)
        
        return await response!.json()

    }
}

export default AuthClientService;