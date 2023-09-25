import DashboardHeading from "@/components/client/Dashboard/DashboardHeading/DashboardHeading"
import styles from "./page.module.scss"
import DashboardPrizes from "@/components/client/Dashboard/DashboardPrizes/DashboardPrizes"

export default function Prizes() {
    return (
        <main>
            <section className={styles.prizes}>
                <DashboardHeading />
                <DashboardPrizes />
            </section>
        </main>
    )
}