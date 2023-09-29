import Button from "@/components/ui/Button/Button"
import Validation from "@/components/ui/Validation/Validation"
import { Fourth } from "@/dictionaries/type"
import AuthClientService from "@/services/authClient.service"
import UserUtils from "@/utils/userUtils"
import React, { SetStateAction, useState } from "react"



export default function StepFourth({state, setState, dictionary, lang}:{state:ILoginRegistrationState, setState : React.Dispatch<SetStateAction<ILoginRegistrationState>>, dictionary:Fourth, lang:string}) {
    const [validation, setValidation] = useState<string | null>(null)
    const [name, setName] = useState<string>("")
    const [day, setDay] = useState<string>("")
    const [month, setMonth] = useState<string>("")
    const [year, setYear] = useState<string>("")


    const  nextBtnHandler = async () => {
        setValidation(null)        

        if(!UserUtils.validateName(name)){
            setValidation(dictionary.nameValid)
            return
        }

        if(!UserUtils.validateDate(day, month, year)){
            setValidation(dictionary.dateValid)
            return
        }
        

        if(UserUtils.validateDate(day, month, year) && UserUtils.validateName(name)){
            const inputDate =  new Date(`${year}-${month}-${day}`)           
            
            const { isAdmin } = await AuthClientService.registration(state.phone!, name, inputDate, state.email)
                             .catch(e => console.log("Registration error: " + e.message)) as {isAdmin:boolean}
                             
            if(isAdmin){
                setState(prev =>{
                    return{
                        ...prev,
                        step : prev.step! + 1,
                        path: "/admin"
                    }
                })
            }else{
                setState(prev =>{
                    return{
                        ...prev,
                        step : prev.step! + 1
                    }
                })
            }
        }
        
    }

    const onNameChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onDayChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value:string = e.target.value
        if(+value > 31) value=""
        else if(+value < 1) value = ""
        setDay(`${value}`)
    }

    const onMonthChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value:string = e.target.value
        if(+value > 12) value=""
        else if(+value < 1) value = ""
        setMonth(`${value}`)
    }

    const onYearChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        let value:string = e.target.value
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        if(+value > currentYear) value=`${currentYear}`
        else if(+value < 1) value = ""
        setYear(`${value}`)
    }

    const onYearBlurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
        let value: string = e.target.value
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        if(+value < (currentYear - 100) && +value > 1) value = `${currentYear - 100}`
        if(+value < 1) value = ""
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
        <div className={`stepfourth loginstep ${lang==="he" ? "rtl" : ""}`}>
            <div className="wrapper">
                <button className="back" onClick={returnBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M23.3335 14.3203C23.3335 14.7633 23.0043 15.1294 22.5772 15.1873L22.4585 15.1953L4.95849 15.1953C4.47525 15.1953 4.08349 14.8036 4.08349 14.3203C4.08349 13.8773 4.41267 13.5112 4.83976 13.4533L4.95849 13.4453L22.4585 13.4453C22.9417 13.4453 23.3335 13.8371 23.3335 14.3203Z" fill="#4B3734"/>
                        <path d="M12.634 20.7286C12.9764 21.0696 12.9776 21.6236 12.6367 21.9661C12.3267 22.2774 11.8406 22.3067 11.4975 22.0532L11.3992 21.9687L4.34088 14.9407C4.02864 14.6298 4.00024 14.142 4.25568 13.7989L4.34083 13.7007L11.3992 6.67151C11.7416 6.33051 12.2956 6.33165 12.6366 6.67407C12.9466 6.98535 12.9738 7.47152 12.719 7.81354L12.634 7.9115L6.19867 14.321L12.634 20.7286Z" fill="#4B3734"/>
                    </svg>
                </button>
                <h4>{dictionary.title}</h4>
                <label id="fullName">
                    <h4>{dictionary.name}</h4>
                    <input type="text" value={name} onChange={onNameChangeHandler}/>
                </label>

                <div className="stepfourth__age">
                    <h4>{dictionary.age}</h4>
                    <div className="stepfourth__age-inputs">
                        <input type="number" value={day} onChange={onDayChangeHandler} placeholder="DD" />
                        <input type="number" value={month} onChange={onMonthChangeHandler} placeholder="MM" />
                        <input type="number" value={year} onBlur={onYearBlurHandler} onChange={onYearChangeHandler} placeholder="YYYY" />
                    </div>
                </div>
                <Validation isValid={!validation} text={validation!} />
            </div>
            <Button title={dictionary.button} isLink={false} onClickHandler={nextBtnHandler}/>
        </div>
    )
}