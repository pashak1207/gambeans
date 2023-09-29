import { Main } from "@/dictionaries/type";
import DashboardMainInner from "./DashboardMainInner/DashboardMainInner";
import AuthServerService from "@/services/authServer.service";
import PrizeServerService from "@/services/prizeServer.service";

const bgImages = [
    "bg1.svg",
    "bg2.svg",
    "bg3.svg",
]

export default async function DashboardMain({ dictionary }:{ dictionary:Main }) {
    const prizes:IUserPrize[] = await AuthServerService.getMe("prizes").then((data) => data.prizes)
    
    try{
        if(!prizes.length){
            await PrizeServerService.getNewUserPrizes()
        }
    }catch(err){
        console.log("No prizes found: " + err);
        
    }

    return <DashboardMainInner dictionary={dictionary} prizes={prizes} bgImages={bgImages}/>
}