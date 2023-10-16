import moment from "moment";


const UserUtils = {
    selectRandomAvatar() : string {

        const avatarsUrl:string[] = []

        for(let i = 1; i <= 5; i++) {
            avatarsUrl[i-1] = `/avatar_${i}.svg`;
        }        

        return avatarsUrl[Math.floor(Math.random() * avatarsUrl.length)];
    },

    validatePhone(code:string, phoneNum?:string) {
        if(!phoneNum){
            
            const phone = `${code}`.replace(/\D/g, '')

            return /^\d{9,}$/.test(phone);
        }

        const phone = `${code}` + `${phoneNum}`
        
        return /^\d{9,}$/.test(phone);
    },

    validatePhoneWithPlus(phone:string){
        return /^(\+)?(\()?(\d{1,4}(\))?)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(phone)
    },

    validateCode(code:string) : boolean {
        return /^\d{4}$/.test(code);
    },

    validateName(name:string) : boolean {
        return !!name.trim() && name.trim() !== "-"
    },

    validateNumber(text:string) : boolean {
        const number = Number(text);
        
        if (!isNaN(number) && number > 0 && number <= 100) {            
            return true;
        }
        
        return false;
    },

    validateDate(day:string, month:string, year:string) : boolean {
        return moment(`${day}/${month}/${year}`, 'DD/MM/YYYY').isValid()
    },

    validateEmail(email:string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    generateVerificationCode() : string {
        const randomNumber = Math.floor(Math.random() * 10000);
        const paddedNumber = randomNumber.toString().padStart(4, '0');
    
        return paddedNumber;
    },

    isDifferentDate (date1:Date, date2:Date){
        return !!moment(moment(date1).format('YYYY-MM-DD')).diff(moment(moment(date2).format('YYYY-MM-DD')), 'days');
    },

    getStartOfDay(date: Date) {
        date.setHours(new Date().getHours(), 0, 0, 0);
        return date.toISOString();
    }
}

export default UserUtils