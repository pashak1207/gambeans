import Dashboard from "@/components/client/Dashboard/Dashboard";
import styles from "./page.module.scss"

export default function DashboardPage() {
    return (
        <main>
            <section className={styles.dashboard}>
                <Dashboard />
            </section>
        </main>
    )
}