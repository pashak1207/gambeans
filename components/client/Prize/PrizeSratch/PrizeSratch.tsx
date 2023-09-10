'use client'

import { useState } from "react"
import PrizeCoupon from "./PrizeCoupon/PrizeCoupon"
import Image from "next/image"
import Confetti from 'react-dom-confetti';

export default function PrizeScratch({prize}:{prize:IPrize}) {

    const [opened, setOpened] = useState<boolean>(false)

    const expireDate = new Date(prize.expires_at).toLocaleDateString(`en-US`, { year: '2-digit', month: 'long', day: 'numeric' })

    const config  = {
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
                        <Confetti active={ opened } config={config}/>
                    </PrizeCoupon>
                </div>
                <h5 style={{opacity: opened ? "1" : "0"}} className="prize_expires">{`Expires ${expireDate}`}</h5>
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