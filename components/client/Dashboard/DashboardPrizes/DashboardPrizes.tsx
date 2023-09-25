import Link from "next/link";
import Image from "next/image";
import styles from "./DashboardPrizes.module.scss"
import UserServerService from "@/services/userServer.service";

export default async function DashboardPrizes() {

    const prizes = await UserServerService.getUserPrizes().then(data => data.prizes)

    return <div className={styles.prizes}>
                {prizes.length > 0 && <>
                <h2>You won {prizes.length} prizes that have not yet been redeemed</h2>
                <div className={styles.inner}>
                    {prizes.length && prizes.map((prize:IUserPrize) => {
                        return <div key={prize.id} className={styles.item}>
                            <Link href={`/dashboard/${prize.id}`} >
                            <div className={styles.item__inner}>
                                <Image 
                                    width={166}
                                    height={100}
                                    alt="prize"
                                    src={prize.prize.image}
                                />
                                <h3>{prize.prize.text}</h3>
                                <h4>Yay! You’ve won 🎉</h4>
                            </div>
                            <h5>{new Date(prize.expires_at!).toLocaleDateString(`en-US`, { year: '2-digit', month: 'long', day: 'numeric' })}</h5>
                            </Link>
                        </div>
                    })}
                </div>
                </>}
                {!prizes.length && <h2>There are no prizes that have not been redeemed yet</h2>}
                <Link href={"/dashboard"}>Back to the home</Link>
            </div>
}