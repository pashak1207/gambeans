import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function GET(request: NextRequest) {    
    try{
        if(!request.nextUrl.searchParams.get('userId')?.trim() || !request.nextUrl.searchParams.get('prizeId')?.trim()){
            return NextResponse.json({ 
                message: "Specify the userId and prizeId"
            }, 
            {
                status: 400
            })
        }

        const userId:number = +request.nextUrl.searchParams.get('userId')!
        const prizeId:number = +request.nextUrl.searchParams.get('prizeId')!

        const currentPrize = await prisma.user_prize.findFirst({
            where: {
                user_id: userId,
                expires_at: null,
                used: null,
                opened: {
                    not: null
                },
                prize:{
                    is_active: true,
                    max_amount:{
                        gt: 0
                    }
                }
            }
        })
        
        
        const prize = await prisma.user_prize.findUnique({
            where:{
                id: prizeId,
                user_id: userId,
                used: null,
                prize:{
                    is_active: true,
                    max_amount:{
                        gt: 0
                    }
                }
            },
            include:{
                prize: true
            }

        })        


        if(!prize){
            return NextResponse.json({ 
                message: "Can`t get current prize"
            }, 
            {
                status: 400
            })
        }
        

        if(currentPrize && currentPrize?.id < prize.id){
            return NextResponse.json({ 
                message: "It is your future prize"
            }, 
            {
                status: 400
            })
        }

        if(prize.expires_at?.getTime() && prize.expires_at?.getTime() < new Date().getTime()){
            return NextResponse.json({ 
                message: "Prize expired"
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
            message: "Error to get prize"
        }, 
        {
            status: 400
        })
    }
}