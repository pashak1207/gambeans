import Button from "@/components/ui/Button/Button"
import Validation from "@/components/ui/Validation/Validation"
import { useRouter } from 'next/navigation'
import React, { SetStateAction, useState } from "react"
import AuthClientService from "@/services/authClient.service"
import UserUtils from "@/utils/userUtils"
import { First } from "@/dictionaries/type"

export default function StepFirst({setState, dictionary}:{setState : React.Dispatch<SetStateAction<ILoginRegistrationState>>, dictionary:First}) {
    const [telCode, setTelCode] = useState<string>("+972")
    const [phone, setPhone] = useState<string>("")
    const [isValid, setIsValid] = useState<boolean>(true)
    const route = useRouter()

    const onCodeChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^\d]/g, "")
        setTelCode("+" + inputValue)
    }

    const onCodeBlurHandler = (e:React.FocusEvent<HTMLInputElement>) => {
        if(telCode.length < 2){
            setTelCode("+1")
        }
    }

    const onPhoneChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const inputValue = e.target.value.replace(/[^\d]/g, "")
        setPhone(inputValue)
    }

    const returnBack = () => {
        route.push('/')
    }

    const codeSentButton = async () => {
        setIsValid(true)

        let isValidated = UserUtils.validatePhone(telCode.replace("+", ""), phone)
        
        if(isValidated){
            isValidated = await AuthClientService.validatePhone(telCode+phone)
            .then(data => data?.phoneValid)
            .catch(e => console.log("Phone validation failed. Error: " + e.message)) as boolean
        }
        
        if(isValidated){
            setIsValid(true)
            
            setState((prev) =>{
                return{
                     ...prev,
                     phone : telCode.replace("+", "")+phone,
                     step : prev.step! + 1
                }
             })             
             
            AuthClientService.generateVerificationCode(telCode.replace("+", "")+phone)
        }else{
            setIsValid(false)
        }
    }

    return (
        <div className="stepfirst loginstep">
            <div className="wrapper">
                <button className="back" onClick={returnBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M23.3335 14.3203C23.3335 14.7633 23.0043 15.1294 22.5772 15.1873L22.4585 15.1953L4.95849 15.1953C4.47525 15.1953 4.08349 14.8036 4.08349 14.3203C4.08349 13.8773 4.41267 13.5112 4.83976 13.4533L4.95849 13.4453L22.4585 13.4453C22.9417 13.4453 23.3335 13.8371 23.3335 14.3203Z" fill="#4B3734"/>
                        <path d="M12.634 20.7286C12.9764 21.0696 12.9776 21.6236 12.6367 21.9661C12.3267 22.2774 11.8406 22.3067 11.4975 22.0532L11.3992 21.9687L4.34088 14.9407C4.02864 14.6298 4.00024 14.142 4.25568 13.7989L4.34083 13.7007L11.3992 6.67151C11.7416 6.33051 12.2956 6.33165 12.6366 6.67407C12.9466 6.98535 12.9738 7.47152 12.719 7.81354L12.634 7.9115L6.19867 14.321L12.634 20.7286Z" fill="#4B3734"/>
                    </svg>
                </button>
                <h4>{dictionary.title}</h4>
                <p>{dictionary.text}</p>
                <div className="phone">
                    <label id="phone__code">
                        <input value={telCode} maxLength={4} onBlur={onCodeBlurHandler} onChange={onCodeChangeHandler} type="tel"/>
                    </label>
                    <label id="phone__number">
                        <input value={phone} maxLength={12} onChange={onPhoneChangeHandler} type="tel"/>
                    </label>
                </div>
                <small>{dictionary.small}</small>
                <Validation isValid={isValid} text={dictionary.validation} />
            </div>
            <Button title={dictionary.button} isLink={false} onClickHandler={codeSentButton}/>
        </div>
    )
}