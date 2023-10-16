import { Env_version } from '@/types/enums';
import { cookies, headers } from 'next/headers';

const CafeServerService = {
    async getAllCafes(pagin = 1):Promise<{message?:string, cafes?:ICafe[], onPage?:number}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/cafes?pagin=${pagin - 1}`)  
        
        return await response!.json()
    },

    async getAllCafesCount():Promise<{message?:string, cafes?:number}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/cafes?count`)
        
        return await response!.json()
    },

    async getCafe(id?:number):Promise<{message?:string, cafe?:any}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/cafes/cafe${id ? `?cafeId=${id}` : ""}`)
        
        return await response!.json()
    },

    async getCafeId():Promise<{message?:string, cafeId?:number}> {
        const accessToken = cookies().get('JWTAccessToken')?.value;

        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";
        

        const hds = new Headers({
            'Authorization': `${accessToken}`,
        });
        
        const response = await fetch(`${proto}${domain}/api/cafes/cafe?id`, { headers: hds })
        
        return await response!.json()   
    },

    async getCafeLang():Promise<{message?:string, cafeLang?:Env_version}>{
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";        

        const response = await fetch(`${proto}${domain}/api/cafes/cafe?lang`)
        
        return await response!.json()
    },

    async getDailyVisits():Promise<{message?:string, count?:number, progress?:number}>{
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/cafes/visits`)
        
        return await response!.json()
    },

    async getUsersStages():Promise<{message?:string, users?: {_count: {prizes: number}}[]}>{
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/users?stage`)
        
        return await response!.json()
    }
}

export default CafeServerService;