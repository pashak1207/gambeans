"use client"

import { useState } from "react"
import "./Login.scss"
import StepFirst from "./StepFirst/StepFirst"
import StepSecond from "./StepSecond/StepSecond"
import StepThird from "./StepThird/StepThird"
import StepFourth from "./StepFourth/StepFourth"

const initState:ILoginRegistrationState = {
    phone:"",
    step: 1
}

export default function Login() {
    const [state, setState] = useState<ILoginRegistrationState>(initState)

    switch(state.step){
        case 1:
            return <StepFirst state={state} setState={setState}/>
        case 2:
            return <StepSecond state={state} setState={setState}/>
        case 3:
            return <StepThird state={state} setState={setState}/>
        case 4:
            return <StepFourth setState={setState}/>

    }
}