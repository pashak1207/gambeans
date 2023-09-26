import styles from "./page.module.scss"
import Image from "next/image"
import Button from "@/components/ui/Button/Button"
import CafeServerService from "@/services/cafeServer.service"
import { getDictionary } from "@/dictionaries/dictionaries"
import { headers } from "next/headers"

export default async function WelcomePage() {
    const {cafe:{logo, name}} = await CafeServerService.getCafe()

    const dict = await getDictionary(headers().get('x-language') || "en")
    
    return (
        <main className={styles.main}>
            <h5>{dict.welcome.heading}</h5>
            <Image 
                src={logo}
                priority
                alt="logo"
                id={"welcomeLogo"}
                width={313}
                height={182}
            />
            <p>{dict.welcome.textStart}{name}{dict.welcome.textEnd}<br/>{dict.welcome.rewards}<br/>{dict.welcome.fun}<br/>{dict.welcome.rights}</p>
            <Button title={dict.welcome.button} isLink={true} path={`/login`}/>
        </main>
    )
}