import PrizeScratch from "./PrizeSratch/PrizeSratch"
import "./Prize.scss"
import AuthServerService from "@/services/authServer.service"
import PrizeServerService from "@/services/prizeServer.service"
import { notFound } from 'next/navigation'
import PrizeSlot from "./PrizeSlot/PrizeSlot"
import { headers } from "next/headers"
import { getDictionary } from "@/dictionaries/dictionaries"

export default async function Prize({prizeId}:{prizeId:string}) {
    const userId = await AuthServerService.getMe().then(data => data.id)    
    const userprize:IUserPrize = await PrizeServerService.getUserPrize(userId, prizeId)
                                        .then(data => data?.prize) as IUserPrize

    const lang = headers().get('x-language') || "en"
    const dict = await getDictionary(lang) 

    if(!userprize){
        notFound()
    }
    
    switch(userprize.prize.type){
        case "SCRATCH":
            return <div className="prize">
                        <PrizeScratch lang={lang} dictionary={dict.dashboard.prize} userprize={userprize} />
                    </div>
        case "FREE":
            return <div className="prize">
                        <PrizeScratch lang={lang} dictionary={dict.dashboard.prize} userprize={userprize} />
                    </div>
        case "SLOT":
            return <div className="prize">
                        <PrizeSlot lang={lang} dictionary={dict.dashboard.prize} userprize={userprize} />
                    </div>
        case "FIRST":
            return <div className="prize">
                        <PrizeScratch lang={lang} dictionary={dict.dashboard.prize} userprize={userprize} />
                    </div>
    }
}