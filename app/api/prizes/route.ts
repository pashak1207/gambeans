import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers';
import JWT from '@/utils/jwtgenerate';
 
export async function GET(request: NextRequest) {
    try{
        const cafeId = +request.headers.get('x-cafe-id')!
        const cookieStore = cookies()
        const accessToken = cookieStore.get('JWTAccessToken')?.value || request.headers.get('authorization')
        
        
        const user_id:number|void = await JWT.verfiyAccessToken(accessToken!)
                                    .then(data => data?.payload?.id)
                                    .then(data => +data!)
                                    .catch(err => console.log("Error to get userId from token: " + err.message))
        let prizes;

        if(request.nextUrl.searchParams.has("userprizes")){
            prizes = await prisma.user_prize.findMany({
                where:{
                    user_id: +request.nextUrl.searchParams.get("userprizes")! || +user_id!,
                    expires_at: {
                        gte: new Date(),
                        not: null
                    },
                    used:{
                        equals: null
                    },
                    opened:{
                        not: null
                    },
                    is_won: true,
                    prize:{
                        cafe_id: cafeId
                    },
                },
                include:{
                    prize: true
                }
            })

        }else{
            prizes = await prisma.prizes.findMany({
                where: {
                    cafe_id: cafeId,
                },
                orderBy: [
                    {
                        created_at: 'desc'
                    }
                ]
            })
        }

        if(!prizes){
            return NextResponse.json({ 
                message: "Prizes not found"
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({ 
            prizes
        }, 
        {
            status: 200
        })
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to get all prizes"
        }, 
        {
            status: 400
        })
    }
}

export async function POST(request: NextRequest) {
    try{
        const body = await request.json()        
        const { prizeObj } :{ prizeObj:IPrize } = body
        
        
        const prize = await prisma.prizes.create({
            data:{
                cafe_id: prizeObj.cafe_id,
                max_amount: prizeObj.max_amount,
                current_amount: prizeObj.max_amount,
                text: prizeObj.text,
                image: prizeObj.image,
                step_image: prizeObj.step_image,
                type: prizeObj.type,
                cost: prizeObj.cost,
                revenue: prizeObj.revenue,
                probability: prizeObj.probability
            }
        })

        if(!prize){
            return NextResponse.json({ 
                message: "Can`t create prize"
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({ 
            prize
        }, 
        {
            status: 200
        })
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to create prize"
        }, 
        {
            status: 400
        })
    }
}