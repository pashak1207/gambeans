import style from "./DashboardHeading.module.scss"
import Image from "next/image"
import AuthServerService from "@/services//authServer.service"
import Link from "next/link"

export default async function DashboardHeading() {
    

    const user = await AuthServerService.getMe()    

    return (
            <div className={style.dashboardheading}>
                <div className={style.left}>
                    <Image
                        alt="avatar"
                        width={40}
                        priority
                        height={40}
                        src={user.avatar}
                    />
                    <h4>{user.name}</h4>
                </div>
                <div className={style.right}>
                    <Link href={"/dashboard/prizes"}>Prizes</Link>
                </div>
            </div>
        )
}