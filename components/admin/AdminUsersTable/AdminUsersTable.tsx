"use client"
import React, { useRef, useState } from "react"
import styles from "./AdminUsersTable.module.scss"
//@ts-ignore
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import UserClientService from "@/services/userClient.service";
import UserUtils from "@/utils/userUtils";
import { Sort_method, User_status } from "@/types/enums";


export default function AdminUsersTable({usersArr, cafeId}:{usersArr: IUser[], cafeId:number}) {    
    const [ users, setUsers ] = useState<IUser[]>(usersArr)
    const [ ascSort, setAscSort ] = useState<boolean>(false)
    const headingsRef = useRef<any[]>([]);
    const sortParams = ["status", "name", "phone", "email", "DOB", "created_at", "created_at", "created_at", "created_at", "created_at", "created_at", "created_at"]

    async function sortByParams(index: number){
        setAscSort(prev => !prev)
        
        await UserClientService.getSortedUsers(sortParams[index], (ascSort ? Sort_method.ASC : Sort_method.DESC))
                                .then(data => setUsers(data.users!))

        headingsRef.current.forEach(el => el.classList.remove(styles.asc, styles.desc))
        headingsRef.current[index].classList.add(ascSort ? styles.asc : styles.desc)
    }


    const headings = [
        "active",
        "name", 
        "Phone Number",
        "Email", 
        "Birthday",
        "Join Date", 
        "level / step", 
        "Benefits won", 
        "Benefits Redeemed", 
        "User-generated revenue", 
        "User overall saving",
        "number of visits last 30 days"
    ]

    function activeUserChange(e : React.ChangeEvent<HTMLInputElement>, id:number){
        const value = e.target.checked

        setUsers((prev:IUser[]) => {
            return prev.map((user:IUser) => {
                if (user.id === id) {
                    return { ...user, status: value ? User_status.ACTIVE : User_status.BLOCKED }
                }
                return user;
            });
        });        

        UserClientService.updateChecked(id, value)
    }
    


    return <div className={styles.user}>
        <div className={styles.top}>
            <h2>Users</h2>
            <ReactHTMLTableToExcel
                className="downloadUsers"
                table="table-to-xls"
                filename={`cafeId_${cafeId}_users`}
                sheet="users"
                buttonText="export"
            />
        </div>
        <div className={styles.tableWrapper}>
            <table id="table-to-xls" className={styles.table}>
                <thead>
                    <tr>
                        { headings.map((item, index) => <th ref={el => headingsRef.current[index] = el} role="button" onClick={() => sortByParams(index)} key={index}>{item}</th>) }
                    </tr>
                </thead>
                <tbody>
                    {users?.length > 0 && users.map((user : IUser) => {
                            return <tr key={user.id}>
                                        <td><input id={`check${user.id}`} onChange={(e) => activeUserChange(e, user.id)} checked={user.status === User_status.ACTIVE} type="checkbox" /><label htmlFor={`check${user.id}`}></label></td>
                                        <td>{user.name}</td>
                                        <td>+{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>{new Date(user.DOB!.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td>{new Date(user.created_at!.toString()).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td>{user.prizes.reduce((total:number, prize:IUserPrize) => total + (prize.expires_at !== null ? 1 : 0), 0)}</td>
                                        <td>{user.prizes.reduce((total:number, prize:IUserPrize) => total + (prize.is_won ? 1 : 0), 0)}</td>
                                        <td>{user.prizes.reduce((total:number, prize:IUserPrize) => total + (prize.used !== null ? 1 : 0), 0)}</td>
                                        <td>{user.prizes.reduce((total:number, prize:IUserPrize) => total + (prize.used !== null ? prize.prize.revenue : 0), 0)}</td>
                                        <td>{user.prizes.reduce((total:number, prize:IUserPrize) => total + (prize.used !== null ? prize.prize.cost : 0), 0)}</td>
                                        <td>{user.visits.reduce((total:number, visit:IVisit) => total + ((visit.cafe_id === cafeId) && (new Date(visit.visit_date.toString()).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime()) ? 1 : 0) , 0)}</td>
                                    </tr>
                        })
                    }
                    {users?.length === 0 && 
                        <tr><td>No users</td></tr>
                    }
                </tbody>
            </table>
        </div>
    </div>
}