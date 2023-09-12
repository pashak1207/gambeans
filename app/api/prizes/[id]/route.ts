import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function GET(request: NextRequest, {params}:{params:{id:string}}) {
    try{
        const prizeId = params.id
        const cafeId = +request.headers.get('x-cafe-id')!            

        if(!prizeId){
            return NextResponse.json({ 
                message: "Can`t get current prize by id"
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

        if(!prize){
            return NextResponse.json({ 
                message: "Can`t get current prize"
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({
            ...prize
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