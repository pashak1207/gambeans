import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers'
import JWT from '@/utils/jwtgenerate';
import CafeUtils from '@/utils/cafe';
 
export async function GET(request: NextRequest) {   
    try{
        const cookieStore = cookies()
        const accessToken = cookieStore.get('JWTAccessToken')?.value || request.headers.get('authorization')
        const cafe_id = await CafeUtils.getCurrentCafeId(request)
        
        if(!cafe_id){
            return NextResponse.json({ 
                message: "Error to find cafe"
            }, 
            {
                status: 400
            })
        }
        
        
        if(!accessToken){
            return NextResponse.json({ 
                message: "You are not allowed to access"
            }, 
            {
                status: 400
            })
        }

        let accessVerified = null

        try{  
            accessVerified = await JWT.verfiyAccessToken(accessToken)
        }catch(e){
            accessVerified = null
        }
        
        if(!accessVerified){
            return NextResponse.json({ 
                message: "You are not allowed to access"
            }, 
            {
                status: 400
            })
        }
        
        const userId = await JWT.verfiyAccessToken(accessToken)
                            .then(data => data?.payload?.id)
                            .catch(err => console.log("Error to get userId from token: " + err.message))

        if(!userId){
            throw new Error("Can't get userId from token")
        }

        const user = await prisma.users.findUnique({
            where: {
                id: +userId,
                cafes:{
                    some:{
                        cafe_id
                    }
                }
            },
        })
        
        if(!user){
            cookieStore.delete('JWTRefreshToken')
            cookieStore.delete('JWTAccessToken')

            return NextResponse.json({ 
                message: "User not found",
            }, 
            {
                status: 400
            })
        }

        const user_cafe = await prisma.cafe_user.findFirst({
            where:{
                cafe_id,
                user_id: +userId
            },
        })        

        const sendUser:any = {...user, step: user_cafe!.step}
        delete sendUser.phone
        delete sendUser.verification_code
        delete sendUser.created_at        
        
        return NextResponse.json({ 
            ...sendUser
        }, 
        {
            status: 200
        })

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Errer to get user information"
        }, 
        {
            status: 400
        })
    }
}