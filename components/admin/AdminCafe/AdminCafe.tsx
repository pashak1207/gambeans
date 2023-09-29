import CafeServerService from "@/services/cafeServer.service"
import { notFound } from "next/navigation"
import { headers } from "next/headers"
import AdminCafeClient from "./AdminCafeClient/AdminCafeClient"
import UserUtils from "@/utils/userUtils"
import { Cafe } from "@/dictionaries/type"

const cafeCreateObj:ICafe = {
    address: "Add address",
    color: "#B79A81",
    contact_name: "Add contact name",
    contact_phone: "Add contact phone",
    daily_code: UserUtils.generateVerificationCode(),
    email: "email@mail.com",
    ftw: 50,
    env_version: "en",
    link_eng:"cafe-cafe.eng"    ,
    link_heb:"cafe-cafe.heb",
    logo: "/proto.svg",
    name: "Cafe Cafe",
    send_phone: "Send phone",
    id: 99999999,
    created_at: new Date().toString()
}

export default async function AdminCafe({cafeId, isCreate, dictionary, lang}:{cafeId?:number, isCreate:boolean, dictionary:Cafe, lang:string}) {
    const proto = headers().has("x-forwarded-proto") ? "https://" : "http://";

    if(isCreate){
        return <AdminCafeClient lang={lang} dictionary={dictionary} isCreate cafeObj={cafeCreateObj} proto={proto} />
    }else{
        const cafe:ICafe = cafeId ? await CafeServerService.getCafe(cafeId).then(data => data.cafe) : await CafeServerService.getCafe().then(data => data.cafe)
        
        if(!cafe){
            notFound()
        }

        return <AdminCafeClient lang={lang} dictionary={dictionary} cafeObj={cafe} proto={proto} />
    }
}