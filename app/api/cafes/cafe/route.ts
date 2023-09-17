import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import CafeUtils from '@/utils/cafeUtils';
 
export async function GET(request: NextRequest) {

    try{        
        const cafeId:number | unknown = await CafeUtils.getCurrentCafeId(request)              

        if(!cafeId){
            return NextResponse.json({ 
                message: "Can`t get current cafe"
            }, 
            {
                status: 400
            })
        }

        if(request.nextUrl.searchParams.has("id")){
            return NextResponse.json({ 
                cafeId
            }, 
            {
                status: 200
            })
        }

        const cafe = await prisma.cafes.findUnique({
            where: {
                id: +cafeId
            }
        })

        if(!cafe){
            return NextResponse.json({ 
                message: "Current cafe does not exist"
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({ 
            cafe
        }, 
        {
            status: 200
        })
        
    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Errer to get cafe information"
        }, 
        {
            status: 400
        })
    }
}