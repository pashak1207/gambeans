'use client'

import { useEffect, useState } from "react"
import PrizeCoupon from "./PrizeCoupon/PrizeCoupon"
import Image from "next/image"
import Confetti from 'react-dom-confetti';
import PrizeClientService from "@/services/prizeClient.service";
import { useRouter } from "next/navigation";
import PrizeUseSwipe from "@/components/ui/PrizeUseSwipe/PrizeUseSwipe";

export default function PrizeScratch({userprize}:{userprize:IUserPrize}) {
    
    const [opened, setOpened] = useState<boolean>(userprize.expires_at !== null)
    const [expires, setExpires] = useState<string>("")
    const [swiped, setSwiped] = useState<boolean>(userprize.used !== null)
    const isWon = userprize.is_won
    const router = useRouter()    

    useEffect(() => {
        if(opened){
            PrizeClientService.setExpiredPrize(userprize.id, userprize.prize.expires_at)
                                .then(data => setExpires(new Date(data.prize.expires_at!).toLocaleDateString(`en-US`, { year: '2-digit', month: 'long', day: 'numeric' })))

            if(!isWon){
                PrizeClientService.setUsedPrize(userprize.id)
            }

        }
    }, [opened])

    
    useEffect(() => {
        if(swiped){
            PrizeClientService.setUsedPrize(userprize.id)
        }
    }, [swiped])

    function returnBack(){
        router.push("/dashboard")
    }

    const confettiConfig  = {
        angle: 90,
        spread: 90,
        startVelocity: 40,
        elementCount: 200,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: "10px",
        height: "10px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
      };

    return (
        <div className="prize__scratch">
                <button className="back" onClick={returnBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M23.3335 14.3203C23.3335 14.7633 23.0043 15.1294 22.5772 15.1873L22.4585 15.1953L4.95849 15.1953C4.47525 15.1953 4.08349 14.8036 4.08349 14.3203C4.08349 13.8773 4.41267 13.5112 4.83976 13.4533L4.95849 13.4453L22.4585 13.4453C22.9417 13.4453 23.3335 13.8371 23.3335 14.3203Z" fill="#4B3734"/>
                        <path d="M12.634 20.7286C12.9764 21.0696 12.9776 21.6236 12.6367 21.9661C12.3267 22.2774 11.8406 22.3067 11.4975 22.0532L11.3992 21.9687L4.34088 14.9407C4.02864 14.6298 4.00024 14.142 4.25568 13.7989L4.34083 13.7007L11.3992 6.67151C11.7416 6.33051 12.2956 6.33165 12.6366 6.67407C12.9466 6.98535 12.9738 7.47152 12.719 7.81354L12.634 7.9115L6.19867 14.321L12.634 20.7286Z" fill="#4B3734"/>
                    </svg>
                </button>
                {!opened &&
                <>
                    <h5>Scratch the card and</h5>
                    <h3>Revel your prize 🎉</h3>
                </>
                }
                {opened &&
                <>
                    <h4>To redeem: </h4>
                    <h2>Show to seller</h2>
                </>
                }
                <div className="prize__scratchcard">
                    <PrizeCoupon opened={opened} setOpened={setOpened} width={300} height={300} cover={"/scratch.svg"}>
                        {isWon && <>
                            <Image
                                alt="coupon"
                                height={200}
                                width={200}
                                priority
                                src={userprize.prize.image}
                            />
                            <h3>{userprize.prize.text}</h3>
                            <h4>Yay! You’ve won 🎉</h4>
                            <Confetti active={ opened } config={confettiConfig}/>
                            </>
                        }
                        {!isWon && <h4>Try next time :(</h4>}
                    </PrizeCoupon>
                </div>
                {isWon && <h5 style={{opacity: opened ? "1" : "0"}} className="prize_expires">{`Expires ${expires}`}</h5>}
                <hr />
                <div className="prize__how">
                    <h3>How it work?</h3>
                    <ol>
                        <li>
                            <h6>Scratch - </h6>
                            <p>Just swipe your finger over the virtual card on your screen to reveal the surprise underneath. Trust us, the suspense is worth it!</p>
                        </li>
                        <li>
                            <h6>Scored a reward?</h6>
                            <p>Awesome! Show this page to the cashier, and redeem your prize, from a free cup of coffee to exclusive discounts.</p>
                        </li>
                    </ol>
                </div>
                {opened && isWon && <PrizeUseSwipe swiped={swiped} setSwiped={setSwiped}/>}
        </div>
        )
}