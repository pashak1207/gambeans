import { cookies, headers } from 'next/headers';

const UserServerService = {
    async getAllRegistratedUsers() {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/users`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/users`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/users`)
        });
        
        return await response!.json()
    },

    async getAllRegistratedUsersCount() {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/users?count`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/users?count`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/users?count`)
        });
        
        return await response!.json()
    },

    async getNewUsersCount(days = 7) {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/users${days ? ("?newDays=" + days) : ""}`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/users${days ? ("?newDays=" + days) : ""}`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/users${days ? ("?newDays=" + days) : ""}`)
        });
        
        return await response!.json()
    },

    async getActiveUsersCount(days = 7) {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/users${days ? ("?actDays=" + days) : ""}`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/users${days ? ("?actDays=" + days) : ""}`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/users${days ? ("?actDays=" + days) : ""}`)
        });
        
        return await response!.json()
    },

    async getActiveYearUsersCount() {
        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/users?year`, { method: 'HEAD' })
        .then(async data => {
            response = await fetch(`https://${domain}/api/users?year`)
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/users?year`)
        });
        
        return await response!.json()
    },

    async getUserPrizes(userId?:number) {       
        const accessToken = cookies().get('JWTAccessToken')?.value;

        const hds = new Headers({
            'Authorization': `${accessToken}`,
        });
        

        const domain = headers().get('host')
        let response;
        
        await fetch(`https://${domain}/api/prizes?userprizes=${userId}`, { method: 'HEAD', headers: hds })
        .then(async data => {
            response = await fetch(`https://${domain}/api/prizes?userprizes=${userId}`, { headers: hds })
        })
        .catch(async err => {
            response = await fetch(`http://${domain}/api/prizes?userprizes=${userId}`, { headers: hds })
        });
        
        return await response!.json()
    }
}

export default UserServerService;