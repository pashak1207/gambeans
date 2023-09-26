'use client'

import React, { useEffect, useRef, useState } from "react"
import "./DashboardCode.scss"
import CafeClientService from "@/services/cafeClient.service"
import PrizeClientService from "@/services/prizeClient.service"
import { Code } from "@/dictionaries/type"

const initialState = [
    "", "", "", ""
]

export default function DashboardCode({ dictionary }:{ dictionary:Code }) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const codeContainer = useRef<(HTMLDivElement | null)>(null)
    const [inputState, setInputState] = useState<(number | string)[]>(initialState)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, index:number) => {
        const value = /^\d+$/.test(e.target.value) ? e.target.value : ""
        
        setInputState((prev:any) =>
            prev.map((el:any, i:number) => {
                if (i !== index) {
                    return el;
                }
                return value;
            })
        )
        
        if(value){
            inputRefs.current[index+1] ? inputRefs?.current[index+1]?.focus() : inputRefs.current[index]?.blur()
        }
    }

    useEffect(() => {        
        if(inputState.every(item => item)){

            CafeClientService.compareCodes(inputState.join(''))
                .then(data => {                    
                    if(data?.isEqual){
                        codeContainer.current?.classList.add('green')
                        PrizeClientService.setOpenedPrize()
                        setTimeout(() => {
                            codeContainer.current?.classList.remove('green')
                        }, 1000)
                        window.location.reload()
                    }else{
                        codeContainer.current?.classList.add('red')
                
                        setTimeout(() => {
                            codeContainer.current?.classList.remove('red')
                            setInputState(initialState)
                        }, 1000)
                    }
                })
        }
    }, [inputState])

    return (
        <div ref={codeContainer} className="dashboardCode">
            <h5>{dictionary.daily}</h5>
            <div className="dashboardInputs">
                {inputState.map((value, index) => {
                    return <input 
                        key={index} 
                        type="tel"
                        ref={(el) => inputRefs.current.push(el as never)}
                        value={value}
                        onChange={(e) => onChangeHandler(e, index)} 
                        maxLength={1} />
                })}
            </div>
        </div>
    )
}