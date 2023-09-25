'use client'

import PrizeUtils from "@/utils/prizeUtils";
import React, { useEffect } from "react"

export default function PrizeSpin({isWon, setSlotEnd}:{isWon:boolean, setSlotEnd:React.Dispatch<React.SetStateAction<boolean>>}) {

    useEffect(() => {
            let reading = PrizeUtils.generateWinNumber()
            let tMax = 6000, // animation time, ms
            height = 1120,
            speeds:number[] = [],
            r = [],
            target = isWon ? reading : PrizeUtils.getRandomInt(100, 999),
            sTarget:any = target.toString(),
            sReading:any = reading.toString(),
            numberOutput:any[] = [],
            reels = [
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
            ],
            $reels:any,
            start:any;

            function init(){
                $reels = Array.from(document.querySelectorAll('.reel')).map(function(el, i){
                    el.innerHTML = '<div class="reel-holder"><p><span></span>' + reels[i].join(`</p><p><span></span>`) + '</p></div><div class="reel-holder"><p><span></span>' + reels[i].join('</p><p><span></span>')
                    return el
                });

                let counter = 1;

                Array.from(document.querySelectorAll('.reel p span')).forEach((el:any, i:number) => {
                    if(counter>10) counter = 1
                    el.innerHTML = `<img src="/slot/${counter}.svg" />`
                    counter++;
                })                
        
                document.querySelector(".lever")?.addEventListener("click", action)
            }
        
            function action(){
                if (start !== undefined) return;
                document.querySelector(".lever")?.setAttribute('disabled', "true")
                document.querySelector(".lever")?.classList.add("button-inactive")
                
                for (let i = 0, len = sTarget.length; i < len; i += 1) {
                    let intOffset = (+sTarget[i] | 0) * height / 10 - ((height / 10) * 2);
                    numberOutput[i] = intOffset >= 0 ? intOffset : (height - (height / 10));
                }
                for (let j = 0; j < 3; ++j) {
                    speeds[j] = Math.random() + .7;
                    r[j] = (Math.random() * 10 | 0) * height / 10;
                }
                
                animate();
            }
        
            function animate(now?:number){
                if (!start) start = now;
                let t = now! - start || 0;                
        
                for (let i = 0; i < 3; ++i)
                    $reels[i].scrollTop = (speeds[i] / tMax / 2 * (tMax - t) * (tMax - t) + numberOutput[i]) % height | 0;
                if (t < tMax) { 
                    requestAnimationFrame(animate);
                } else {
                    start = undefined;
                    check();
                }
            }
        
            function check(){                
                let matchedNumbers = 0;
        
                for (let i = 0, len = sTarget.length; i < len; i += 1) {
                    let targetReading = sReading[i] | 0,
                        targetInt = sTarget[i] | 0,
                        reelClass = targetReading == targetInt ? 'match' : 'no-match';

                    targetReading == targetInt ? matchedNumbers ++ : null;
                }
                
                setSlotEnd(true)
            }
          
          init();
    })
     

    return <div className="prize__spin">
                <h3>Lucky Slot</h3>
                <div className="slot-machine">
                    <div className="group">
                        <div className="reel"></div>
                        <div className="reel"></div>
                        <div className="reel"></div>
                    </div>
                    <div className="btnWrap">
                        <button className="lever button">Spin</button>
                    </div>
                </div>
            </div>
}