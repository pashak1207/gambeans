import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import jwt from 'jsonwebtoken';
 
export async function POST(request: Request) {
    const MAX_AGE = 60 * 60 * 24 * 5

    try{
        const body = await request.json()
        const { phone, name, dob } = body

        if(phone && name && dob){
            let user = await prisma.users.update({
                where: {
                    phone: +phone,
                },
                data: {
                    DOB: dob,
                    name
                }
            })

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

            let response = NextResponse.json({ 
                message: "Registration successful",
                isSuccess: true,
            }, 
            {
                status: 200
            })

            response.cookies.set("JWTToken", token, {
                path: "/",
                httpOnly: true,
                maxAge: MAX_AGE
            })
            
            return response



        }else{
            return NextResponse.json({ 
                message: "Not all fields are filled in",
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