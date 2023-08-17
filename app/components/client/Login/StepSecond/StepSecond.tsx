import Button from "@/app/components/ui/Button/Button"
import Validation from "@/app/components/ui/Validation/Validation"
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import React, { useState, useRef } from "react"


const initCodeValues: number[] | string[] = [
    "","","",""
]

export default function StepFirst({setStep}:{setStep:Dispatch<SetStateAction<number>>}) {
    const [isValid, setIsValid] = useState<boolean>(true)
    const [code, setCode] = useState<number[] | string[]>(initCodeValues)
    const refs = useRef<HTMLInputElement[]>([]);

    const prevPage = () => {
        setStep(1)
    }

    const onInputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>, index : number) => {
        const value = e.target.value

        setCode((prev:any) =>
            prev.map((el:any, i:number) => {
                if (i !== index) {
                    return el;
                }
                return value;
            })
        )
        if(value){
            if(index < code.length-1){
                refs.current[index].blur()
                refs.current[index+1].focus()
            }else if(index === code.length-1){
                refs.current[index].blur()
            }
        }else{
            if(index > 0){
                refs.current[index].blur()
                refs.current[index-1].focus()
            }
        }

    }

    const validateCode = (code:string) => {
        const fourDigitPattern = /^\d{4}$/;
        return fourDigitPattern.test(code);
    }


    const nextPageClickHandler = () => {
        const codeFull = code.join("")
        if(!validateCode(codeFull)){
            setIsValid(false)
            return
        }
        setIsValid(true)
        console.log("Code correct")
    }

    return (
        <div className="stepsecond loginstep">
            <div className="wrapper">
                <button className="back" onClick={prevPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M23.3335 14.3203C23.3335 14.7633 23.0043 15.1294 22.5772 15.1873L22.4585 15.1953L4.95849 15.1953C4.47525 15.1953 4.08349 14.8036 4.08349 14.3203C4.08349 13.8773 4.41267 13.5112 4.83976 13.4533L4.95849 13.4453L22.4585 13.4453C22.9417 13.4453 23.3335 13.8371 23.3335 14.3203Z" fill="#4B3734"/>
                        <path d="M12.634 20.7286C12.9764 21.0696 12.9776 21.6236 12.6367 21.9661C12.3267 22.2774 11.8406 22.3067 11.4975 22.0532L11.3992 21.9687L4.34088 14.9407C4.02864 14.6298 4.00024 14.142 4.25568 13.7989L4.34083 13.7007L11.3992 6.67151C11.7416 6.33051 12.2956 6.33165 12.6366 6.67407C12.9466 6.98535 12.9738 7.47152 12.719 7.81354L12.634 7.9115L6.19867 14.321L12.634 20.7286Z" fill="#4B3734"/>
                    </svg>
                </button>
                <h4>Enter Verification Code</h4>
                <p>We've sent a 4-digit code to your phone. Please enter it below to verify your identity.</p>
                <div className="code-input">
                    {code.map((value, index) => {
                        return <input 
                            ref={(ref:HTMLInputElement) => !refs.current.includes(ref) && refs.current.push(ref)} 
                            key={index} 
                            type="phone" 
                            value={value} 
                            onChange={(e) => onInputChangeHandler(e, index)} 
                            maxLength={1} />
                    })}
                </div>
                <button id="resendCode">Resend code</button>
                <Validation isValid={isValid} text="The code is incorrect" />
            </div>
            <Button title="NEXT" isLink={false} onClickHandler={nextPageClickHandler}/>
            <small>By clicking “NEXT”, you agree to our <Link href="#">Terms & Policies</Link></small>
        </div>
    )
}