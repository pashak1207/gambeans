import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import JWT from '@/utils/jwtgenerate';
import UserUtils from '@/utils/userUtils';
 
export async function POST(request: NextRequest) {
    try{
        const body = await request.json()
        const { phone, name, dob } = body
        const cafe_id:number = +request.headers.get('x-cafe-id')!

        const isPhoneValid = UserUtils.validatePhone(phone)
        const isNameValid = UserUtils.validateName(name)
        const date = new Date(dob)
        const isDateValid = UserUtils.validateDate(`${date.getUTCDate()}`, `${(date.getUTCMonth() + 1)}`, `${date.getUTCFullYear()}`)


        if(isPhoneValid && isNameValid && isDateValid){
            let user = await prisma.users.update({
                where: {
                    phone_cafe_id:{
                        cafe_id,
                        phone: phone
                    }
                },
                data: {
                    DOB: dob,
                    name,
                }
            })

            const prizes = await prisma.prizes.findMany({
                where:{
                    cafe_id: cafe_id,
                    is_active: true,
                    max_amount:{
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
                    max_amount:{
                        gt: 0
                    },
                },
            }).then(data => data[Math.floor(Math.random() * data.length)])
            .catch(err => console.log("Cafe didn`t have first prizes: " + err));         

            if(!prizes || !welcome_prize){
                return NextResponse.json({ 
                    message: "Prizes for user not found"
                }, 
                {
                    status: 400
                })
            }            
            
            await prisma.user_prize.create({
                data:{
                    user_id: user.id,
                    prize_id: welcome_prize.id,
                    opened: new Date(),
                    expires_at: new Date(new Date().setDate(new Date().getDate() + welcome_prize.expires_at))
                }
            })            

            await Promise.all(prizes.map(async (prize) => {                
                await prisma.user_prize.create({
                    data:{
                        user_id: user.id,
                        prize_id: prize.id,
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

            response.cookies.set(...await JWT.generateAccessToken(+user.id, user.role as any, request) as any)
            response.cookies.set(...await JWT.generateRefreshToken(+user.id, user.role as any, request) as any)
            
            return response



        }else{
            return NextResponse.json({ 
                message: "Not all fields are filled in or some fields are wrong",
                isSuccess: false,
            }, 
            {
                status: 400
            })
        }


    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Registration error"
        }, 
        {
            status: 400
        })
    }
}