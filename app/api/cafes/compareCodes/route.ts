import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers';
import JWT from '@/utils/jwtgenerate';
 
export async function POST(request: NextRequest) {

    try{
        const body = await request.json()
        const { userCode }:{ userCode: string} = body
        const cafeId:number = +request.headers.get('x-cafe-id')!
        const cookieStore = cookies()
        const accessToken = cookieStore.get('JWTAccessToken')?.value || request.headers.get('authorization')
        
        const userId:number|void = await JWT.verfiyAccessToken(accessToken!)
                                    .then(data => data?.payload?.id)
                                    .then(data => +data!)
                                    .catch(err => console.log("Error to get userId from token: " + err.message))                

        const dailyCode = await prisma.cafes.findUnique({
            where:{
                id: cafeId
            },
            select:{
                daily_code: true
            }
        }).then(data => data?.daily_code)
        .catch(err => console.log("Can`t get current daily code: " + err.message))

        if(!dailyCode){
            return NextResponse.json({ 
                isEqual: false,
            }, 
            {
                status: 400
            })
        }

        const user = await prisma.users.findUnique({
            where:{
                id: +userId!
            }
        })
        

        if(userCode !== dailyCode || user?.daily_code === dailyCode){
            return NextResponse.json({ 
                isEqual: false,
            }, 
            {
                status: 400
            })
        }

        await prisma.users.update({
            where:{
                id: +userId!
            },
            data:{
                daily_code: dailyCode
            }
        })

        return NextResponse.json({ 
            isEqual: true,
        }, 
        {
            status: 200
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