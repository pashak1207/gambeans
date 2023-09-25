import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
 
export async function GET(request: NextRequest) {

    try{
        
        const SHOW_CAFES_ON_PAGE = 30
        let count = 0
        
        if(request.nextUrl.searchParams.has("count")){
            count = await prisma.cafes.count()

            return NextResponse.json({ 
                cafes: count
            }, 
            {
                status: 200
            })
        }

        let paginationSkip = request.nextUrl.searchParams.get("pagin")?.trim() ? +request.nextUrl.searchParams.get("pagin")! : 0
        count = await prisma.cafes.count()

        if(SHOW_CAFES_ON_PAGE * paginationSkip > count){
            paginationSkip = 0
        }
        
        const cafes = await prisma.cafes.findMany({
            include:{
                prizes: true,
                users:{
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
                            where:{
                                used: {
                                    not: null
                                }
                            },
                            include:{
                                prize: true
                            }
                        },
                        visits: true
                    }
                }
            },
            take: SHOW_CAFES_ON_PAGE,
            skip: SHOW_CAFES_ON_PAGE * paginationSkip
        })
                        
        return NextResponse.json({ 
            cafes,
            onPage: SHOW_CAFES_ON_PAGE
        }, 
        {
            status: 200
        })
        
    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Errer to get all cafes"
        }, 
        {
            status: 400
        })
    }
}