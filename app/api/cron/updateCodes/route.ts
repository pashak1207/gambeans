import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import UserUtils from '@/utils/userUtils';

export async function GET(request: NextRequest) {
    try{
        
        const cafes = await prisma.cafes.findMany()

        if(!cafes.length){
            return NextResponse.json({ 
                message: "There are no cafes available"
            }, 
            {
                status: 400
            })
        }

        Promise.all(cafes.map(async (cafe) => {
            await prisma.cafes.update({
                where: {
                    id: cafe.id
                },
                data:{
                    daily_code: UserUtils.generateVerificationCode()
                }
            })
        }))

        return NextResponse.json({ ok: true });
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to update cafes"
        }, 
        {
            status: 400
        })
    }
}