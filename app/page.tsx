import styles from "./page.module.scss"
import Image from "next/image"
import Button from "@/components/ui/Button/Button"
import CafeServerService from "@/services/cafeServer.service"

export default async function WelcomePage() {
    const {cafe:{logo, name}} = await CafeServerService.getCafe()    
    
    return (
        <main className={styles.main}>
            <h5>Welcome to</h5>
            <Image 
                src={logo}
                priority
                alt="logo"
                id={"welcomeLogo"}
                width={313}
                height={182}
            />
            <p>This is your {name}'s loyalty card, but cooler.<br/>More rewards.<br/>More fun.<br/>All right on your phone.</p>
            <Button title="NEXT" isLink={true} path={`/login`}/>
        </main>
    )
}