import { NextRequest, NextResponse } from 'next/server'
import { prisma} from '@/prisma/client'
import UserUtils from '@/utils/userUtils'
import { sendTwilioNumber } from '@/utils/sendTwilioNumber'

export async function POST(request: NextRequest) {
    try{
        const body = await request.json()        
        const { phone }:{ phone:string } = body
        const code:string = UserUtils.generateVerificationCode()
        const cafe_id:number = +request.headers.get('x-cafe-id')!

        console.log(code);     

        if(!phone || !UserUtils.validatePhone(phone)){
            return NextResponse.json({ 
                message: "Phone number is wrong"
            }, 
            {
                status: 400
            })
        }
        
        let user = await prisma.users.findUnique({
            where: {
                phone_cafe_id:{
                    phone,
                    cafe_id
                }
            },
        }).catch(e => console.log("Find user error: " + e.message))
        
        if(!user){
            user = await prisma.users.create({
                data:{
                    phone,
                    verification_code: code,
                    cafe_id,
                    avatar: UserUtils.selectRandomAvatar()
                }
            }).catch(e => console.log("Create user error: " + e.message))

        }else{
            user = await prisma.users.update({
                where: {
                    phone_cafe_id:{
                        phone,
                        cafe_id
                    }
                },
                data: {
                    verification_code: code
                }
            })
            .catch(e => console.log("Update user error: " + e.message))
        }

        const dailyPhone = await prisma.cafes.findUnique({
            where: {
                id: cafe_id
            },
            select:{
                send_phone: true
            }
        }).then(data => data?.send_phone)        

        if(dailyPhone){
            // await sendTwilioNumber(code, phone, dailyPhone)
        }else{
            console.log("This cafe does not have daily phone number");
        }


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