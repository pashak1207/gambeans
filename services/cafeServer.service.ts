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

        const body = await response!.json()
        
        return body
    },
}

export default CafeServerService;