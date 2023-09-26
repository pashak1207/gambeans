"use client"

import React, { useEffect, useRef } from "react"
import "./PrizeUseSwipe.scss"
import { Swipe } from "@/dictionaries/type"

export default function PrizeUseSwipe({dictionary, swiped, setSwiped}:{dictionary:Swipe, swiped:boolean, setSwiped: React.Dispatch<React.SetStateAction<boolean>>}) {
    const button = useRef<HTMLButtonElement>(null)
    const wrapper = useRef<any>(null)
    let active = false;
    let currentX:number;
    let initialX:number;
    let xOffset = 0;

    useEffect(() => {
        if(swiped){
            setTranslate((wrapper.current?.offsetWidth! - button.current?.offsetWidth! - (parseFloat(window.getComputedStyle(wrapper.current).paddingLeft) * 2)), button.current!);
        }
    }, [swiped])

    const dragStart = (e:any) => {
        e.type === "touchstart"
            ? (initialX = e.touches[0].clientX - xOffset)
            : (initialX = e.clientX - xOffset);
        active = e.target === button.current;        
    };

    const dragEnd = (e:any) => {
        button.current!.style.cursor = "grab";
        initialX = currentX;
        active = false;

        if(currentX < (wrapper.current?.offsetWidth! - button.current?.offsetWidth!)){
            setTranslate(parseFloat(window.getComputedStyle(wrapper.current).paddingLeft), button.current!);
        }else{
            setTranslate((wrapper.current?.offsetWidth! - button.current?.offsetWidth! - (parseFloat(window.getComputedStyle(wrapper.current).paddingLeft) * 3)), button.current!);
            setSwiped(true)
        }
    };

    const drag = (e:any) => {
        if (active && !swiped) {
            e.type === "touchmove"
            ? (currentX = e.touches[0].clientX - initialX)
            : (currentX = e.clientX - initialX);
            xOffset = currentX;
            button.current!.style.cursor = "grabbing";
            if((currentX  + parseFloat(window.getComputedStyle(wrapper.current).paddingLeft)) > 0 && currentX < (wrapper.current?.offsetWidth! - button.current?.offsetWidth! - parseFloat(window.getComputedStyle(wrapper.current).paddingLeft))){
                setTranslate(currentX, button.current!);
            }
        }
    };

    const setTranslate = (xPos:number, el:HTMLButtonElement) => {
        el.style.transform = "translateX(" + xPos + "px)";
    };

    return (
        <div className="useswipe-container">
            <div ref={wrapper} onTouchStart={dragStart} onTouchEnd={dragEnd} onTouchMove={drag} onMouseDown={dragStart} onMouseUp={dragEnd} onMouseMove={drag} className="useswipe-wrapper">
                <button ref={button}>
                    <span style={{opacity: swiped ? "0" : "1"}} className="unredemed">{dictionary.redeem}</span>
                    <span style={{opacity: swiped ? "1" : "0"}} className="redemed">{dictionary.redeemed}</span>
                </button>
            </div>
        </div>
    )
}