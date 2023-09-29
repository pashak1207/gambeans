import { headers } from 'next/headers';
import { cookies } from 'next/headers'

const AuthServerService = {   
    async getMe(param = ""):Promise<{message?:string} | IVisit | IUser | any>{
        const accessToken = cookies().get('JWTAccessToken')?.value;
        
        const hds = new Headers({
            'Authorization': `${accessToken}`,
        });

        const domain = headers().get('host')
        const proto = headers().get("x-forwarded-proto") ? "https://" : "http://";

        const response = await fetch(`${proto}${domain}/api/auth/me?${param}`, { headers: hds })
    
        return await response!.json()

    },
}

export default AuthServerService;