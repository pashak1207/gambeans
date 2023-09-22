import { headers } from 'next/headers';

const PrizeServerService = {
    async getAllPrizes(): Promise<any> {
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

    async getRandomPrizes(randNum: number, userId: number): Promise<any>{
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/prizes/getRandomPrizes`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/prizes/getRandomPrizes}`, {
                method: "POST",
                body: JSON.stringify({
                    randNum,
                    userId
                })
            })
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/prizes/getRandomPrizes`, {
                method: "POST",
                body: JSON.stringify({
                    randNum,
                    userId
                })
            })
        });

        return await response!.json()
    },

    async getPrize(id:number|string): Promise<any> {
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

    async getUserPrize(userId : number, prizeId: string): Promise<any> {
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