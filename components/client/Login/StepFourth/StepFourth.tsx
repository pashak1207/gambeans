import Button from "@/components/ui/Button/Button"
import React, { SetStateAction } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function StepFourth({state, setState}:{state:ILoginRegistrationState, setState : React.Dispatch<SetStateAction<ILoginRegistrationState>>}) {
    const router = useRouter()

    const prevPage = () => {
        setState(prev =>{
            return{
                 ...prev,
                 step : prev.step! - 1
            }
         })
    }

    const nextPageClickHandler = () => {
        router.push('/dashboard')
    }

    return (
        <div className="stepfourth loginstep">
            <div className="wrapper">
                <button className="back" onClick={prevPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M23.3335 14.3203C23.3335 14.7633 23.0043 15.1294 22.5772 15.1873L22.4585 15.1953L4.95849 15.1953C4.47525 15.1953 4.08349 14.8036 4.08349 14.3203C4.08349 13.8773 4.41267 13.5112 4.83976 13.4533L4.95849 13.4453L22.4585 13.4453C22.9417 13.4453 23.3335 13.8371 23.3335 14.3203Z" fill="#4B3734"/>
                        <path d="M12.634 20.7286C12.9764 21.0696 12.9776 21.6236 12.6367 21.9661C12.3267 22.2774 11.8406 22.3067 11.4975 22.0532L11.3992 21.9687L4.34088 14.9407C4.02864 14.6298 4.00024 14.142 4.25568 13.7989L4.34083 13.7007L11.3992 6.67151C11.7416 6.33051 12.2956 6.33165 12.6366 6.67407C12.9466 6.98535 12.9738 7.47152 12.719 7.81354L12.634 7.9115L6.19867 14.321L12.634 20.7286Z" fill="#4B3734"/>
                    </svg>
                </button>
                <h2>HOW IT WORK?</h2>
                <div className="stepfourth__blocks">
                    <div className="stepfourth__item">
                        <Image
                            src="/rocket.svg"
                            alt="rocket"
                            width={49}
                            height={61}
                        />
                        <div className="stepfourth__text">
                            <h3>Arrive & Scan</h3>
                            <p>Scan our QR code and pop the Daily Code into the app.It's your key to jump from one fun stage to another.</p>
                        </div>
                    </div>
                    <div className="stepfourth__item">
                        <Image
                            src="/confetti.svg"
                            alt="confetti"
                            width={51}
                            height={68}
                        />
                        <div className="stepfourth__text">
                            <h3>Unlock & Win</h3>
                            <p>Every visit or two unlocks a new activity! Grab your chance to score rewards, from free coffee to exclusive discounts.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Button title="NEXT" isLink={false} onClickHandler={nextPageClickHandler}/>
        </div>
    )
}