"use client"
import React, { useState } from "react"
import styles from "./AdminPrizeTable.module.scss"
import PrizeClientService from "@/services/prizeClient.service"
import EditableText from "@/components/ui/EditableText/EditableText"
import ImagePrizeUpload from "@/components/ui/ImagePrizeUpload/ImagePrizeUpload"
import PrizeUtils from "@/utils/prizeUtils"

enum Prize_Cafe_change_fields {
    TEXT="TEXT",
    EXPIRES="EXPIRES",
    COST="COST",
    REVENUE="REVENUE",
    PROBABILITY="PROBABILITY",
    MAX_AMOUNT="MAX_AMOUNT",
    
    HEB_DOMAIN="HEB_DOMAIN",
    ENG_DOMAIN="ENG_DOMAIN",
    EMAIL="EMAIL",
    ADDRESS="ADDRESS",
    NAME="NAME",
    CONTACT_PHONE="CONTACT_PHONE",
    CONTACT_NAME="CONTACT_NAME"
}

enum Prize_type {
    SCRATCH = "SCRATCH",
    SLOT = "SLOT",
    FREE = "FREE",
    FIRST = "FIRST",
}

export default function AdminPrizeTable({prizesArr, type, cafeId}:{prizesArr: IPrize[], type:string, cafeId:number}) {    
    const [ prizes, setPrizes ] = useState<IPrize[]>(prizesArr)    
    const headings = [
        "active",
        "benefit name", 
        "photo", 
        "benefit id", 
        "duration", 
        "cost", 
        "revenue value", 
        type === "SLOT" ? "probability out ot FTW" : "probability", 
        "number get", 
        "number used"
    ]

    const freeHeadings = [
        "active",
        "benefit name", 
        "photo", 
        "benefit id", 
        "duration", 
        "cost", 
        "probability", 
        "number get", 
        "number used"
    ]

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
            image: "",
            is_active: false,
            max_amount: 0,
            created_at: new Date().toISOString(),
            expires_at: 1,
            probability: 0,
            revenue: 0,
            step_image: PrizeUtils.generatePrizeStepImage(type as Prize_type),
            text: "Add text",
            type: type as Prize_type,
        }

        setPrizes((prev:IPrize[]) => [ newPrize, ...prev ]);
        
        PrizeClientService.createPrize(newPrize)
    }

    return <div className={styles.prize}>
        <div className={styles.top}>
            <h2>{type.toLowerCase()} Card benefits</h2>
            <button onClick={addNewPrize}>Add</button>
        </div>
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        { (type === "SCRATCH" || type === "SLOT") ? 
                            headings.map((item, index) => <th key={index}>{item}</th>) :
                            freeHeadings.map((item, index) => <th key={index}>{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {prizes?.length > 0 && prizes.map((prize : IPrize) => {
                            return <tr key={prize.id}>
                                <td><input id={`check${prize.id}`} onChange={(e) => activePrizeChange(e, prize.id)} checked={prize.is_active} type="checkbox" /><label htmlFor={`check${prize.id}`}></label></td>
                                <td><EditableText isPrize setPrizes={setPrizes} type={Prize_Cafe_change_fields.TEXT} prizeId={prize.id} initialText={prize.text} /></td>
                                <td><ImagePrizeUpload prizeId={prize.id} title={prize.image} /></td>
                                <td>{prize.id}</td>
                                <td><EditableText isPrize setPrizes={setPrizes} type={Prize_Cafe_change_fields.EXPIRES} prizeId={prize.id} initialText={prize.expires_at.toString()} /> day(s)</td>
                                <td><EditableText isPrize setPrizes={setPrizes} type={Prize_Cafe_change_fields.COST} prizeId={prize.id} initialText={prize.cost.toString()} /></td>
                                {(type === "SCRATCH" || type === "SLOT") ? <td><EditableText isPrize setPrizes={setPrizes} type={Prize_Cafe_change_fields.REVENUE} prizeId={prize.id} initialText={prize.revenue.toString()} /></td> : ""}
                                <td><EditableText isPrize setPrizes={setPrizes} type={Prize_Cafe_change_fields.PROBABILITY} prizeId={prize.id} initialText={prize.probability.toString()} /></td>
                                <td><EditableText isPrize setPrizes={setPrizes} type={Prize_Cafe_change_fields.MAX_AMOUNT} prizeId={prize.id} initialText={prize.max_amount.toString()} /></td>
                                <td>{prize.users?.reduce((total:number, userprize: IUserPrize) => total + (userprize.used !== null ? 1 : 0) , 0) || 0}</td>
                            </tr>
                        })
                    }
                    {prizes?.length === 0 && 
                        <tr><td>No prizes</td></tr>
                    }
                </tbody>
            </table>
        </div>
    </div>
}