import Link from "next/link"
import styles from "./SuperAdminCafes.module.scss"
import { headers } from 'next/headers'

export default async function SuperAdminCafes({cafes}:{cafes: ICafe[]}) {    
    
    const headings = ["coffee shop name", "Daily code Phone Number", "daily code", "Registered user", "Benefits Redeemed", "User-generated revenue", "active user (7 days)", "cafe environment - HBR", "cafe environment - ENG", "Join Date", "contact name", "contact Phone Number"]
    const proto = headers().has("x-forwarded-proto") ? "https://" : "http://";

    return <div className={styles.superCafes}>
        <div className={styles.top}>
            <h2>Coffee Shops</h2>
            <Link href={"./create"}>Add</Link>
        </div>
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th><input id="mainCheck" type="checkbox" /><label htmlFor="mainCheck"></label></th>
                        {headings.length && headings.map((item, index) => <th key={index}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {cafes?.length && cafes.map((item : ICafe, index : number) => {
                            return <tr key={index}>
                                <td><input id={`check${index}`} type="checkbox" /><label htmlFor={`check${index}`}></label></td>
                                <td>{item.name}</td>
                                <td>{item.send_phone}</td>
                                <td>{item.daily_code}</td>
                                <td>{item.users?.length || "-"}</td>
                                <td>{item.users?.reduce((total:number, user:IUser) => total + (user.prizes.length ? user.prizes?.filter((prize:IUserPrize) => prize.used !== null).length : 0), 0) || "-"}</td>
                                <td>{"$" + item.users?.reduce((total:number, user:IUser) => total + (user.prizes.length ? user.prizes?.reduce((total:number, prize:IUserPrize) => total + prize.prize.revenue, 0) : 0), 0) || "-"}</td>
                                <td>{item.users?.length && item.users?.filter((user:IUser) => user.visits.find((visit:IVisit) => new Date(visit.visit_date).getTime() > new Date().setDate(new Date().getDate() - 7))).length || "-"}</td>
                                <td>{item?.link_heb && <Link target="_blank" href={ proto + item?.link_heb }>{item?.link_heb}</Link> || "-"}</td>
                                <td>{item?.link_eng && <Link target="_blank" href={ proto + item?.link_eng }>{item?.link_eng}</Link> || "-"}</td>
                                <td>{new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                <td>{item?.contact_name || "-"}</td>
                                <td>{item?.contact_phone || "-"}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
}