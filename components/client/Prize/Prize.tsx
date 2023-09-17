import PrizeScratch from "./PrizeSratch/PrizeSratch"
import "./Prize.scss"
import AuthServerService from "@/services/authServer.service"
import PrizeServerService from "@/services/prizeServer.service"
import { notFound } from 'next/navigation'

export default async function Prize({prizeId}:{prizeId:string}) {
    const userId = await AuthServerService.getMe().then(data => data.id)    
    const userprize:IUserPrize = await PrizeServerService.getUserPrize(userId, prizeId)
                                        .then(data => data?.prize)
    
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
                        <div>slot</div>
                    </div>
    }
}