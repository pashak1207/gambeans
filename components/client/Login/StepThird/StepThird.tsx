import Button from "@/components/ui/Button/Button"
import React, { SetStateAction, useState } from "react"
import { Third } from "@/dictionaries/type"
import Validation from "@/components/ui/Validation/Validation"
import UserUtils from "@/utils/userUtils"

export default function StepThird({setState, dictionary, lang, state}:{ setState : React.Dispatch<SetStateAction<ILoginRegistrationState>>, dictionary:Third, lang:string, state:ILoginRegistrationState}) {

    const [ validation, setValidation ] = useState<string>("")
    const [ email, setEmail ] = useState<string>(state.email)
    const [ isChecked, setIsChecked ] = useState<boolean>(false)

    const prevPage = () => {
        setState(prev =>{
            return{
                 ...prev,
                 step : prev.step! - 1
            }
         })
    }

    const nextPageClickHandler = () => {   
        
        if(!UserUtils.validateEmail(email)){
            setValidation(dictionary.validEmail)
            return
        }

        if(!isChecked){
            setValidation(dictionary.validCheck)
            return
        }
        setValidation("")

        setState(prev =>{
            return{
                 ...prev,
                 step : prev.step! + 1,
                 email: email
            }
         })
    }

    return (
        <div className={`stepthird loginstep ${lang==="he" ? "rtl" : ""}`}>
            <div className="wrapper">
                <button className="back" onClick={prevPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M23.3335 14.3203C23.3335 14.7633 23.0043 15.1294 22.5772 15.1873L22.4585 15.1953L4.95849 15.1953C4.47525 15.1953 4.08349 14.8036 4.08349 14.3203C4.08349 13.8773 4.41267 13.5112 4.83976 13.4533L4.95849 13.4453L22.4585 13.4453C22.9417 13.4453 23.3335 13.8371 23.3335 14.3203Z" fill="#4B3734"/>
                        <path d="M12.634 20.7286C12.9764 21.0696 12.9776 21.6236 12.6367 21.9661C12.3267 22.2774 11.8406 22.3067 11.4975 22.0532L11.3992 21.9687L4.34088 14.9407C4.02864 14.6298 4.00024 14.142 4.25568 13.7989L4.34083 13.7007L11.3992 6.67151C11.7416 6.33051 12.2956 6.33165 12.6366 6.67407C12.9466 6.98535 12.9738 7.47152 12.719 7.81354L12.634 7.9115L6.19867 14.321L12.634 20.7286Z" fill="#4B3734"/>
                    </svg>
                </button>
                <h4>{dictionary.title}</h4>
                <input type="mail" value={email} onChange={e => setEmail(e.target.value)} placeholder="youremail@mail.com" />
                <label><input type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} /> <span>{dictionary.confirm}</span></label>
                <Validation isValid={!validation.trim().length} text={validation} />
            </div>
            <Button title={dictionary.button} isLink={true} onClickHandler={nextPageClickHandler}/>
        </div>
    )
}