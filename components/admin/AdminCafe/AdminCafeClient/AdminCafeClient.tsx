"use client"

import styles from "./AdminCafeClient.module.scss"
import StatisticBlock from "@/components/ui/StatisticBlock/StatisticBlock"
import UserUtils from "@/utils/userUtils"
import { calculatePercentage } from "@/utils/calculatePercentage"
import AdminPrizeTable from "../../AdminPrizeTable/AdminPrizeTable"
import React, { useState } from "react"
import CafeClientService from "@/services/cafeClient.service"
import ColorPicker from "@/components/ui/ColorPicker/ColorPicker"
import EditableText from "@/components/ui/EditableText/EditableText"
import ImageCafeUpload from "@/components/ui/ImageCafeUpload/ImageCafeUpload"
import AdminUsersTable from "../../AdminUsersTable/AdminUsersTable"
import Dropdown from "@/components/ui/Dropdown/Dropdown"
import { Env_version } from "@/types/enums"
import { Cafe } from "@/dictionaries/type"
import { toast } from "react-toastify"

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
    CONTACT_NAME="CONTACT_NAME",
    FTW="FTW",
    DAILY_PHONE="DAILY_PHONE",
}

export default function AdminCafeClient({ cafeObj, proto, isCreate, dictionary, lang }:{ cafeObj:ICafe, proto:string, isCreate?:boolean, dictionary:Cafe, lang:string }) {

    const [ cafe, setCafe ] = useState<ICafe>(cafeObj)
    const [ isEdit, setIsEdit ] = useState<boolean>(!!isCreate)
    const [ valid, setValid ] = useState<string>("")
    
    const prevDayVisits = isCreate ? null : cafe.visits?.filter((visit:IVisit) => ( new Date(visit.visit_date).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 1)))).getTime()) && (new Date(visit.visit_date).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 2)))).getTime())).length
    const currDayVisits = isCreate ? null : cafe.visits?.filter((visit:IVisit) => ( new Date(visit.visit_date).getTime() < new Date(UserUtils.getStartOfDay(new Date())).getTime()) && (new Date(visit.visit_date).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 1)))).getTime())).length
    const currNewUsers7 = isCreate ? null : cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)))).getTime()) && ((new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date()))).getTime()))).length
    const prevNewUsers7 = isCreate ? null : cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 14)))).getTime()) && ((new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)))).getTime()))).length
    const currReturnedUsers7 = isCreate ? null : cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)))).getTime()) && (new Date(user.updated_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 7)))).getTime())).length
    const prevReturnedUsers7 = isCreate ? null : cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 14)))).getTime()) && (new Date(user.updated_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 14)))).getTime())).length! - currReturnedUsers7!
    const revenue = isCreate ? null : cafe.users?.reduce((total:number, user:IUser) => total + user.prizes.reduce((total:number, prize:IUserPrize) => total + ((prize.used !== null && prize.is_won) ? prize.prize.revenue : 0), 0), 0)
    const revenue30 = isCreate ? null : cafe.users?.reduce((total:number, user:IUser) => total + user.prizes.reduce((total:number, prize:IUserPrize) => total + (((prize.used !== null && prize.is_won) && (new Date(prize.used).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime())) ? prize.prize.revenue : 0), 0), 0)
    const revenuePrev30 = isCreate ? null : cafe.users?.reduce((total:number, user:IUser) => total + user.prizes.reduce((total:number, prize:IUserPrize) => total + ((prize.used !== null && (new Date(prize.used).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 60)))).getTime())) ? prize.prize.revenue : 0), 0), 0)! - revenue30!
    const currNewUsers30 = isCreate ? null : cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime()) && ((new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date()))).getTime()))).length
    const prevNewUsers30 = isCreate ? null : cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 60)))).getTime()) && ((new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime()))).length
    const currReturnedUsers30 = isCreate ? null : cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime()) && (new Date(user.updated_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime())).length
    const prevReturnedUsers30 = isCreate ? null : cafe.users?.filter((user:IUser) => (new Date(user.created_at).getTime() < new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 60)))).getTime()) && (new Date(user.updated_at).getTime() > new Date(UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 30)))).getTime())).length! - currReturnedUsers30!       


    async function editSaveBtn(){
        
        if(!UserUtils.validateEmail(cafe.email)){                        
            setValid("Please enter valid email address")
            toast(valid, {
                position: "top-center",
            })          
            return
        }
        if(!(UserUtils.validatePhoneWithPlus(cafe.contact_phone!) && UserUtils.validatePhoneWithPlus(cafe.send_phone))){
            setValid("Please enter valid phone number")
            toast(valid, {
                position: "top-center",
            })
            return
        }
        if(!UserUtils.validateName(cafe.contact_name!)){
            setValid("Please enter valid contact name")
            toast(valid, {
                position: "top-center",
            })
            return
        }
        if(!UserUtils.validateNumber(cafe.ftw.toString())){
            setValid("Please enter valid FTW number (0 - 100)")
            toast(valid, {
                position: "top-center",
            })
            return
        }

        setValid("")

        setIsEdit(prev => !prev)

        if(isEdit){
            if(isCreate){          
                await CafeClientService.createCafe(cafe).then(data => window.location.href = "/superadmin/cafes")
            }else{
                CafeClientService.updateCafe(cafe)
            }
        }
    }

    return <div className={styles.adminCafe}>
                <div className={styles.top}>
                    <h1>{isEdit ? <EditableText type={Prize_Cafe_change_fields.NAME} initialText={cafe.name} isPrize={false} setCafe={setCafe} /> : cafe.name}</h1>
                    <button onClick={editSaveBtn}>{ isEdit ? "Save" : "Edit" }</button>
                </div>
                <div className={`${styles.middle} ${lang==="he" ? styles.rtl : ""}`}>
                    <div className={styles.middle__left}>
                        <ImageCafeUpload setCafe={setCafe} editable={isEdit} url={cafe.logo} />
                        {(cafe.link_heb || isEdit) && <>
                            <h5>{dictionary.hbrEnv}</h5>
                            <a onClick={e => {if(isEdit) e.preventDefault()}} href={proto + cafe.link_heb}>{isEdit ? <EditableText type={Prize_Cafe_change_fields.HEB_DOMAIN} initialText={(cafe.link_heb || "Enter HEB domain")} isPrize={false} setCafe={setCafe} /> : (cafe.link_heb || "Enter HEB domain")}</a>
                        </>}
                        {(cafe.link_eng || isEdit) && <>
                            <h5>{dictionary.engEnv}</h5>
                            <a onClick={e => {if(isEdit) e.preventDefault()}} href={proto + cafe.link_eng}>{isEdit ? <EditableText type={Prize_Cafe_change_fields.ENG_DOMAIN} initialText={(cafe.link_eng || "Enter ENG domain")} isPrize={false} setCafe={setCafe} /> : (cafe.link_eng || "Enter ENG domain")}</a>
                        </>}
                    </div>
                    <div className={styles.middle__right}>
                        <ul>
                            <li><span>{dictionary.logoColor}</span>{cafe.color} {isEdit ? <ColorPicker colorStr={cafe.color} setCafe={setCafe}/> : ""}</li>
                            <li><span>{dictionary.envVersion}</span>{isEdit ? <Dropdown setState={setCafe} defaultValue={cafe.env_version} items={(Object.keys(Env_version) as Array<keyof typeof Env_version>)} /> : cafe.env_version}</li>
                            <li><span>{dictionary.mail}</span>{isEdit ? <EditableText type={Prize_Cafe_change_fields.EMAIL} initialText={cafe.email} isPrize={false} setCafe={setCafe} /> : (cafe.email || "-")} </li>
                            <li><span>{dictionary.address}</span>{isEdit ? <EditableText type={Prize_Cafe_change_fields.ADDRESS} initialText={(cafe.address || "-")} isPrize={false} setCafe={setCafe} /> : (cafe.address || "-") }</li>
                            <li><span>{dictionary.join}</span>{new Date(cafe.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: '2-digit'})}</li>
                            <li><span>{dictionary.name}</span>{isEdit ? <EditableText type={Prize_Cafe_change_fields.CONTACT_NAME} initialText={(cafe.contact_name || "-")} isPrize={false} setCafe={setCafe} /> :  (cafe.contact_name || "-")}</li>
                            <li><span>{dictionary.phone}</span>{isEdit ? <EditableText type={Prize_Cafe_change_fields.CONTACT_PHONE} initialText={(cafe.contact_phone || "-")} isPrize={false} setCafe={setCafe} /> :  (cafe.contact_phone || "-")}</li>
                            <li><span>{dictionary.ftw}</span>{isEdit ? <EditableText type={Prize_Cafe_change_fields.FTW} initialText={(cafe.ftw.toString() || "-")} isPrize={false} setCafe={setCafe} /> :  (cafe.ftw|| "-")}</li>
                            <li><span>{dictionary.daily}</span>{isEdit ? <EditableText type={Prize_Cafe_change_fields.DAILY_PHONE} initialText={(cafe.send_phone || "-")} isPrize={false} setCafe={setCafe} /> :  (cafe.send_phone|| "-")}</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.blocks}>
                    <div className={styles.blocks__top}>
                        <div></div>
                        <StatisticBlock title={dictionary.blocks.dailyPhone} num={cafe.send_phone} progress={0} />
                        <StatisticBlock title={dictionary.blocks.dailyCode} num={cafe.daily_code.split('').join('-')} progress={0} />
                        <div></div>
                    </div>
                    <div className={styles.blocks__bottom}>
                        <StatisticBlock title={dictionary.blocks.registrated} num={cafe.users?.length!} progress={0} />
                        <StatisticBlock title={dictionary.blocks.visits} num={currDayVisits!} progress={calculatePercentage(prevDayVisits!, currDayVisits!)} />
                        <StatisticBlock title={dictionary.blocks.new7} num={currNewUsers7!} progress={calculatePercentage(prevNewUsers7!, currNewUsers7!)} />
                        <StatisticBlock title={dictionary.blocks.return7} num={currReturnedUsers7!} progress={calculatePercentage(prevReturnedUsers7!, currReturnedUsers7!)} />
                        <StatisticBlock title={dictionary.blocks.revenue} prefix="$" num={revenue!} progress={0} />
                        <StatisticBlock title={dictionary.blocks.revenue30} prefix="$" num={revenue30!} progress={calculatePercentage(revenuePrev30!, revenue30!)} />
                        <StatisticBlock title={dictionary.blocks.new30} num={currNewUsers30!} progress={calculatePercentage(prevNewUsers30!, currNewUsers30!)} />
                        <StatisticBlock title={dictionary.blocks.return30} num={currReturnedUsers30!} progress={calculatePercentage(prevReturnedUsers30!, currReturnedUsers30!)} />
                    </div>
                </div>
                {!isCreate && <>
                <AdminPrizeTable type={"SCRATCH"} cafeId={cafe.id} prizesArr={cafe.prizes?.filter((prize:IPrize) => prize.type === "SCRATCH")!} />
                <AdminPrizeTable type={"SLOT"}  cafeId={cafe.id} prizesArr={cafe.prizes?.filter((prize:IPrize) => prize.type === "SLOT") !} />
                <AdminPrizeTable type={"FREE"}  cafeId={cafe.id} prizesArr={cafe.prizes?.filter((prize:IPrize) => prize.type === "FREE")!} />
                <AdminPrizeTable type={"FIRST"} cafeId={cafe.id} prizesArr={cafe.prizes?.filter((prize:IPrize) => prize.type === "FIRST")!} />

                <AdminUsersTable cafeId={cafe.id} usersArr={cafe.users!}/>
                </>}
            </div>
}