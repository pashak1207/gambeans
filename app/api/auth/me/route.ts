import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers'
import JWT from '@/utils/jwtgenerate';
 
export async function GET(request: Request) {

    try{
        const cookieStore = cookies()
        const accesToken = cookieStore.get('JWTAccessToken')?.value
        
        
        if(!accesToken){
            return NextResponse.json({ 
                message: "You are not allowed to access"
            }, 
            {
                status: 400
            })
        }
        
        const userId = await JWT.verfiyAccessToken(accesToken)
                            .then(data => data?.payload?.id)
                            .catch(err => console.log("Error to get userId from token: " + err.message))

        if(!userId){
            throw new Error("Can't get userId from token")
        }

        const user = await prisma.users.findUnique({
            where: {
                id: +userId
            }
        })

        if(!user){
            return NextResponse.json({ 
                message: "User not found",
            }, 
            {
                status: 400
            })
        }

        const sendUser:any = {...user}
        delete sendUser.phone
        delete sendUser.verification_code
        delete sendUser.created_at
        
        return NextResponse.json({ 
            message: "Success",
            user: sendUser
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