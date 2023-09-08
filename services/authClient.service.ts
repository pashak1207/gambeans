const AuthClientService = {
    async generateVerificationCode(phone:string) {
        const response = await fetch(`/api/auth/generate`, {
            method: 'POST',
            body: JSON.stringify({
                phone 
            })
        })

        const body = await response.json()

        return body
    },

    async compareCode(phone:string, code:string) {
        const response = await fetch(`/api/auth/compareCodes`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
                code
            })
        })

        const body = await response.json()

        return body
    },

    async validatePhone(phone:string) {
        const response = await fetch(`/api/auth/validatePhone`, {
            method: 'POST',
            body: JSON.stringify({
                phone 
            })
        })

        const body = await response.json()

        return body
    },

    async sendVerificationCode(code:string, phone:string) {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                verification_code: code,
                phone 
            })
        })

        const body = await response.json()

        return body
    },

    async registration(phone:number, name:string, dob:Date){
        const response = await fetch(`/api/auth/registration`, {
            method: 'POST',
            body: JSON.stringify({
                phone,
                name,
                dob
            })
        })

        const body = await response.json()

        return body
    },
    
    async getMe(){
        const response = await fetch(`/api/auth/me`)

        const body = await response.json()
        
        return body
    }
}

export default AuthClientService;