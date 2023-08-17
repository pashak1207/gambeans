"use client"

import { useState } from "react"
import "./Login.scss"
import StepFirst from "./StepFirst/StepFirst"
import StepSecond from "./StepSecond/StepSecond"

export default function Login() {
    const [step, setStep] = useState<number>(1)

    switch(step){
        case 1:
            return <StepFirst setStep={setStep}/>
        case 2:
            return <StepSecond setStep={setStep}/>

    }
}