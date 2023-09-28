import { Env_version } from '@/types/enums';
import { headers } from 'next/headers';

const CafeServerService = {
    async getAllCafes(pagin = 1):Promise<{message?:string, cafes?:ICafe[], onPage?:number}> {
        const domain = headers().get('host')
        let response;        
        
        await fetch(`https://${domain}/api/cafes?pagin=${pagin - 1}`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/cafes?pagin=${pagin - 1}`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/cafes?pagin=${pagin - 1}`)
        });
        
        return await response!.json()
    },

    async getAllCafesCount():Promise<{message?:string, cafes?:number}> {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/cafes?count`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/cafes?count`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/cafes?count`)
        });
        
        return await response!.json()
    },

    async getCafe(id?:number):Promise<{message?:string, cafe?:any}> {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/cafes/cafe${id ? `?cafeId=${id}` : ""}`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/cafes/cafe${id ? `?cafeId=${id}` : ""}`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/cafes/cafe${id ? `?cafeId=${id}` : ""}`)
        });
        
        return await response!.json()
    },

    async getCafeId():Promise<{message?:string, cafeId?:number}> {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/cafes/cafe?id`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/cafes/cafe?id`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/cafes/cafe?id`)
        });
        
        return await response!.json()
    },

    async getCafeLang():Promise<{message?:string, cafeLang?:Env_version}>{
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/cafes/cafe?lang`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/cafes/cafe?lang`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/cafes/cafe?lang`)
        });
        
        return await response!.json()
    },

    async getDailyVisits():Promise<{message?:string, count?:number, progress?:number}>{
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/cafes/visits`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/cafes/visits`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/cafes/visits`)
        });
        
        return await response!.json()
    },

    async getUsersStages():Promise<{message?:string, users?: {_count: {prizes: number}}[]}>{
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/users?stage`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/users?stage`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/users?stage`)
        });
        
        return await response!.json()
    }
}

export default CafeServerService;