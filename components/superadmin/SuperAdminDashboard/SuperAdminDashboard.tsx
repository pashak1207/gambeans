import UserServerService from "@/services/userServer.service"
import styles from "./SuperAdminDashboard.module.scss"
import CafeServerService from "@/services/cafeServer.service"
import StatisticDoughnutChart from "./StatisticDoughnutChart/StatisticDoughnutChart"
import StatisticLineChart from "./StatisticLineChart/StatisticLineChart"
import StatisticBlock from "@/components/ui/StatisticBlock/StatisticBlock"

const initData = [
    {title: "Registered users", num: 0, progress: 0},
    {title: "Daily visits", num: 0, progress: 0},
    {title: "New Users (7 day)", num: 0, progress: 0},
    {title: "Active Users (7 days)", num: 0, progress: 0},
    {title: "Active businesses", num: 0, progress: 0},
]


export default async function SuperAdminDashboard() {
    await UserServerService.getAllRegistratedUsersCount()
                    .then(data => initData[0].num = data.users)
    
    await CafeServerService.getDailyVisits()
                    .then(data => {
                        initData[1].num = data.count as number
                        initData[1].progress = data.progress as number
                    })

    await UserServerService.getNewUsersCount(7)
                    .then(data => {
                        initData[2].num = data.count
                        initData[2].progress = data.progress
                    })

    await UserServerService.getActiveUsersCount(7)
                    .then(data => {
                        initData[3].num = data.count
                        initData[3].progress = data.progress
                    })

    await CafeServerService.getAllCafesCount()
                    .then(data => initData[4].num = data.cafes as number)
                    
    
    return <section className={styles.superDashboard}>
        <h2>gamebeans - G&m dashboard</h2>
        <div className={styles.statisticBlocks}>
            {initData && initData.map((item, index) => <StatisticBlock title={item.title} num={item.num} progress={item.progress} key={index} />)}
        </div>
        <StatisticDoughnutChart />
        <StatisticLineChart />
    </section>
}