import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function POST(request: NextRequest) {
    try{
        const body = await request.json()        
        const { randNum, userId }:{randNum:string, userId: string} = body
        const cafeId = +request.headers.get('x-cafe-id')!

        const prizes = await prisma.prizes.findMany({
            where:{
                cafe_id: cafeId,
                is_active: true,
                user:{
                    none:{
                        user_id: +userId
                    }
                },
                max_amount:{
                    gt: 0
                },
                type: {
                    not: 'FIRST'
                }
            },
            take: +randNum,
            orderBy: [
                {
                    created_at: 'desc'
                }
            ],
            skip: Math.floor(Math.random() * (await prisma.prizes.count() - +randNum)),
            }).catch(err => console.log("Out from array index: " + err));
        

        if(!prizes){
            return NextResponse.json({ 
                message: "Prizes not found"
            }, 
            {
                status: 400
            })
        }
        
        await Promise.all(prizes.map(async (prize) => {
            await prisma.user_prize.create({
                data:{
                    user_id: +userId,
                    prize_id: prize.id,
                }
            })
        }))

        return NextResponse.json({ 
            prizes 
        }, 
        {
            status: 200
        })
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Errer to get random prizes"
        }, 
        {
            status: 400
        })
    }
}