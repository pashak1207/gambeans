import { redirect } from 'next/navigation'
import { headers } from 'next/headers';
import { cookies } from 'next/headers'

const AuthServerService = {   
    async getMe(){
        const accessToken = cookies().get('JWTAccessToken')?.value;
        
        const hds = new Headers({
            'Authorization': `${accessToken}`,
        });

        const domain = headers().get('host')

        let response;

        
        await fetch(`https://${domain}/api/auth/me`, { method: 'HEAD', headers: hds, })
        .then(async data => {
            response = await fetch(`https://${domain}/api/auth/me`, { headers: hds })
        })
        .catch(async err => {            
            response = await fetch(`http://${domain}/api/auth/me`, { headers: hds })
        });
    
        const body = await response!.json()

        return body

    }
}

export default AuthServerService;