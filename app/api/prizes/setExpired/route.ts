import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function POST(request: NextRequest) {
    try{
        const body = await request.json()        
        const { userprizeId, expiresAt }:{userprizeId:number, expiresAt:number} = body
        
        if(!userprizeId){
            return NextResponse.json({ 
                message: "Specify id of user prize"
            }, 
            {
                status: 400
            })
        }

        const prize = await prisma.user_prize.update({
            where:{
                id: userprizeId
            },
            data:{
                expires_at: new Date(new Date().setDate(new Date().getDate() + expiresAt))
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