import Login from "@/components/client/Login/Login";
import styles from "./page.module.scss"

export default function LoginPage() {
    return (
        <main>
            <section className={styles.login}>
                <Login/>
            </section>
        </main>
    )
}