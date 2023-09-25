import CafeServerService from "@/services/cafeServer.service"
import { notFound } from "next/navigation"
import { headers } from "next/headers"
import AdminCafeClient from "./AdminCafeClient/AdminCafeClient"

export default async function AdminCafe({cafeId}:{cafeId?:number}) {
    const cafe:ICafe = cafeId ? await CafeServerService.getCafe(cafeId).then(data => data.cafe) : await CafeServerService.getCafe().then(data => data.cafe)
    const proto = headers().has("x-forwarded-proto") ? "https://" : "http://";

    if(!cafe){
        notFound()
    } 

    return <AdminCafeClient cafeObj={cafe} proto={proto} />
}