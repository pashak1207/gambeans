"use client"
import React, { useState } from "react"
import styles from "./AdminPrizeTable.module.scss"
import PrizeClientService from "@/services/prizeClient.service"
import EditableText from "@/components/ui/EditableText/EditableText"

enum Prize_change_fields {
    TEXT="TEXT",
    IMAGE="IMAGE",
    EXPIRES="EXPIRES",
    COST="COST",
    REVENUE="REVENUE",
    PROBABILITY="PROBABILITY",
    MAX_AMOUNT="MAX_AMOUNT",
}

export default function AdminPrizeTable({prizesArr, type, cafeId}:{prizesArr: IPrize[], type:string, cafeId:number}) {    
    const [ prizes, setPrizes ] = useState<IPrize[]>(prizesArr)    
    const headings = ["active","benefit name", "photo", "benefit id", "duration", "cost", "revenue value", "probability", "number get", "number used"]

    function activePrizeChange(e : React.ChangeEvent<HTMLInputElement>, id:number){
        const value = e.target.checked

        setPrizes((prev:IPrize[]) => {
            return prev.map((prize:IPrize) => {
              if (prize.id === id) {
                return { ...prize, is_active: value }
              }
              return prize;
            });
        });

        PrizeClientService.updateChecked(id, value)
    }
    

    function addNewPrize(){        
        const newPrize:IPrize = {
            id: prizes[0]?.id ? (prizes[0]?.id + 1) : 0,
            cafe_id: cafeId,
            cost: 0,
            discount: 0,
            image: "Add image",
            is_active: true,
            max_amount: 0,
            created_at: new Date().toISOString(),
            expires_at: 1,
            probability: 0,
            revenue: 0,
            step_image: "",
            text: "Add text",
            type: type as Prize_type,
        }
        setPrizes((prev:IPrize[]) => [...prev, newPrize]);      
    }

    return <div className={styles.prize}>
        <div className={styles.top}>
            <h2>Scratch Card benefits</h2>
            <button onClick={addNewPrize}>Add</button>
        </div>
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headings.length && headings.map((item, index) => <th key={index}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {prizes?.length && prizes.map((prize : IPrize, index : number) => {
                            return <tr key={index}>
                                <td><input id={`check${index}`} onChange={(e) => activePrizeChange(e, prize.id)} checked={prize.is_active} type="checkbox" /><label htmlFor={`check${index}`}></label></td>
                                <td><EditableText setPrizes={setPrizes} type={Prize_change_fields.TEXT} prizeId={prize.id} initialText={prize.text} /></td>
                                <td><EditableText setPrizes={setPrizes} type={Prize_change_fields.IMAGE} prizeId={prize.id} initialText={prize.image} /></td>
                                <td>{prize.id}</td>
                                <td><EditableText setPrizes={setPrizes} type={Prize_change_fields.EXPIRES} prizeId={prize.id} initialText={prize.expires_at.toString()} />day(s)</td>
                                <td><EditableText setPrizes={setPrizes} type={Prize_change_fields.COST} prizeId={prize.id} initialText={prize.cost.toString()} /></td>
                                <td><EditableText setPrizes={setPrizes} type={Prize_change_fields.REVENUE} prizeId={prize.id} initialText={prize.revenue.toString()} /></td>
                                <td><EditableText setPrizes={setPrizes} type={Prize_change_fields.PROBABILITY} prizeId={prize.id} initialText={prize.probability.toString()} /></td>
                                <td><EditableText setPrizes={setPrizes} type={Prize_change_fields.MAX_AMOUNT} prizeId={prize.id} initialText={prize.max_amount.toString()} /></td>
                                <td>{prize.users?.reduce((total:number, userprize: IUserPrize) => total + (userprize.used !== null ? 1 : 0) , 0) || 0}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
}