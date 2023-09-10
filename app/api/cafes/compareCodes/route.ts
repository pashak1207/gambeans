import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import CafeUtils from '@/utils/cafe';
 
export async function POST(request: NextRequest) {

    try{
        const body = await request.json()
        const { userCode } = body
        const cafeId = await CafeUtils.getCurrentCafeId(request)

        const dailyCode = await prisma.daily_codes.findFirst({
            where:{
                cafe_id: +cafeId!
            },
            orderBy: {
                created_at: 'desc',
            },
        }).then(data => data?.code)
            .catch(err => console.log("Can`t get current daily code: " + err.message))
        

        if(userCode !== dailyCode){
            return NextResponse.json({ 
                isEqual: false,
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({ 
            isEqual: true,
        }, 
        {
            status: 200
        })
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Errer to compare cafe code"
        }, 
        {
            status: 400
        })
    }
}