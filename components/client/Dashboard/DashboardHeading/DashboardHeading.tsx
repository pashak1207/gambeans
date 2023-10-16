import style from "./DashboardHeading.module.scss"
import Image from "next/image"
import AuthServerService from "@/services//authServer.service"
import Link from "next/link"
import { Heading } from "@/dictionaries/type"
import { headers } from "next/headers"

export default async function DashboardHeading({ dictionary }:{ dictionary:Heading }) {
    

    const user:IUser = await AuthServerService.getMe() as IUser
    const lang = headers().get('x-language') || "en"    

    return (
            <div className={`${style.dashboardheading} ${lang==="he" ? style.rtl : ""}`}>
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
                    <a href={"/dashboard/prizes"} >{dictionary.prizes}</a>
                </div>
            </div>
        )
}