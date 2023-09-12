"use client"

import { useEffect, useRef, useState } from "react"
import "./DashboardMain.scss"
import Image from "next/image"
import AuthClientService from "@/services/authClient.service"
import PrizeClientService from "@/services/prizeClient.service"
import { useRouter } from 'next/navigation'

export default function DashboardMain() {
    const [step, setStep] = useState<number>(1)
    const [allSteps, setAllSteps] = useState<IPrize[]>([])
    const stepsRef = useRef([]) as any;
    const itemsRef = useRef([]) as any;
    const router = useRouter()

    interface IStepImage{
        src: string,
        slot: boolean
    }
    
    const stepsImages: IStepImage[] = [
        { src: "/dashboard/image1.svg", slot: false },
        { src: "/dashboard/image2.svg", slot: false },
        { src: "/dashboard/image3.svg", slot: true },
        { src: "/dashboard/image4.png", slot: false },
        { src: "/dashboard/image3.svg", slot: false },
        { src: "/dashboard/image5.svg", slot: false },
    ]

    const bgImages = [
        "bg1.svg",
        "bg2.svg",
        "bg3.svg",
    ]

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
    let bgIndex = -1;
    for(let i = 0; i < calculatePathBlocks(allSteps.length); i++) {

        if(bgIndex > bgImages.length-1){
            bgIndex = 0;
        }

        pathBlocks.push(
            <div key={i} style={bgImages[bgIndex]?{backgroundImage: `url(/dashboard/${bgImages[bgIndex]})` }:{}} className="container">
                <div className="container__inner">
                    <span ref={(el) => stepsRef.current.push(el as never)} className={"inner"}></span>
                    <span ref={(el) => stepsRef.current.push(el as never)} className={"inner"}></span>
                    <span className={"inner"}></span>
                </div>
            </div>
        )

        bgIndex++;
    }

    useEffect(() => {
        let imageCounter = 0;

        PrizeClientService.getAllPrizes()
            .then(data => data?.prizes.filter((obj:IPrize, index:number, self:IPrize[]) =>
                    index === self.findIndex((el:IPrize) => (el.step === obj.step))
                ))
            .then(data => data.map((item:IPrize) => {
                if(imageCounter >= stepsImages.length) imageCounter = 0;
                if(imageCounter === stepsImages.findIndex(item => item.slot)) imageCounter++;
                let image = (item.type === "SLOT" as Prize_type.SLOT) ? stepsImages.find(item => item.slot)?.src : stepsImages[imageCounter].src
                
                imageCounter++
                return {...item, image}
            }))
            .then(data => setAllSteps(data))

        filterStepsRefs()
        filterItemsRefs()
    }, [])

    useEffect(() => {
        for(let i = 0; i < stepsRef.current.length; i++) {
            if(i < (step-1)){
                stepsRef.current[i].classList.add("active")
            }
        }

        AuthClientService.getMe().then(data => setStep(data.cafes[0].step))        
        
    }, [step])

    function setItemClass(index: number, step: number) {
        let className = "content"

        if((index+1) === step){
            className += " active"
        }else if((index+1) < step ){
            className += " visited"
        }

        return className

    }

    return <div className={"dashboardmain"}>
        <h2>My journey</h2>
        {allSteps && allSteps.length > 0 &&
            <div className={`pane`}>
                {allSteps.length &&
                    allSteps.map((stepObj, index) => {
                        return (
                            <div key={index} className={"item"}>
                                <div ref={(el) => itemsRef.current.push(el as never)} onClick={() => router.push(`/dashboard/${stepObj.id}`)} className={setItemClass(index, step)}>
                                    <h4>{stepObj.text}</h4>
                                    <Image 
                                        alt="step"
                                        priority
                                        width={85}
                                        height={85}
                                        src={stepObj.image}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
                <div className={"path"}>
                    {allSteps.length && 
                        pathBlocks
                    }
                </div>
            </div>
        }
    </div>
}