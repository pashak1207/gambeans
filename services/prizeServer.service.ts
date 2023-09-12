import { headers } from 'next/headers';

const PrizeServerService = {
    
    async getPrize(id:number|string) {
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
    }
}

export default PrizeServerService;