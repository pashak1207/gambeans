import PrizeServerService from "@/services/prizeServer.service"
import PrizeScratch from "./PrizeSratch/PrizeSratch"
import "./Prize.scss"

export default async function Prize({prizeId}:{prizeId:string}) {
    const prize:IPrize = await PrizeServerService.getPrize(prizeId)

    return <div className="prize">
        {prize.type === "SCRATCH" ?
            <PrizeScratch prize={prize} />
            :
            prize.type === "SLOT" &&
            <div>slot</div>
        }
    </div>
}