import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import CafeUtils from '@/utils/cafe';
 
export async function GET(request: NextRequest) {

    try{

        const cafeId = await CafeUtils.getCurrentCafeId(request)        

        if(!cafeId){
            return NextResponse.json({ 
                message: "Can`t get current cafe"
            }, 
            {
                status: 400
            })
        }

        const prizes = await prisma.prizes.findMany({
            where: {
                cafe_id: cafeId,
                is_active: true,
                expires_at: {
                    gte: new Date()
                }
            },
            orderBy: [
                {
                    step: 'asc',
                },
                {
                    created_at: 'asc'
                }
            ],
        })
        

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