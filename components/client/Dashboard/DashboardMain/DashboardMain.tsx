import DashboardMainInner from "./DashboardMainInner/DashboardMainInner";
import AuthServerService from "@/services/authServer.service";

const bgImages = [
    "bg1.svg",
    "bg2.svg",
    "bg3.svg",
]

export default async function DashboardMain() {
    const prizes = await AuthServerService.getMe("prizes").then(data => data.prizes)    

    return <DashboardMainInner prizes={prizes} bgImages={bgImages}/>
}