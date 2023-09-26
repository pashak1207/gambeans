import { headers } from "next/headers"
import DashboardCode from "./DashboardCode/DashboardCode"
import DashboardHeading from "./DashboardHeading/DashboardHeading"
import DashboardMain from "./DashboardMain/DashboardMain"
import { getDictionary } from "@/dictionaries/dictionaries"

export default async function Dashboard() {
    
    const dict = await getDictionary(headers().get('x-language') || "en") 

    return <div className="dashboardMain">
        <DashboardHeading dictionary={dict.dashboard.heading} />
        <DashboardMain dictionary={dict.dashboard.main} />
        <DashboardCode dictionary={dict.dashboard.code} />
    </div>
}