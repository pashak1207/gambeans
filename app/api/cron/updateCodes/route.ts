import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import UserUtils from '@/utils/userUtils';
 
export async function GET(request: NextRequest) {
    try{
        
        const cafes = await prisma.cafes.updateMany({
            data:{
                daily_code: UserUtils.generateVerificationCode()
            }
        })

        if(!cafes){
            return NextResponse.json({ 
                message: "There are no cafes available"
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({ 
            cafes
        }, 
        {
            status: 200
        })
        

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