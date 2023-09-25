import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import { User_status } from '@prisma/client';
 
export async function PUT(request: NextRequest, {params: {userId}} : {params:{userId:string}}) {
    try{
        const body = await request.json()        
        const cafeId = +request.headers.get('x-cafe-id')!

        let user;

        if(request.nextUrl.searchParams.has("check")){

            const { isActive }:{isActive:boolean} = body

            user = await prisma.users.update({
                where:{
                    cafe_id: cafeId,
                    id: +userId
                },
                data:{
                    status: isActive ?  User_status.ACTIVE : User_status.BLOCKED,
                }
            })
        }

        if(!user){
            return NextResponse.json({ 
                message: "User not found"
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({ 
            user
        }, 
        {
            status: 200
        })
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to update user"
        }, 
        {
            status: 400
        })
    }
}