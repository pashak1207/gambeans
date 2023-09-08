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

    let accessVerified = null

    if(accessToken){
      try{  
        accessVerified = await JWT.verfiyAccessToken(accessToken)
      }catch(e){
        accessVerified = null
      }
    }    

    if(!accessToken || !accessVerified){

      const refreshToken = cookies().get('JWTRefreshToken')?.value || false

      if(!refreshToken){

        return Redirect.loginPage(request)

      }

      try{
        const payload = await JWT.verfiyRefreshToken(refreshToken)
                  .then(data => data?.payload)
        const userId = payload?.id
        const cafeId = payload?.cafe_id


        let response = NextResponse.next()
        
        response.cookies.set(...await JWT.generateAccessToken({id: userId}, request, cafeId as string) as any)
        response.cookies.set(...await JWT.generateRefreshToken({id: userId}, request, cafeId as string) as any)

        return response;

      }catch(err){
        console.log(err);
        
        return Redirect.loginPage(request)
      }

    }

    return NextResponse.next()
    
  }else if(path.startsWith("/login")){

    if(accessToken){
      let accessVerified = null;

      try{        
        accessVerified = await JWT.verfiyAccessToken(accessToken)
      }catch(e){
        accessVerified = null
      }
      
      if(accessVerified){
        return Redirect.dashboard(request)
      }
    }
  }
}