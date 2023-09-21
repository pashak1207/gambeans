import CafeServerService from "@/services/cafeServer.service"
import styles from "./AdminCafe.module.scss"
import { notFound } from "next/navigation"
import Image from "next/image"
import { headers } from "next/headers"
import StatisticBlock from "@/components/ui/StatisticBlock/StatisticBlock"
import UserUtils from "@/utils/userUtils"
import { calculatePercentage } from "@/utils/calculatePercentage"

export default async function AdminCafe({cafeId}:{cafeId?:number}) {

    const cafe:ICafe = cafeId ? await CafeServerService.getCafe(cafeId).then(data => data.cafe) : await CafeServerService.getCafe().then(data => data.cafe)

    if(!cafe){
        notFound()
    } 

    
    const proto = headers().has("x-forwarded-proto") ? "https://" : "http://";
    const prevDayVisits = cafe.visits?.filter((visit:IVisit) => ( new Date(visit.visit_date).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 1)))).getTime()) && (new Date(visit.visit_date).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 2)))).getTime())).length
    const currDayVisits = cafe.visits?.filter((visit:IVisit) => ( new Date(visit.visit_date).getTime() < new Date(UserUtils.getStartOfDay(new Date())).getTime()) && (new Date(visit.visit_date).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 1)))).getTime())).length
    const currNewUsers7 = cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)))).getTime()) && ((new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date()))).getTime()))).length
    const prevNewUsers7 = cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 14)))).getTime()) && ((new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)))).getTime()))).length
    const currReturnedUsers7 = cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)))).getTime()) && (new Date(user.updated_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)))).getTime())).length
    const prevReturnedUsers7 = cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 14)))).getTime()) && (new Date(user.updated_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 14)))).getTime())).length! - currReturnedUsers7!
    const revenue = cafe.users?.reduce((total:number, user:IUser) => total + user.prizes.reduce((total:number, prize:IUserPrize) => total + (prize.used !== null ? prize.prize.revenue : 0), 0), 0)
    const revenue30 = cafe.users?.reduce((total:number, user:IUser) => total + user.prizes.reduce((total:number, prize:IUserPrize) => total + ((prize.used !== null && (new Date(prize.used).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime())) ? prize.prize.revenue : 0), 0), 0)
    const revenuePrev30 = cafe.users?.reduce((total:number, user:IUser) => total + user.prizes.reduce((total:number, prize:IUserPrize) => total + ((prize.used !== null && (new Date(prize.used).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 60)))).getTime())) ? prize.prize.revenue : 0), 0), 0)! - revenue30!
    const currNewUsers30 = cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime()) && ((new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date()))).getTime()))).length
    const prevNewUsers30 = cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 60)))).getTime()) && ((new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime()))).length
    const currReturnedUsers30 = cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime()) && (new Date(user.updated_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime())).length
    const prevReturnedUsers30 = cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 60)))).getTime()) && (new Date(user.updated_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime())).length! - currReturnedUsers30!   

    return <div className={styles.adminCafe}>
                <div className={styles.top}>
                    <h1>{cafe.name}</h1>
                    <a href="/edit">Edit</a>
                </div>
                <div className={styles.middle}>
                    <div className={styles.middle__left}>
                        <Image 
                            alt="logo"
                            width={270}
                            height={155}
                            src={cafe.logo}
                        />
                        {cafe.link_heb && <>
                        <h5>HBR environment Url:</h5>
                        <a href={proto + cafe.link_heb}>{cafe.link_heb}</a>
                        </>}
                        {cafe.link_eng && <>
                            <h5>ENG environment Url:</h5>
                            <a href={proto + cafe.link_eng}>{cafe.link_eng}</a>
                        </>}
                    </div>
                    <div className={styles.middle__right}>
                        <ul>
                            <li><span>Logo color: </span>{cafe.color}</li>
                            <li><span>Environment version used : </span>????</li>
                            <li><span>Mail: </span>{cafe.email}</li>
                            <li><span>Address: </span>{cafe.address || "-"}</li>
                            <li><span>Join on: </span>{new Date(cafe.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit'})}</li>
                            <li><span>Contact name: </span>{cafe.contact_name || "-"}</li>
                            <li><span>Contact phone: </span>{cafe.contact_phone || "-"}</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.blocks}>
                    <div className={styles.blocks__top}>
                        <div></div>
                        <StatisticBlock title="Daily code phone" num={cafe.send_phone} progress={0} />
                        <StatisticBlock title="Daily code" num={cafe.daily_code.split('').join('-')} progress={0} />
                        <div></div>
                    </div>
                    <div className={styles.blocks__bottom}>
                        <StatisticBlock title="Registered users" num={cafe.users?.length!} progress={0} />
                        <StatisticBlock title="Daily visits" num={currDayVisits!} progress={calculatePercentage(prevDayVisits!, currDayVisits!)} />
                        <StatisticBlock title="New Users (7 day)" num={currNewUsers7!} progress={calculatePercentage(prevNewUsers7!, currNewUsers7!)} />
                        <StatisticBlock title="Returned Users (7 days)" num={currReturnedUsers7!} progress={calculatePercentage(prevReturnedUsers7!, currReturnedUsers7!)} />
                        <StatisticBlock title="Revenue trough us" num={revenue!} progress={0} />
                        <StatisticBlock title="Revenue trough us (30 days)" num={revenue30!} progress={calculatePercentage(revenuePrev30!, revenue30!)} />
                        <StatisticBlock title="New Users (30 day)" num={currNewUsers30!} progress={calculatePercentage(prevNewUsers30!, currNewUsers30!)} />
                        <StatisticBlock title="Returned Users (30 days)" num={currReturnedUsers30!} progress={calculatePercentage(prevReturnedUsers30!, currReturnedUsers30!)} />
                    </div>
                </div>
            </div>
}