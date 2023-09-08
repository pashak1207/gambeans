import Button from "@/components/ui/Button/Button"
import Validation from "@/components/ui/Validation/Validation"
import AuthClientService from "@/services/authClient.service"
import LoginRegisterValidation from "@/utils/loginRegisterValidation"
import React, { SetStateAction, useState } from "react"



export default function StepThird({state, setState}:{state:ILoginRegistrationState, setState : React.Dispatch<SetStateAction<ILoginRegistrationState>>}) {
    const [validation, setValidation] = useState<string | null>(null)
    const [name, setName] = useState<string>("")
    const [day, setDay] = useState<string>("")
    const [month, setMonth] = useState<string>("")
    const [year, setYear] = useState<string>("")


    const  nextBtnHandler = async () => {
        setValidation(null)        

        if(!LoginRegisterValidation.validateName(name)){
            setValidation("Enter correct name")
            return
        }

        if(!LoginRegisterValidation.validateDate(day, month, year)){
            setValidation("Enter correct date of birth")
            return
        }
        

        if(LoginRegisterValidation.validateDate(day, month, year) && LoginRegisterValidation.validateName(name)){
            const inputDate =  new Date(`${year}-${month}-${day}`)           
            
            await AuthClientService.registration(+state.phone!, name, inputDate)
                             .then(data => console.log(data))
                             .catch(e => console.log("Registration error: " + e.message))
            
            setState(prev =>{
                return{
                    ...prev,
                    step : prev.step! + 1
                }
            })
        }
        
    }

    const onNameChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onDayChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value:string | number = +e.target.value
        if(value > 31) value=31
        else if(value < 1) value = ""
        setDay(`${value}`)
    }

    const onMonthChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value:string | number = +e.target.value
        if(value > 12) value=12
        else if(value < 1) value = ""
        setMonth(`${value}`)
    }

    const onYearChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value:string | number = +e.target.value
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        if(value > currentYear) value=currentYear
        else if(value < 1) value = ""
        setYear(`${value}`)
    }

    const onYearBlurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
        let value:string | number = +e.target.value
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        if(value < (currentYear - 100) && value > 1) value = currentYear - 100
        if(value < 1) value = ""
        setYear(`${value}`)
    }


    const returnBack = () => {
        setState(prev =>{
            return{
                 ...prev,
                 step : prev.step! - 1
            }
         })
    }

    return (
        <div className="stepthird loginstep">
            <div className="wrapper">
                <button className="back" onClick={returnBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M23.3335 14.3203C23.3335 14.7633 23.0043 15.1294 22.5772 15.1873L22.4585 15.1953L4.95849 15.1953C4.47525 15.1953 4.08349 14.8036 4.08349 14.3203C4.08349 13.8773 4.41267 13.5112 4.83976 13.4533L4.95849 13.4453L22.4585 13.4453C22.9417 13.4453 23.3335 13.8371 23.3335 14.3203Z" fill="#4B3734"/>
                        <path d="M12.634 20.7286C12.9764 21.0696 12.9776 21.6236 12.6367 21.9661C12.3267 22.2774 11.8406 22.3067 11.4975 22.0532L11.3992 21.9687L4.34088 14.9407C4.02864 14.6298 4.00024 14.142 4.25568 13.7989L4.34083 13.7007L11.3992 6.67151C11.7416 6.33051 12.2956 6.33165 12.6366 6.67407C12.9466 6.98535 12.9738 7.47152 12.719 7.81354L12.634 7.9115L6.19867 14.321L12.634 20.7286Z" fill="#4B3734"/>
                    </svg>
                </button>
                <h4>We'd love to get to know you better</h4>
                <label id="fullName">
                    <h4>FULL NAME</h4>
                    <input type="text" value={name} onChange={onNameChangeHandler}/>
                </label>

                <div className="stepthird__age">
                    <h4>AGE</h4>
                    <div className="stepthird__age-inputs">
                        <input type="number" value={day} onChange={onDayChangeHandler} placeholder="DD" />
                        <input type="number" value={month} onChange={onMonthChangeHandler} placeholder="MM" />
                        <input type="number" value={year} onBlur={onYearBlurHandler} onChange={onYearChangeHandler} placeholder="YYYY" />
                    </div>
                </div>
                <Validation isValid={!validation} text={validation!} />
            </div>
            <Button title="NEXT" isLink={false} onClickHandler={nextBtnHandler}/>
        </div>
    )
}