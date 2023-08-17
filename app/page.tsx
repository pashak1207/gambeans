import styles from "./page.module.scss"
import Image from "next/image"
import Button from "@/components/ui/Button/Button"

interface IWelcomeProps{
    params: {
        cafe: string
    }
}

export default function WelcomePage({params:{cafe}}:IWelcomeProps) {
    return (
        <main className={styles.main}>
            <h5>WELCOME TO</h5>
            <Image 
                src="/logo.png"
                alt="logo"
                width={313}
                height={182}
            />
            <p>This is your {cafe}'s loyalty card, but cooler. More rewards. More fun. All right on your phone.</p>
            <Button title="NEXT" isLink={true} path={`/login`}/>
        </main>
    )
}