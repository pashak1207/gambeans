import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers'
import JWT from '@/utils/jwtgenerate';
 
export async function GET(request: NextRequest) {   
    try{
        const cookieStore = cookies()
        const accessToken = cookieStore.get('JWTAccessToken')?.value || request.headers.get('authorization')
        const cafe_id:number = +request.headers.get('x-cafe-id')!         
        
        const userId:number|void = await JWT.verfiyAccessToken(accessToken!)
                                    .then(data => data?.payload?.id)
                                    .then(data => +data!)
                                    .catch(err => console.log("Error to get userId from token: " + err.message))

        if(!userId){
            return NextResponse.json({ 
                message: "Can`t get userId from token",
            }, 
            {
                status: 400
            })
        }

        const user = await prisma.users.findUnique({
            where: {
                id: userId,
                cafes:{
                    some:{
                        cafe_id
                    }
                }
            },
            select:{
                id: true,
                DOB: true,
                name:true,
                role: true,
                status:true,
                prize: true,
                cafes:{
                    where:{
                        cafe_id: cafe_id
                    }
                }
            }
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
        
        return NextResponse.json({ 
            ...user
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