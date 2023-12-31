import UserServerService from "@/services/userServer.service";
import { StatisticLine } from "./StatisticLine/StatisticLine"
import styles from "./StatisticLineChart.module.scss"

export default async function StatisticLineChart() {

    const dataCounts = await UserServerService.getActiveYearUsersCount().then(data => data.counts) as number[]

    return <div className={styles.statisticLineChart}>
                <h4>Active user by time</h4>
                <div className={styles.chart}>
                    <StatisticLine dataCounts={dataCounts} />
                </div>
            </div>
}