"use client"

import { useState } from "react"
import "./Login.scss"
import StepFirst from "./StepFirst/StepFirst"
import StepSecond from "./StepSecond/StepSecond"
import StepThird from "./StepThird/StepThird"
import StepFourth from "./StepFourth/StepFourth"
import { Login2 } from "@/dictionaries/type"

const initState:ILoginRegistrationState = {
    phone:"",
    step: 1,
    path: "/dashboard"
}

export default function Login({dictionary}:{dictionary:Login2}) {
    const [state, setState] = useState<ILoginRegistrationState>(initState)

    switch(state.step){
        case 1:
            return <StepFirst dictionary={dictionary.first} setState={setState}/>
        case 2:
            return <StepSecond dictionary={dictionary.second} state={state} setState={setState}/>
        case 3:
            return <StepThird dictionary={dictionary.third} state={state} setState={setState}/>
        case 4:
            return <StepFourth dictionary={dictionary.fourth} state={state} setState={setState}/>

    }
}