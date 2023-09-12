import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'
import JWT from '@/utils/jwtgenerate'
import LoginRegisterValidation from '@/utils/loginRegisterValidation'
import { cookies } from 'next/headers'
 
export async function POST(request: NextRequest) {    
    try{
        const body = await request.json()        
        const { phone, code }:{phone:string, code: string} = body
        const cafe_id:number = +request.headers.get('x-cafe-id')!
        const cookiesStore = cookies()
        
        if(
            !phone ||
            !code ||
            !LoginRegisterValidation.validatePhone(phone)
        ){
            return NextResponse.json({ 
                message: "Wrong request data"
            }, 
            {
                status: 400
            })
        }

        const user = await prisma.users.findUnique({
            where: {
                phone: +phone,
                cafes:{
                    some:{
                        cafe_id
                    }
                }
            }
        })!

        if(user?.verification_code === code) {
            let isRegistrated = false;

            if(user?.DOB || user?.name){
                isRegistrated = true;
                cookiesStore.set(...await JWT.generateAccessToken(+user.id, user.role as Users_role, request, cafe_id.toString()) as any)
                cookiesStore.set(...await JWT.generateRefreshToken(+user.id, user.role as Users_role, request, cafe_id.toString()) as any)
                
            }

            return NextResponse.json({ 
                message: "Code is correct",
                isCorrect: true,
                isRegistrated
            }, 
            {
                status: 200
            })
        }

        return NextResponse.json({ 
            message: "Code is wrong",
            isCorrect: false
        }, 
        {
            status: 400
        })

        


    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error during codes comparison"
        }, 
        {
            status: 400
        })
    }
}