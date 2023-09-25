import { userStepsToPersentage } from "@/utils/userStepsToPersentage"
import styles from "./StatisticDoughnutChart.module.scss"
import { StatisticDoughnut } from "./StatisticDoughnut/StatisticDoughnut"

export default async function StatisticDoughnutChart() {
    const initData = [2, 1, 34, 32, 17, 12, 21, 44, 67, 43, 23, 43, 22, 43, 22, 43, 22, 43, 22, 43, 22,]

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