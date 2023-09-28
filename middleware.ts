import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import JWT from './utils/jwtgenerate'
import Redirect from './utils/redirects'
import CafeServerService from './services/cafeServer.service'
import AuthServerService from './services/authServer.service'
import { Users_role } from './types/enums'

const privateRoutes = ["/dashboard", "/admin", "/superadmin"]

export async function middleware(request: NextRequest){
  const path:string = request.nextUrl.pathname
  const accessToken:string|boolean = request.cookies.get('JWTAccessToken')?.value || false
  const currentCafeId:number = await CafeServerService.getCafeId().then(data => data.cafeId) as number
  const currentCafeLang:string = await CafeServerService.getCafeLang().then(data => data.cafeLang) as string
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-language', currentCafeLang)

  if(!currentCafeId){
    return Redirect.notFound(request)
  }


  if(path.startsWith("/api")){
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

        const user:IUser = await AuthServerService.getMe()        
        
        if(!user?.id || user.status === "BLOCKED"){         
          const response = Redirect.loginPage(request);

          response.cookies.delete('JWTRefreshToken');
          response.cookies.delete('JWTAccessToken');
          response.headers.set('x-language', currentCafeLang)

          return response;
        }

        await AuthServerService.getMe("visit")

        if(path.startsWith("/admin") && user.role === "USER"){
          return Redirect.notFound(request)
        }  
        
        if(path.startsWith("/superadmin") && user.role !== "SUPERADMIN"){
          return Redirect.notFound(request)
        } 
        
      }catch(e){
        accessVerified = null        
      }
    }

    if(!accessToken || !accessVerified){      

      const refreshToken = request.cookies.get('JWTRefreshToken')?.value || false      

      if(!refreshToken){

        return Redirect.loginPage(request)

      }
      
      try{
        const payload = await JWT.verfiyRefreshToken(refreshToken)
                  .then(data => data?.payload)
        
        if(payload?.id && payload?.role && payload?.cafe_id){
          const response = NextResponse.next()
          response.cookies.set(...await JWT.generateAccessToken(+payload?.id, payload?.role as Users_role, request, payload?.cafe_id as string) as any)
          response.cookies.set(...await JWT.generateRefreshToken(+payload?.id, payload?.role as Users_role, request, payload?.cafe_id as string) as any)
          response.headers.set('x-language', currentCafeLang)
          return response;
        }

      }catch(err){
        console.log(err);        
        
        return Redirect.loginPage(request)
      }

    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    })
    
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
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    })
    
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}