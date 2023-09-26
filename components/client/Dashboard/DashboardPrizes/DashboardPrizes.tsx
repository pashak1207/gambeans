import Link from "next/link";
import Image from "next/image";
import styles from "./DashboardPrizes.module.scss"
import UserServerService from "@/services/userServer.service";
import { Prizes } from "@/dictionaries/type";

export default async function DashboardPrizes({ dictionary }:{ dictionary:Prizes }) {

    const prizes = await UserServerService.getUserPrizes().then(data => data.prizes)

    return <div className={styles.prizes}>
                {prizes.length > 0 && <>
                <h2>{dictionary.titleStart}{prizes.length}{dictionary.titleEnd}</h2>
                <div className={styles.inner}>
                    {prizes?.length && prizes?.map((prize:IUserPrize) => {
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
                                <h4>{dictionary.won}</h4>
                            </div>
                            <h5>{new Date(prize.expires_at!).toLocaleDateString(`en-US`, { year: '2-digit', month: 'long', day: 'numeric' })}</h5>
                            </Link>
                        </div>
                    })}
                </div>
                </>}
                {!prizes.length && <h2>{dictionary.noPrizes}</h2>}
                <Link href={"/dashboard"}>{dictionary.button}</Link>
            </div>
}