import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers'
import JWT from '@/utils/jwtgenerate';
 
export async function POST(request: NextRequest) {
    try{
        const cookieStore = cookies()
        const accessToken = cookieStore.get('JWTAccessToken')?.value || request.headers.get('authorization')
        
        const userId:number|void = await JWT.verfiyAccessToken(accessToken!)
                                    .then(data => data?.payload?.id)
                                    .then(data => +data!)
                                    .catch(err => console.log("Error to get userId from token: " + err.message))

        const prize = await prisma.user_prize.findFirst({
            where:{
                user_id: userId!,
                expires_at: null,
                opened: null,
                prize:{
                    is_active: true,
                    max_amount:{
                        gt: 0
                    }
                }
            },
            orderBy:{
                id: "asc"
            }
        })
        
        if(!prize){
            return NextResponse.json({ 
                message: "Prize not found"
            }, 
            {
                status: 400
            })
        }

        await prisma.user_prize.update({
            where:{
                id: prize?.id
            },
            data:{
                opened: new Date()
            }
        })

        return NextResponse.json({ 
            prize
        }, 
        {
            status: 200
        })
    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to get prize"
        }, 
        {
            status: 400
        })
    }
}