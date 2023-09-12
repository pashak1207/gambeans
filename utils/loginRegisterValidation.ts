import moment from "moment";

const LoginRegisterValidation = {
    validatePhone(code:string, phoneNum?:string) {
        if(!phoneNum){
            
            const phone = `${code}`.replace(/\D/g, '')

            return /^\d{9,}$/.test(phone);
        }

        const phone = `${code}` + `${phoneNum}`
        
        return /^\+\d{9,}$/.test(phone);
    },

    validateCode(code:string) : boolean {
        return /^\d{4}$/.test(code);
    },

    validateName(name:string) : boolean {
        return !!name.trim()
    },

    validateDate(day:string, month:string, year:string) : boolean {
        return moment(`${day}/${month}/${year}`, 'DD/MM/YYYY').isValid()
    }
}

export default LoginRegisterValidation