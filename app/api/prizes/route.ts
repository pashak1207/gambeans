import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function GET(request: NextRequest) {
    try{
        const cafeId = +request.headers.get('x-cafe-id')!

        const prizes = await prisma.prizes.findMany({
            where: {
                cafe_id: cafeId,
            },
            orderBy: [
                {
                    created_at: 'desc'
                }
            ]
        })

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
            message: "Errer to get all prizes"
        }, 
        {
            status: 400
        })
    }
}