import { headers } from 'next/headers';

const CafeServerService = {
    async getCafe() {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/cafes/cafe`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/cafes/cafe`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/cafes/cafe`)
        });
        
        return await response!.json()
    },

    async getCafeId(){
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
    }
}

export default CafeServerService;