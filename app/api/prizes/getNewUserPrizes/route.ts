import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import CafeUtils from '@/utils/cafeUtils';
import { cookies } from 'next/headers';
import JWT from '@/utils/jwtgenerate';
 
export async function POST(request: NextRequest) {
    try{
        const cookieStore = cookies()
        const accessToken = cookieStore.get('JWTAccessToken')?.value || request.headers.get('authorization')
        
        const userId:number|void = await JWT.verfiyAccessToken(accessToken!)
                                    .then(data => data?.payload?.id)
                                    .then(data => +data!)
                                    .catch(err => console.log("Error to get userId from token: " + err.message))
        const cafe_id:number = +request.headers.get('x-cafe-id')!

        const cafe_ftw = await CafeUtils.getCurrentCafeFTW(cafe_id)

        const prizes = await prisma.prizes.findMany({
            where:{
                cafe_id: cafe_id,
                is_active: true,
                current_amount:{
                    gt: 0
                },
                type: {
                    not: 'FIRST'
                }
            },
        }).then(data => data.sort((a,b) => 0.5 - Math.random()).slice(0, 30))
        .catch(err => console.log("Out from array index: " + err)); 


        const welcome_prize = await prisma.prizes.findMany({
            where: {
                type: 'FIRST',
                is_active: true,
                current_amount:{
                    gt: 0
                },
            },
        }).then(data => data[Math.floor(Math.random() * data.length)])
        .catch(err => console.log("Cafe didn`t have first prizes: " + err));         

        if(!prizes?.length || !welcome_prize){
            
            let response = NextResponse.json({ 
                message: "Registration successful",
            }, 
            {
                status: 200
            })
            
            return response
        }

        await prisma.prizes.update({
            where:{
                id: welcome_prize!.id
            },
            data:{
                current_amount:{
                    decrement: 1
                }
            }
        }).catch(err => console.log(err))
        
                    
        Promise.all(prizes!.map(async (prize) => {
            await prisma.prizes.update({
                where:{
                    id: prize.id
                },
                data:{
                    current_amount:{
                        decrement: 1
                    }
                }
            }).catch(err => console.log(err))
        })).catch(err => console.log(err))
        
        await prisma.user_prize.create({
            data:{
                user_id: userId!,
                prize_id: welcome_prize!.id,
                is_won: true,
            }
        })            

        await Promise.all(prizes!.map(async (prize) => {                
            await prisma.user_prize.create({
                data:{
                    user_id: +userId,
                    prize_id: prize.id,
                    is_won: (Math.floor(Math.random() * 100) + 1 <= prize.probability),
                    is_slot_won: (Math.floor(Math.random() * 100) + 1 <= cafe_ftw)
                }
            })
        }))


        let response = NextResponse.json({ 
            message: "Registration successful",
            isSuccess: true,
        }, 
        {
            status: 200
        })
        
        return response



    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to add prizes"
        }, 
        {
            status: 400
        })
    }
}