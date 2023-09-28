import { cookies, headers } from 'next/headers';

const UserServerService = {
    async getAllRegistratedUsers(): Promise<{message?:string, users?:IUser[]}> {
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

    async getAllRegistratedUsersCount(): Promise<{message?:string, users:number}> {
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

    async getNewUsersCount(days = 7): Promise<{message?:string, count:number, progress: number}> {
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

    async getActiveUsersCount(days = 7): Promise<{message?:string, count:number, progress: number}> {
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

    async getActiveYearUsersCount(): Promise<{message?:string, counts:number[]}> {
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

    async getUserPrizes(userId?:number): Promise<{message?:string, prizes:IUserPrize[]}> {       
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