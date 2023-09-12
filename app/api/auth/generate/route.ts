import { NextRequest, NextResponse } from 'next/server'
import { generateVerificationCode } from '@/utils/generateVerificationCode'
import { prisma} from '@/prisma/client'
import LoginRegisterValidation from '@/utils/loginRegisterValidation'
import { sentTwilioNumber } from '@/utils/sentTwilioNumber'

export async function POST(request: NextRequest) {
    try{
        const body = await request.json()        
        const { phone }:{ phone:string } = body
        const code:string = generateVerificationCode()
        const cafe_id:number = +request.headers.get('x-cafe-id')!

        console.log(code);     

        if(!phone || !LoginRegisterValidation.validatePhone(phone)){
            return NextResponse.json({ 
                message: "Phone number is wrong"
            }, 
            {
                status: 400
            })
        }
        
        let user = await prisma.users.findUnique({
            where: {
                phone: +phone,
                cafes: {
                    some: {
                        cafe_id
                    }
                }
            },
        }).catch(e => console.log("Find user error: " + e.message))

        if(!user){
            await prisma.cafes.update({
                where:{
                    id: +cafe_id
                },
                data: {
                    users:{
                        create: {
                            user:{
                                create: {
                                    phone: +phone,
                                    verification_code: code,
                                },
                            }
                        }
                    }
                }
            })

            user = await prisma.users.findUnique({
                where: {
                    phone: +phone,
                    cafes: {
                        some: {
                            cafe_id
                        }
                    }
                },
            }).catch(e => console.log("Find user error: " + e.message))

        }else{
            user = await prisma.users.update({
                where: {
                    phone: +phone,
                },
                data: {
                    verification_code: code
                }
            })
            .catch(e => console.log("Update user error: " + e.message))
        }


        // await sentTwilioNumber(code, phone)


        return NextResponse.json({
            phone: parseInt(`${user?.phone}`),
            name: user?.name,
            DOB: user?.DOB
        })


    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Generate code error"
        }, 
        {
            status: 400
        })
    }
}