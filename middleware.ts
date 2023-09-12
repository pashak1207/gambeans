import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import JWT from './utils/jwtgenerate'
import Redirect from './utils/redirects'
import CafeServerService from './services/cafeServer.service'


const privateRoutes = ["/dashboard"]

export async function middleware(request: NextRequest){
  const path:string = request.nextUrl.pathname
  const cookiesStore= cookies()
  const accessToken:string|boolean = cookiesStore.get('JWTAccessToken')?.value || false
  const currentCafeId:number = await CafeServerService.getCafeId().then(data => data.cafeId)

  if(!currentCafeId){
    return Redirect.notFound(request)
  } 





  if(path.startsWith("/api")){
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-cafe-id', currentCafeId.toString())
        
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    })
  }
  
  
  
  
  
  else if(privateRoutes.some(route => path.startsWith(route))){

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
        if(payload?.id && payload?.role && payload?.cafe_id){
          cookiesStore.set(...await JWT.generateAccessToken(+payload?.id, payload?.role as Users_role, request, payload?.cafe_id as string) as any)
          cookiesStore.set(...await JWT.generateRefreshToken(+payload?.id, payload?.role as Users_role, request, payload?.cafe_id as string) as any)

          return NextResponse.next();
        }

      }catch(err){
        console.log(err);
        
        return Redirect.loginPage(request)
      }

    }

    return NextResponse.next()
    
  }
  
  
  
  
  
  else if(path.startsWith("/login")){

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
    
    return NextResponse.next()
    
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}