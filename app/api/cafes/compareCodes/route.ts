import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function POST(request: NextRequest) {

    try{
        const body = await request.json()
        const { userCode }:{ userCode: string} = body
        const cafeId:number = +request.headers.get('x-cafe-id')!                

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
            message: "Error during codes comparison"
        }, 
        {
            status: 400
        })
    }
}