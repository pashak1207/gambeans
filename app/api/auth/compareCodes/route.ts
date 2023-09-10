import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'
import JWT from '@/utils/jwtgenerate'
import CafeUtils from '@/utils/cafe'
 
export async function POST(request: NextRequest) {
    try{
        const body = await request.json()
        const { phone, code } = body
        const cafe_id = await CafeUtils.getCurrentCafeId(request)
        
        if(!cafe_id){
            return NextResponse.json({ 
                message: "Error to find cafe"
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

                response.cookies.set(...await JWT.generateAccessToken(user, request) as any)
                response.cookies.set(...await JWT.generateRefreshToken(user, request) as any)
                
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