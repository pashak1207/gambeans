"use client"

import { useState } from "react"
import "./Login.scss"
import StepFirst from "./StepFirst/StepFirst"
import StepSecond from "./StepSecond/StepSecond"
import StepFourth from "./StepFourth/StepFourth"
import { Login2 } from "@/dictionaries/type"
import StepFifth from "./StepFifth/StepFifth"
import StepThird from "./StepThird/StepThird"

const initState:ILoginRegistrationState = {
    phone:"",
    step: 1,
    path: "/dashboard",
    email: ""
}

export default function Login({dictionary, lang}:{dictionary:Login2, lang:string}) {
    const [state, setState] = useState<ILoginRegistrationState>(initState)

    switch(state.step){
        case 1:
            return <StepFirst dictionary={dictionary.first} setState={setState}/>
        case 2:
            return <StepSecond dictionary={dictionary.second} state={state} setState={setState}/>
        case 3:
            return <StepThird lang={lang} dictionary={dictionary.third} state={state} setState={setState}/>
        case 4:
            return <StepFourth lang={lang} dictionary={dictionary.fourth} state={state} setState={setState}/>
        case 5:
            return <StepFifth lang={lang} dictionary={dictionary.fifth} state={state} setState={setState}/>

    }
}