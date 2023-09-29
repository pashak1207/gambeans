import { headers } from 'next/headers';

const PrizeServerService = {
    async getAllPrizes(): Promise<{message?:string, prizes?:IPrize[]}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/prizes`)

        return await response!.json()
    },

    async getPrize(id:number|string): Promise<{message?:string, prize?:IPrize}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/prizes/${id}`)

        return await response!.json()
    },

    async getUserPrize(userId : number, prizeId: string): Promise<{message?:string, prize?:IUserPrize}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/prizes/getUserPrize?userId=${userId}&prizeId=${prizeId}`)       

        return await response!.json()
    },

    async getNewUserPrizes(): Promise<{message?:string, isSuccess?:boolean}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/prizes/getNewUserPrizes`)      

        return await response!.json()
    },
}

export default PrizeServerService;