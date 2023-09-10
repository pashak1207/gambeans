import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import CafeUtils from '@/utils/cafe';
 
export async function GET(request: NextRequest, {params}:{params:{id:string}}) {

    try{
        const prizeId = params.id
        const cafeId = await CafeUtils.getCurrentCafeId(request)        

        if(!cafeId){
            return NextResponse.json({ 
                message: "Can`t get current cafe"
            }, 
            {
                status: 400
            })
        }

        const prize = await prisma.prizes.findUnique({
            where:{
                id: +prizeId,
                cafe:{
                    id: cafeId
                },
            },

        })

        return NextResponse.json({
            ...prize
        },
        {
            status: 200
        })

        console.log(prize);
        
        
        
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Errer to get prize"
        }, 
        {
            status: 400
        })
    }
}