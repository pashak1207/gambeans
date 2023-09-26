import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import CafeUtils from '@/utils/cafeUtils';
 
export async function GET(request: NextRequest) {
    try{        
        const cafeId:number | unknown = await CafeUtils.getCurrentCafeId(request)              

        if(!cafeId){
            return NextResponse.json({ 
                message: "Can`t get current cafe"
            }, 
            {
                status: 400
            })
        }

        if(request.nextUrl.searchParams.has("id")){
            return NextResponse.json({ 
                cafeId
            }, 
            {
                status: 200
            })
        }
        
        let cafe;

        
        if(request.nextUrl.searchParams.has("lang")){
            cafe = await prisma.cafes.findUnique({
                where:{
                    id: +cafeId
                },
                select:{
                    env_version: true
                }
            })
            
            return NextResponse.json({ 
                cafeLang: cafe?.env_version
            }, 
            {
                status: 200
            })
        }
        

        if(request.nextUrl.searchParams.has("cafeId")){
            cafe = await prisma.cafes.findUnique({
                where: {
                    id: +request.nextUrl.searchParams.get("cafeId")!
                },
                include:{
                    prizes: {
                        include:{
                            users: true
                        },
                        orderBy:{
                            id: "desc"
                        }
                    },
                    visits: true,
                    users: {
                        where:{
                            DOB:{
                                not: null
                            },
                            name:{
                                not: null
                            }
                        },
                        include:{
                            prizes: {
                                include:{
                                    prize: true
                                }
                            },
                            visits: true
                        }
                    }
                }
            })
        }else{
            cafe = await prisma.cafes.findUnique({
                where: {
                    id: +cafeId
                },
                include:{
                    prizes: {
                        include:{
                            users: true
                        },
                        orderBy:{
                            id: "desc"
                        }
                    },
                    visits: true,
                    users: {
                        where:{
                            DOB:{
                                not: null
                            },
                            name:{
                                not: null
                            }
                        },
                        include:{
                            prizes: {
                                include:{
                                    prize: true
                                }
                            },
                            visits: true
                        }
                    }
                }
            })
        }

        if(!cafe){
            return NextResponse.json({ 
                message: "Current cafe does not exist"
            }, 
            {
                status: 400
            })
        }

        return NextResponse.json({ 
            cafe
        }, 
        {
            status: 200
        })
        
    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to get cafe information"
        }, 
        {
            status: 400
        })
    }
}