"use client"
import React, { useEffect, useRef, useState } from "react"
import styles from "./AdminPrizeTable.module.scss"
import PrizeClientService from "@/services/prizeClient.service"
import EditableText from "@/components/ui/EditableText/EditableText"
import ImagePrizeUpload from "@/components/ui/ImagePrizeUpload/ImagePrizeUpload"
import PrizeUtils from "@/utils/prizeUtils"
import { Prize_type, Sort_method } from "@/types/enums"

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

export default function AdminPrizeTable({prizesArr, type, cafeId}:{prizesArr: IPrize[], type:string, cafeId:number}) {    
    const [ prizes, setPrizes ] = useState<IPrize[]>(prizesArr)
    const [ ascSort, setAscSort ] = useState<boolean>(false)
    const headingsRef = useRef<any[]>([]);
    const sortParams = ["is_active", "text", "image", "id", "expires_at", "cost", "revenue", "max_amount", "current_amount"]



    const headings = (type === "SCRATCH" || type === "SLOT") ? [
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
    ] :[
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

    async function sortByParams(index: number){
        setAscSort(prev => !prev)

        await PrizeClientService.getSortedPrizes(sortParams[index], (ascSort ? Sort_method.ASC : Sort_method.DESC), type)
                                .then(data => setPrizes(data.prizes!))

        headingsRef.current.forEach(el => el.classList.remove(styles.asc, styles.desc))
        headingsRef.current[index].classList.add(ascSort ? styles.asc : styles.desc)
    }
    

    async function addNewPrize(){        
        const newPrize:IPrize = {
            id: prizes[0]?.id ? (prizes.sort((a:IPrize,b:IPrize) => b.id - a.id)[0]?.id + 1) : 0,
            cafe_id: cafeId,
            cost: 0,
            image: "",
            is_active: false,
            max_amount: 0,
            current_amount: 0,
            created_at: new Date().toISOString(),
            expires_at: 1,
            probability: 0,
            revenue: 0,
            step_image: PrizeUtils.generatePrizeStepImage(type as Prize_type),
            text: "Add text",
            type: type as Prize_type,
        }

        setPrizes((prev:IPrize[]) => [ newPrize, ...prev ]);
        
        const createdPrize = await PrizeClientService.createPrize(newPrize).then(data => data.prize)

        setPrizes((prev:IPrize[]) => prev.map((prize:IPrize) => {
            if(prize.id === 0){
                return {...prize, ...createdPrize}
            }
            return {...prize}
        }));
        
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
                        { headings.map((item, index) => <th ref={el => headingsRef.current[index] = el} role="button" onClick={() => sortByParams(index)} key={index}>{item}</th>) }
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