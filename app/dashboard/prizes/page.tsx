import DashboardHeading from "@/components/client/Dashboard/DashboardHeading/DashboardHeading"
import styles from "./page.module.scss"
import DashboardPrizes from "@/components/client/Dashboard/DashboardPrizes/DashboardPrizes"
import { headers } from "next/headers"
import { getDictionary } from "@/dictionaries/dictionaries"

export default async function Prizes() {
    
    const lang = headers().get('x-language') || "en"
    const dict = await getDictionary(lang) 

    return (
        <main>
            <section className={styles.prizes}>
                <DashboardHeading dictionary={dict.dashboard.heading} />
                <DashboardPrizes lang={lang} dictionary={dict.dashboard.prizes} />
            </section>
        </main>
    )
}