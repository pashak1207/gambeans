'use client'

import { useEffect, useState } from "react"
import PrizeCoupon from "./PrizeCoupon/PrizeCoupon"
import Image from "next/image"

export default function PrizeScratch({prize}:{prize:IPrize}) {

    const [opened, setOpened] = useState<boolean>(false)

    function renderConfetti() {
        return [...Array(15)].map((e, i) => <div key={i} className="confetti-piece"></div>);
    }

    useEffect(() => {
        setOpened(localStorage.getItem(`opened${prize.id}`) === "true")        
    }, [])

    useEffect(() => {
        localStorage.setItem(`opened${prize.id}`, opened.toString())
    }, [opened])

    return (
        <div className="prize__scratch">
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
                        <Image
                            alt="coupon"
                            height={200}
                            width={200}
                            priority
                            src={prize.image}
                        />
                        <h3>{prize.text}</h3>
                        <h4>Yay! You’ve won 🎉</h4>
                        <div className="confetti">
                            {opened && renderConfetti()}
                        </div>
                    </PrizeCoupon>
                </div>
                {opened &&
                <>  
                    <h5 className="prize_expires">{`Expires ${new Date(prize.expires_at).toLocaleDateString(`en-US`, { year: '2-digit', month: 'long', day: 'numeric' })}`}</h5>
                </>
                }
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
        </div>
        )
}