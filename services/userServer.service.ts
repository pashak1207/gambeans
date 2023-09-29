import { cookies, headers } from 'next/headers';

const UserServerService = {
    async getAllRegistratedUsers(): Promise<{message?:string, users?:IUser[]}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/users`)
        
        return await response!.json()
    },

    async getAllRegistratedUsersCount(): Promise<{message?:string, users:number}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/users?count`)

        return await response!.json()
    },

    async getNewUsersCount(days = 7): Promise<{message?:string, count:number, progress: number}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/users${days ? ("?newDays=" + days) : ""}`)
        
        return await response!.json()
    },

    async getActiveUsersCount(days = 7): Promise<{message?:string, count:number, progress: number}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/users${days ? ("?actDays=" + days) : ""}`)
        
        return await response!.json()
    },

    async getActiveYearUsersCount(): Promise<{message?:string, counts:number[]}> {
        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/users?year`)
        
        return await response!.json()
    },

    async getUserPrizes(userId?:number): Promise<{message?:string, prizes:IUserPrize[]}> {       
        const accessToken = cookies().get('JWTAccessToken')?.value;
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const hds = new Headers({
            'Authorization': `${accessToken}`,
        });
        

        const domain = headers().get('host')
        const response = await fetch(`${proto}${domain}/api/prizes?userprizes=${userId}`, { headers: hds })
        
        return await response!.json()
    }
}

export default UserServerService;