"use client"

import React, { useEffect, useMemo, useRef } from "react"
import "./DashboardMainInner.scss"
import Image from "next/image"
import PrizeClientService from "@/services/prizeClient.service"
import { Main } from "@/dictionaries/type"

export default function DashboardMainInner({dictionary, prizes, bgImages}:{dictionary:Main, prizes:IUserPrize[], bgImages:string[]}) {
    const step = prizes.filter(prize => prize.opened !== null).length
    const stepsRef = useRef([]) as any;
    const itemsRef = useRef([]) as any;

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
    for(let i = 0; i < calculatePathBlocks(prizes.length); i++) {

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
        if(step%5 === 0 && step !== 0){
            PrizeClientService.getRandomPrizes(5, prizes[0].user_id)
                .then(data => {
                    filterStepsRefs()
                    filterItemsRefs()
                })
        }

        filterStepsRefs()
        filterItemsRefs()
        
    }, [prizes, step])

    useEffect(() => {
        for(let i = 0; i < stepsRef.current.length; i++) {
            if(i < (step-1)){
                stepsRef.current[i].classList.add("active")
            }
        }    
    }, [step])

    function setItemClass(index: number, step: number, userprize:IUserPrize) {
        let className = "content"

        if(!(userprize?.expires_at === null || new Date(userprize?.expires_at).getTime()! >= new Date().getTime())){
            className += " expired"   
        }
        
        if((index+1) === step){
            className += " active"
        }
        
        if((index+1) < step){
            className += " visited"
        }

        if(userprize.used){
            className += " used"
        }

        return className

    }

    function validatePrizeIsActive(userprize:IUserPrize){        
        if((userprize?.expires_at === null || new Date(userprize?.expires_at).getTime()! >= new Date().getTime()) 
        && !userprize.used 
        && userprize.prize.max_amount > 0 
        && userprize.prize.is_active
        && userprize.opened !== null){
            return true
        }

        return false
    }

    function goToTheUserPrize(userprize:IUserPrize, e:React.MouseEvent<any>){        
        if(!validatePrizeIsActive(userprize) || prizes.find(pr => validatePrizeIsActive(pr))?.id! < userprize.id){            
            e.preventDefault()
        }
    }    

    return <div className={"dashboardmain"}>
        <h2>{dictionary.journey}</h2>
        {prizes?.length > 0 &&
            <div className={`pane`}>
                {prizes.length &&
                    prizes.map((stepObj, index) => {
                        return (
                            <div key={index} className={"item"}>
                                <a href={`/dashboard/${stepObj.id}`} ref={(el) => itemsRef.current.push(el as never)} onClick={(event) => goToTheUserPrize(stepObj, event)} className={setItemClass(index, step, stepObj)}>
                                    <h4>{stepObj.prize.text}</h4>
                                    <Image 
                                        alt="step"
                                        priority
                                        width={85}
                                        height={85}
                                        src={stepObj.prize.step_image}
                                    />
                                </a>
                            </div>
                        )
                    })
                }
                <div className={"path"}>
                    {prizes.length && 
                        pathBlocks
                    }
                </div>
            </div>
        }
    </div>
}