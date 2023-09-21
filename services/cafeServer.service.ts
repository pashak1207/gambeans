import { headers } from 'next/headers';

const CafeServerService = {
    async getAllCafes(pagin = 1) {
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

    async getAllCafesCount() {
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

    async getCafe(id?:number) {
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
    },

    async getDailyVisits(){
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
}

export default CafeServerService;