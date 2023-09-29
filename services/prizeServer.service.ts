import { headers } from 'next/headers';

const PrizeServerService = {
    async getAllPrizes(): Promise<{message?:string, prizes?:IPrize[]}> {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/prizes`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/prizes`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/prizes`)
        });

        return await response!.json()
    },

    async getPrize(id:number|string): Promise<{message?:string, prize?:IPrize}> {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/prizes/${id}`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/prizes/${id}`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/prizes/${id}`)
        });

        return await response!.json()
    },

    async getUserPrize(userId : number, prizeId: string): Promise<{message?:string, prize?:IUserPrize}> {
        const domain = headers().get('host')
        let response;        
        
        await fetch(`https://${domain}/api/prizes/getUserPrize?userId=${userId}&prizeId=${prizeId}`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/prizes/getUserPrize?userId=${userId}&prizeId=${prizeId}`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/prizes/getUserPrize?userId=${userId}&prizeId=${prizeId}`)
        });

        return await response!.json()
    },
}

export default PrizeServerService;