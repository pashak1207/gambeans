import moment from "moment";

const LoginRegisterValidation = {
    validatePhone(code:string, phoneNum:string) {
        const phone = code + phoneNum
        const phoneNumberPattern = /^\+\d{9,}$/;
        
        return phoneNumberPattern.test(phone);
    },

    validateCode(code:string) : boolean {
        const fourDigitPattern = /^\d{4}$/;
        return fourDigitPattern.test(code);
    },

    validateName(name:string) : boolean {
        return !!name.trim()
    },

    validateDate(day:string, month:string, year:string) : boolean {
        return moment(`${day}/${month}/${year}`, 'DD/MM/YYYY').isValid()
    }
}

export default LoginRegisterValidation