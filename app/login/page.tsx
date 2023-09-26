import Login from "@/components/client/Login/Login";
import styles from "./page.module.scss"
import { headers } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function LoginPage() {

    const dict = await getDictionary(headers().get('x-language') || "en") 
    
    return (
        <main>
            <section className={styles.login}>
                <Login dictionary={dict.login} />
            </section>
        </main>
    )
}