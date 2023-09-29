'use client'

import { useEffect, useState } from "react"
import PrizeCoupon from "./../PrizeSratch/PrizeCoupon/PrizeCoupon"
import Image from "next/image"
import Confetti from 'react-dom-confetti';
import PrizeClientService from "@/services/prizeClient.service";
import { useRouter } from "next/navigation";
import PrizeUseSwipe from "@/components/ui/PrizeUseSwipe/PrizeUseSwipe";
import PrizeSpin from "./PrizeSpin/PrizeSpin";
import { Prize } from "@/dictionaries/type";

export default function PrizeSlot({dictionary, userprize, lang}:{dictionary:Prize,userprize:IUserPrize, lang:string}) {
    
    const [opened, setOpened] = useState<boolean>(userprize.expires_at !== null)
    const [expires, setExpires] = useState<string>("")
    const [swiped, setSwiped] = useState<boolean>(userprize.used !== null)
    const [isSlot, setIsSlot] = useState<boolean>(userprize.opened !== null && userprize.expires_at === null)
    const [slotEnd, setSlotEnd] = useState<boolean>(false)
    const [startConfetti, setStartConfetti] = useState<boolean>(false)
    const isSlotWon = userprize.is_slot_won
    const router = useRouter()

    useEffect(() => {
        if(opened){
            PrizeClientService.setExpiredPrize(userprize.id, userprize.prize.expires_at)
                                .then(data => setExpires(lang === "he" ? new Date(data.prize!.expires_at!).toLocaleDateString('de-DE', { year: '2-digit', month: '2-digit', day: '2-digit' }) : new Date(data.prize!.expires_at!).toLocaleDateString(`en-US`, { year: '2-digit', month: 'long', day: 'numeric' })))

            if(!userprize.is_won){
                PrizeClientService.setUsedPrize(userprize.id)
            }

        }
    }, [opened, userprize.id, userprize.is_won, userprize.prize.expires_at, lang])

    useEffect(() => {
        if(slotEnd){
            if(isSlotWon){
                setStartConfetti(true)

                setTimeout(() => {
                    setIsSlot(false)
                }, 3000)
            }else{
                PrizeClientService.setUsedPrize(userprize.id)
            }
        }        
    }, [slotEnd, isSlotWon, userprize.id])

    
    useEffect(() => {
        if(swiped){
            PrizeClientService.setUsedPrize(userprize.id)
        }
    }, [swiped, userprize.id])

    function returnBack(){
        router.push("/dashboard")
    }

    const confettiConfig  = {
        angle: 270,
        spread: 180,
        startVelocity: 70,
        elementCount: 500,
        dragFriction: 0.30,
        duration: 5000,
        stagger: 2,
        width: "10px",
        height: "10px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
      };

    return (
        <div className="prize__scratch">
                <button className={`back ${lang==="he" ? "rtl" : ""}`} onClick={returnBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M23.3335 14.3203C23.3335 14.7633 23.0043 15.1294 22.5772 15.1873L22.4585 15.1953L4.95849 15.1953C4.47525 15.1953 4.08349 14.8036 4.08349 14.3203C4.08349 13.8773 4.41267 13.5112 4.83976 13.4533L4.95849 13.4453L22.4585 13.4453C22.9417 13.4453 23.3335 13.8371 23.3335 14.3203Z" fill="#4B3734"/>
                        <path d="M12.634 20.7286C12.9764 21.0696 12.9776 21.6236 12.6367 21.9661C12.3267 22.2774 11.8406 22.3067 11.4975 22.0532L11.3992 21.9687L4.34088 14.9407C4.02864 14.6298 4.00024 14.142 4.25568 13.7989L4.34083 13.7007L11.3992 6.67151C11.7416 6.33051 12.2956 6.33165 12.6366 6.67407C12.9466 6.98535 12.9738 7.47152 12.719 7.81354L12.634 7.9115L6.19867 14.321L12.634 20.7286Z" fill="#4B3734"/>
                    </svg>
                </button>
                {((!opened && !slotEnd) || (slotEnd && isSlotWon && !opened)) &&
                <>
                    <h5>{dictionary.scratch}</h5>
                    <h3>{dictionary.revel}</h3>
                </>
                }
                {
                    ((slotEnd && !isSlotWon) || (opened && !userprize.is_won)) && <h3>{dictionary.tomorrow}</h3>
                }
                {(opened || (opened && userprize.is_won)) &&
                <>
                    <h4>{dictionary.redeem}</h4>
                    <h2>{dictionary.show}</h2>
                </>
                }
                <div className={`prize__scratchcard prize__slot ${isSlot ? "" : "sketch"}`}>
                    {isSlot && <>
                        <div className="confetti">
                            <Confetti active={ startConfetti } config={confettiConfig}/>
                        </div>
                        <PrizeSpin dictionary={dictionary.slot} setSlotEnd={setSlotEnd} isWon={isSlotWon} />
                        </>
                    }
                    {slotEnd && !isSlotWon &&
                        <h4 className="tryNext">{dictionary.try}</h4>
                    }
                    {!isSlot && isSlotWon &&
                        <PrizeCoupon opened={opened} setOpened={setOpened} width={300} height={300} cover={"/scratch.svg"}>
                            {userprize.is_won && <>
                                <Confetti active={ opened } config={confettiConfig}/>
                                <Image
                                    alt="coupon"
                                    height={200}
                                    width={200}
                                    priority
                                    src={userprize.prize.image}
                                />
                                <h3>{userprize.prize.text}</h3>
                                <h4>{dictionary.won}</h4>
                                </>
                            }
                            {!userprize.is_won && <h4>{dictionary.try}</h4>}
                        </PrizeCoupon>
                    }
                </div>
                {userprize.is_won && <h5 style={{opacity: opened ? "1" : "0"}} className="prize_expires">{`${dictionary.expires} ${expires}`}</h5>}
                <hr />
                <div className={`prize__how ${lang==="he" ? "rtl" : ""}`}>
                    <h3>{dictionary.work}</h3>
                    <ol>
                        <li>
                            <h6>{dictionary.spin}</h6>
                            <p>{dictionary.spinText}</p>
                        </li>
                        <li>
                            <h6>{dictionary.jackpot}</h6>
                            <p>{dictionary.jackpotText}</p>
                        </li>
                    </ol>
                </div>
                {opened && userprize.is_won && <PrizeUseSwipe dictionary={dictionary.swipe} lang={lang} swiped={swiped} setSwiped={setSwiped}/>}
        </div>
        )
}