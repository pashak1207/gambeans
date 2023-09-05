import { NextResponse } from 'next/server'
import { generateVerificationCode } from '@/utils/generateVerificationCode'
import { sentTwilioNumber } from '@/utils/sentTwilioNumber'
import { prisma } from '@/prisma/client'

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const { phone } = body
        const code = generateVerificationCode()

        let user = await prisma.users.findUnique({
            where: {
                phone: +phone,
            }
        }).catch(e => console.log("Find user error: " + e.message))

        if(!user){
            user = await prisma.users.create({
                data:{
                    phone: +phone,
                    verification_code: code
                }
            }).catch(e => console.log("New user creation error: " + e.message))
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


        await sentTwilioNumber(code, phone)


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