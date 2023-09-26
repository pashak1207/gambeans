import PrizeScratch from "./PrizeSratch/PrizeSratch"
import "./Prize.scss"
import AuthServerService from "@/services/authServer.service"
import PrizeServerService from "@/services/prizeServer.service"
import { notFound } from 'next/navigation'
import PrizeSlot from "./PrizeSlot/PrizeSlot"
import CafeServerService from "@/services/cafeServer.service"
import { headers } from "next/headers"
import { getDictionary } from "@/dictionaries/dictionaries"

export default async function Prize({prizeId}:{prizeId:string}) {
    const userId = await AuthServerService.getMe().then(data => data.id)    
    const userprize:IUserPrize = await PrizeServerService.getUserPrize(userId, prizeId)
                                        .then(data => data?.prize)
    const currentCafeFTW = await CafeServerService.getCafe().then(data => data?.cafe?.ftw)

    const dict = await getDictionary(headers().get('x-language') || "en") 

    if(!userprize){
        notFound()
    }
    
    switch(userprize.prize.type){
        case "SCRATCH":
            return <div className="prize">
                        <PrizeScratch dictionary={dict.dashboard.prize} userprize={userprize} />
                    </div>
        case "FREE":
            return <div className="prize">
                        <PrizeScratch dictionary={dict.dashboard.prize} userprize={userprize} />
                    </div>
        case "SLOT":
            return <div className="prize">
                        <PrizeSlot dictionary={dict.dashboard.prize} ftw={currentCafeFTW} userprize={userprize} />
                    </div>
        case "FIRST":
            return <div className="prize">
                        <PrizeScratch dictionary={dict.dashboard.prize} userprize={userprize} />
                    </div>
    }
}