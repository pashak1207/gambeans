"use client"

import { useEffect, useRef, useState } from "react"
import "./DashboardMain.scss"
import Image from "next/image"

export default function DashboardMain() {
    const [step, setStep] = useState<number>(1)
    const stepsRef = useRef([]) as any;
    const itemsRef = useRef([]) as any;

    const steps = [
        {title: "Welcome!", image: "/dashboard/image1.svg"},
        {title: "Scratch Card", image: "/dashboard/image2.svg"},
        {title: "Lucky Slot", image: "/dashboard/image3.svg"},
        {title: "Keep it up", image: "/dashboard/image4.png"},
        {title: "Lucky Slot", image: "/dashboard/image3.svg"},
        {title: "Keep it up", image: "/dashboard/image5.svg"},
    ] // Temp array of steps

    const calculatePathBlocks = (n:number) => {
        let counter = 0
        for (let i = 1; i<n+1; i++){
            if(i%3 !== 0){
                ++counter
            }
        }
        return counter;
    }

    const filterStepsRefs = () => {
        stepsRef.current.shift()

        for (let i = stepsRef.current.length+1; i >= 0; i -= 4) {
            stepsRef.current.splice(i, 1);
        }        
    }

    const filterItemsRefs = () => {
        for (let i = 1; i < itemsRef.current.length; i += 3) {
            const temp = itemsRef.current[i]
            itemsRef.current[i] = itemsRef.current[i + 1];
            itemsRef.current[i + 1] = temp
        }
    }

    const pathBlocks = []
    for(let i = 0; i < calculatePathBlocks(steps.length); i++) {
        pathBlocks.push(
            <div key={i} className="container">
                <div className="container__inner">
                    <span ref={(el) => stepsRef.current.push(el as never)} className={"inner"}></span>
                    <span ref={(el) => stepsRef.current.push(el as never)} className={"inner"}></span>
                    <span className={"inner"}></span>
                </div>
            </div>
        )
    }

    useEffect(() => {
        filterStepsRefs()
        filterItemsRefs()
    }, [])

    useEffect(() => {
        for(let i = 0; i < stepsRef.current.length; i++) {
            if(i < (step-1)){
                stepsRef.current[i].classList.add("active")
            }
        }

        for(let i = 0; i < itemsRef.current.length; i++) {
            if(i < (step-1)){
                itemsRef.current[i].classList.add("visited")
                itemsRef.current[i].classList.remove("active")
            }else if(i === (step-1)){
                itemsRef.current[i].classList.add("active")
            }
        }
        
    }, [step])

    return <div className={"dashboardmain"}>
        <h2>My journey</h2>
        <button style={{background: "red", padding: "20px"}} onClick={() => setStep(prev => ++prev)}>+</button>
        <div className={`pane`}>
            {steps.length &&
                steps.map((step, index) => {
                    return (
                        <div key={index} className={"item"}>
                            <div ref={(el) => itemsRef.current.push(el as never)} className={"content"}>
                                <h4>{step.title}</h4>
                                <Image 
                                    alt="step"
                                    width={85}
                                    height={85}
                                    src={step.image}
                                />
                            </div>
                        </div>
                    )
                })
            }
            <div className={"path"}>
                {steps.length && 
                    pathBlocks
                }
            </div>
        </div>
    </div>
}