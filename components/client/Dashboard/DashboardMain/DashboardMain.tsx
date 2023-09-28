import { Main } from "@/dictionaries/type";
import DashboardMainInner from "./DashboardMainInner/DashboardMainInner";
import AuthServerService from "@/services/authServer.service";

const bgImages = [
    "bg1.svg",
    "bg2.svg",
    "bg3.svg",
]

export default async function DashboardMain({ dictionary }:{ dictionary:Main }) {
    const prizes = await AuthServerService.getMe("prizes").then((data) => data.prizes)  

    return <DashboardMainInner dictionary={dictionary} prizes={prizes} bgImages={bgImages}/>
}