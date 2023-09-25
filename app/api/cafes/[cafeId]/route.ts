import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function PUT(request: NextRequest, {params: {cafeId}} : {params:{cafeId:string}}) {
    try{
        const body = await request.json()        
        const cafeId = +request.headers.get('x-cafe-id')!
        const { cafeObj }:{cafeObj:ICafe} = body

        const cafe = await prisma.cafes.update({
            where:{
                id: +cafeId!
            },
            data:{
                name: cafeObj.name,
                logo: cafeObj.logo,
                color: cafeObj.color,
                email: cafeObj.email,
                address: cafeObj.address,
                contact_name: cafeObj.contact_name,
                contact_phone: cafeObj.contact_phone,
                link_heb: cafeObj.link_heb,
                link_eng: cafeObj.link_eng,
            }
        })


        if(!cafe){
            return NextResponse.json({ 
                message: "Cafe not found"
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
            message: "Error to update cafe"
        }, 
        {
            status: 400
        })
    }
}