import style from "./Dashboard.module.scss"
import DashboardCode from "./DashboardCode/DashboardCode"
import DashboardHeading from "./DashboardHeading/DashboardHeading"
import DashboardMain from "./DashboardMain/DashboardMain"

export default function Dashboard() {
    return <div className={style.dashboard}>
        <DashboardHeading />
        <DashboardMain />
        <DashboardCode />
    </div>
}