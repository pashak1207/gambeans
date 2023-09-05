import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'
import JWT from '@/utils/jwtgenerate'
 
export async function POST(request: Request) {
    try{
        const body = await request.json()
        const { phone, code } = body

        const user = await prisma.users.findUnique({
            where: {
                phone: +phone,
            }
        })

        if(user?.verification_code === code) {
            let isRegistrated = false;

            let response = NextResponse.json({ 
                message: "Code is correct",
                isCorrect: true,
                isRegistrated
            }, 
            {
                status: 200
            })

            if(user?.DOB || user?.name){
                isRegistrated = true;

                response = NextResponse.json({ 
                    message: "Code is correct",
                    isCorrect: true,
                    isRegistrated
                }, 
                {
                    status: 200
                })

                response.cookies.set(...await JWT.generateAccessToken(user) as any)
                response.cookies.set(...await JWT.generateRefreshToken(user) as any)
                
            }

            

            return response
        }

        return NextResponse.json({ 
            message: "Code is not correct",
            isCorrect: false
        }, 
        {
            status: 400
        })

        


    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to compare codes"
        }, 
        {
            status: 400
        })
    }
}