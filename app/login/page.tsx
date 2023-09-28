import Login from "@/components/client/Login/Login";
import styles from "./page.module.scss"
import { headers } from "next/headers";
import { getDictionary } from "@/dictionaries/dictionaries";

export default async function LoginPage() {

    const lang = headers().get('x-language') || "en"
    const dict = await getDictionary(lang) 
    
    return (
        <main>
            <section className={styles.login}>
                <Login lang={lang} dictionary={dict.login} />
            </section>
        </main>
    )
}