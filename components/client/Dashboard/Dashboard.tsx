import DashboardCode from "./DashboardCode/DashboardCode"
import DashboardHeading from "./DashboardHeading/DashboardHeading"
import DashboardMain from "./DashboardMain/DashboardMain"

export default function Dashboard() {
    return <div className="dashboardMain">
        <DashboardHeading />
        <DashboardMain />
        <DashboardCode />
    </div>
}