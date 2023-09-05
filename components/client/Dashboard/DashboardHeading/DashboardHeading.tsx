"use client"

import style from "./DashboardHeading.module.scss"
import Image from "next/image"

export default function DashboardHeading() {
    return <div className={style.dashboardheading}>
        <div className={style.left}>
            <Image
                alt="avatar"
                width={40}
                height={40}
                src={"/avatar.png"}
            />
            <h4>Ron Dimyon</h4>
        </div>
        <div className={style.right}>
            <button>Prizes</button>
        </div>
    </div>
}