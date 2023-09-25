import PrizeScratch from "./PrizeSratch/PrizeSratch"
import "./Prize.scss"
import AuthServerService from "@/services/authServer.service"
import PrizeServerService from "@/services/prizeServer.service"
import { notFound } from 'next/navigation'
import PrizeSlot from "./PrizeSlot/PrizeSlot"
import CafeServerService from "@/services/cafeServer.service"

export default async function Prize({prizeId}:{prizeId:string}) {
    const userId = await AuthServerService.getMe().then(data => data.id)    
    const userprize:IUserPrize = await PrizeServerService.getUserPrize(userId, prizeId)
                                        .then(data => data?.prize)
    const currentCafeFTW = await CafeServerService.getCafe().then(data => data?.cafe?.ftw)    

    if(!userprize){
        notFound()
    }
    
    switch(userprize.prize.type){
        case "SCRATCH":
            return <div className="prize">
                        <PrizeScratch userprize={userprize} />
                    </div>
        case "FREE":
            return <div className="prize">
                        <PrizeScratch userprize={userprize} />
                    </div>
        case "SLOT":
            return <div className="prize">
                        <PrizeSlot ftw={currentCafeFTW} userprize={userprize} />
                    </div>
        case "FIRST":
            return <div className="prize">
                        <PrizeScratch userprize={userprize} />
                    </div>
    }
}