import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import JWT from '@/utils/jwtgenerate';
import UserUtils from '@/utils/userUtils';
import { Prize_type, Users_role } from '@/types/enums';
import CafeUtils from '@/utils/cafeUtils';
import { headers } from 'next/headers';
 
export async function POST(request: NextRequest) {
    try{
        const body = await request.json()
        const { phone, name, dob, email } = body
        const cafe_id:number = +request.headers.get('x-cafe-id')!
        const currentCafeLang:string = headers().get('x-language') || "en"

        const isPhoneValid = UserUtils.validatePhone(phone)
        const isNameValid = UserUtils.validateName(name)
        const isEmailValid = UserUtils.validateEmail(email)
        const date = new Date(dob)
        let isAdmin = false
        const isDateValid = UserUtils.validateDate(`${date.getUTCDate()}`, `${(date.getUTCMonth() + 1)}`, `${date.getUTCFullYear()}`)
        const cafe_ftw = await CafeUtils.getCurrentCafeFTW(cafe_id)


        if(isPhoneValid && isNameValid && isDateValid && isEmailValid){
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
                isAdmin = true
            }
            

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
                    email,
                    role: isAdmin ? Users_role.ADMIN : Users_role.USER
                }
            })

            if(!prizes?.length || !welcome_prize){
                
                let response = NextResponse.json({ 
                    message: "Registration successful",
                    isSuccess: true,
                    isAdmin: true
                }, 
                {
                    status: 200
                })
    
                response.cookies.set(...await JWT.generateAccessToken(+user.id, user.role as any, request, currentCafeLang) as any)
                response.cookies.set(...await JWT.generateRefreshToken(+user.id, user.role as any, request, currentCafeLang) as any)
                
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
                    user_id: user.id,
                    prize_id: welcome_prize!.id,
                    is_won: true,
                }
            })            

            await Promise.all(prizes!.map(async (prize) => {                
                await prisma.user_prize.create({
                    data:{
                        user_id: user.id,
                        prize_id: prize.id,
                        is_won: prize.type===Prize_type.FREE ? true :(Math.floor(Math.random() * 100) + 1 <= prize.probability),
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

            response.cookies.set(...await JWT.generateAccessToken(+user.id, user.role as any, request, currentCafeLang) as any)
            response.cookies.set(...await JWT.generateRefreshToken(+user.id, user.role as any, request, currentCafeLang) as any)
            
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