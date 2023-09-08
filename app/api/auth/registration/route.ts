import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import JWT from '@/utils/jwtgenerate';
 
export async function POST(request: NextRequest) {
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

            let response = NextResponse.json({ 
                message: "Registration successful",
                isSuccess: true,
            }, 
            {
                status: 200
            })

            response.cookies.set(...await JWT.generateAccessToken(user, request) as any)
            response.cookies.set(...await JWT.generateRefreshToken(user, request) as any)
            
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