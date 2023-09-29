import { headers } from 'next/headers';
import { cookies } from 'next/headers'

const AuthServerService = {   
    async getMe(param = ""):Promise<{message?:string} | IVisit | IUser | any>{
        const accessToken = cookies().get('JWTAccessToken')?.value;
        
        const hds = new Headers({
            'Authorization': `${accessToken}`,
        });

        const domain = headers().get('host')

        let response;        

        
        await fetch(`https://${domain}/api/auth/me?${param}`, { method: 'HEAD', headers: hds })
        .then(async data => {
            response = await fetch(`https://${domain}/api/auth/me?${param}`, { headers: hds })
        })
        .catch(async err => {            
            response = await fetch(`http://${domain}/api/auth/me?${param}`, { headers: hds })
        });
    
        return await response!.json()

    },
}

export default AuthServerService;