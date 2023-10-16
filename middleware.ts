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
  let currentCafeId:number;
  let currentCafeLang:string
  const requestHeaders = new Headers(request.headers)
  const accessToken = request.cookies.get('JWTAccessToken')?.value
  let payload;
  

  if(accessToken){
    payload = await JWT.verfiyAccessToken(accessToken).then(data => data.payload)
    currentCafeId = payload?.cafe_id as number
    currentCafeLang = payload?.lang as string
  }else if(requestHeaders.has('authorization')){
    const payload = await JWT.verfiyAccessToken(requestHeaders.get("authorization")!).then(data => data.payload)
    currentCafeId = payload?.cafe_id as number
    currentCafeLang = payload?.lang as string
  }else{
    currentCafeId = await CafeServerService.getCafeId().then(data => data.cafeId) as number

    if(!path.startsWith("/api") || (path.startsWith("/api/login") || path.startsWith("/api/registration"))){
      currentCafeLang = await CafeServerService.getCafeLang().then(data => data.cafeLang) as string
    }else{
      currentCafeLang = "en"
    }
  }  

  requestHeaders.set('x-language', currentCafeLang)

  if(!currentCafeId && accessToken && payload){
      if(payload.role === Users_role.SUPERADMIN){
        return Redirect.superadmin(request)
      }
    return Redirect.notFound(request)
  }


  if(path.startsWith("/api") && currentCafeId){
    requestHeaders.set('x-cafe-id', currentCafeId.toString())

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    })
  }
  
  
  else if(privateRoutes.some(route => path.startsWith(route))){
    
    if(accessToken && payload){

      const user:IUser = await AuthServerService.getMe()        

      if(!user?.id || user.status === "BLOCKED"){         
        const response = Redirect.loginPage(request);

        response.cookies.delete('JWTRefreshToken');
        response.cookies.delete('JWTAccessToken');
        response.headers.set('x-language', currentCafeLang)

        return response;
      }

      if(path.startsWith("/dashboard")){
        AuthServerService.getMe("visit")
      }
      if(path.startsWith("/admin") && user.role === "USER"){
        return Redirect.notFound(request)
      }  
      
      if(path.startsWith("/superadmin") && user.role !== "SUPERADMIN"){
        return Redirect.notFound(request)
      } 
    }

    if(!accessToken || !payload){      

      const refreshToken = request.cookies.get('JWTRefreshToken')?.value || false      

      if(!refreshToken){

        return Redirect.loginPage(request)

      }
      
      try{
        const payload = await JWT.verfiyRefreshToken(refreshToken)
                  .then(data => data?.payload)
        
        if(payload?.id && payload?.role && payload?.cafe_id){
          const response = NextResponse.next()
          response.cookies.set(...await JWT.generateAccessToken(+payload?.id, payload?.role as Users_role, request, currentCafeLang,  payload?.cafe_id as string) as any)
          response.cookies.set(...await JWT.generateRefreshToken(+payload?.id, payload?.role as Users_role, request, currentCafeLang, payload?.cafe_id as string) as any)
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
  
  
  else if(path.startsWith("/login") || path.trim() === "/"){
    
    if(accessToken && payload){
        return Redirect.dashboard(request)
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
    '/((?!_next/static|_next/image|prizes/*|uploads/*|favicon.ico).*)',
  ],
}