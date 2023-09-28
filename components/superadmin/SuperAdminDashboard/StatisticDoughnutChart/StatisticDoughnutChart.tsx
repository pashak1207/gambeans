import { userStepsToPersentage } from "@/utils/userStepsToPersentage"
import styles from "./StatisticDoughnutChart.module.scss"
import CafeServerService from "@/services/cafeServer.service"
// import { StatisticDoughnut } from "./StatisticDoughnut/StatisticDoughnut"

export default async function StatisticDoughnutChart() {
    const initData = await CafeServerService.getUsersStages().then(data => data.users?.map(item => item._count.prizes)) as number[]   

    const percentageData = userStepsToPersentage(initData)

    return <div className={styles.statisticDoughnutChart}>
            <h4>User by stage</h4>
            <div className={styles.chartWrapper}>
                <div className={styles.chart}>
                    {/* <StatisticDoughnut percentageData={percentageData}/> */}
                </div>
                <table className={styles.data}>
                    <tbody>
                        {percentageData.map(item => 
                            <tr key={+item.sum}>
                                <th><span style={{background: item.color}}></span>{item.filter}</th>
                                <th>{item.sum}%</th>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    </div>
}