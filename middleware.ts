import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import JWT from './utils/jwtgenerate'
import Redirect from './utils/redirects'

const privateRoutes = ["/dashboard"]
 
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const accessToken = cookies().get('JWTAccessToken')?.value || false
  
  if(privateRoutes.some(route => path.startsWith(route))){

    if(!accessToken){

      const refreshToken = cookies().get('JWTRefreshToken')?.value || false

      if(!refreshToken){

        return Redirect.loginPage(request)

      }

      try{
        const userId = await JWT.verfiyRefreshToken(refreshToken)
                  .then(data => data?.payload?.id)                  

        let response = NextResponse.next()

        response.cookies.set(...await JWT.generateAccessToken({id: userId}) as any)

        return response;

      }catch(err){
        console.log(err);
        
        return Redirect.loginPage(request)
      }

    }
    
  }else if(path.startsWith("/login")){

    const accessToken = cookies().get('JWTAccessToken')?.value || false

    if(accessToken){
      const verified = await JWT.verfiyAccessToken(accessToken)
      
      if(verified){
        return Redirect.dashboard(request)
      }
    }

    return NextResponse.next()
  }
}