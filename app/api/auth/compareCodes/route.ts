import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'
import jwt from 'jsonwebtoken';
 
export async function POST(request: Request) {
    const MAX_AGE = 60 * 60 * 24 * 5

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

                const secret = process.env.JWT_SECRET || "";

                const token = jwt.sign({
                    id: user.id,
                    phone: user.phone.toString(),
                    },
                    secret,
                    {
                        expiresIn: MAX_AGE
                    }
                )

                response = NextResponse.json({ 
                    message: "Code is correct",
                    isCorrect: true,
                    isRegistrated
                }, 
                {
                    status: 200
                })
                
                response.cookies.set("JWTToken", token, {
                    path: "/",
                    httpOnly: true,
                    maxAge: MAX_AGE
                  })
                
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