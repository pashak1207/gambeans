import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function PUT(request: NextRequest, {params: {prizeId}} : {params:{prizeId:string}}) {
    try{
        const body = await request.json()        
        const cafeId = +request.headers.get('x-cafe-id')!

        let prize;

        if(request.nextUrl.searchParams.has("check")){

            const { isActive }:{isActive:boolean} = body

            prize = await prisma.prizes.update({
                where:{
                    cafe_id: cafeId,
                    id: +prizeId
                },
                data:{
                    is_active: isActive,
                }
            })
        }else if(request.nextUrl.searchParams.has("image")){
            const { url }:{url:string} = body

            prize = await prisma.prizes.update({
                where:{
                    cafe_id: cafeId,
                    id: +prizeId
                },
                data:{
                    image: url
                }
            })
        }else{
            const { prizeObj }:{prizeObj:IPrize} = body

            prize = await prisma.prizes.update({
                where:{
                    cafe_id: cafeId,
                    id: +prizeId
                },
                data:{
                    text: prizeObj.text,
                    image: prizeObj.image,
                    expires_at: prizeObj.expires_at,
                    cost: prizeObj.cost,
                    revenue: prizeObj.revenue,
                    probability: prizeObj.probability,
                    max_amount: prizeObj.max_amount
                }
            })
        }

        if(!prize){
            return NextResponse.json({ 
                message: "Prize not found"
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({ 
            prize
        }, 
        {
            status: 200
        })
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to update prize"
        }, 
        {
            status: 400
        })
    }
}