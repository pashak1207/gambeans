const AuthClientService = {
    async generateVerificationCode(phone:string) {
        const response = await fetch(`/api/auth/generate`, {
            method: 'POST',
            body: JSON.stringify({
                phone 
            })
        })

        return await response.json()
    },

    async login(phone:string, code:string) {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
                code
            })
        })

        return await response.json()
    },

    async validatePhone(phone:string) {
        const response = await fetch(`/api/auth/validatePhone`, {
            method: 'POST',
            body: JSON.stringify({
                phone 
            })
        })

        return await response.json()
    },

    async registration(phone:string, name:string, dob:Date){
        const response = await fetch(`/api/auth/registration`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
                name,
                dob
            })
        })

        return await response.json()
    },
    
    async getMe(param = ""){
        const response = await fetch(`/api/auth/me?${param}`)
        
        return await response.json()
    },

    async logOut(){
        
        const response = await fetch(`/api/auth/logout`)
        
        return await response!.json()

    }
}

export default AuthClientService;