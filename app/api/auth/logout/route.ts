import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
export async function GET(request: NextRequest) {    
    try{
        const cookiesStore = cookies()
        cookiesStore.delete("JWTRefreshToken")
        cookiesStore.delete("JWTAccessToken")

        return NextResponse.json({ 
            message: "You session ended successfully"
        }, 
        {
            status: 200
        })

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to logout"
        }, 
        {
            status: 400
        })
    }
}