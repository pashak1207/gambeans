import DashboardHeading from "@/components/client/Dashboard/DashboardHeading/DashboardHeading"
import styles from "./page.module.scss"
import DashboardPrizes from "@/components/client/Dashboard/DashboardPrizes/DashboardPrizes"
import { headers } from "next/headers"
import { getDictionary } from "@/dictionaries/dictionaries"

export default async function Prizes() {
    
    const dict = await getDictionary(headers().get('x-language') || "en") 

    return (
        <main>
            <section className={styles.prizes}>
                <DashboardHeading dictionary={dict.dashboard.heading} />
                <DashboardPrizes dictionary={dict.dashboard.prizes} />
            </section>
        </main>
    )
}