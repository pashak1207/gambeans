import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import UserUtils from '@/utils/userUtils';
import { calculatePercentage } from '@/utils/calculatePercentage';
import CafeServerService from '@/services/cafeServer.service';
 
export async function GET(request: NextRequest) {
    try{
        let users;

        if(request.nextUrl.searchParams.has("count")){
            users = await prisma.users.count({
                where:{
                    DOB: {
                        not: null
                    },
                    name: {
                        not: null
                    }
                },
            })
        }else if(request.nextUrl.searchParams.has("newDays")){
            const days = +request.nextUrl.searchParams.get("newDays")!
            
            const prevDaysUsers = await prisma.users.count({
                where:{
                    DOB: {
                        not: null
                    },
                    name: {
                        not: null
                    },
                    created_at:{
                        lt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - days))),
                        gt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - days*2 + 1))),
                    }
                },
            })            

            const currentDaysUsers = await prisma.users.count({
                where:{
                    DOB: {
                        not: null
                    },
                    name: {
                        not: null
                    },
                    created_at:{
                        lt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() + 1))),
                        gt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - days + 1))),
                    }
                },
            })

            return NextResponse.json({ 
                count: currentDaysUsers,
                progress: calculatePercentage(prevDaysUsers, currentDaysUsers)
            }, 
            {
                status: 200
            })            

        }else if(request.nextUrl.searchParams.has("actDays")){
            const days = +request.nextUrl.searchParams.get("actDays")!            
            
            const prevDaysUsers = await prisma.users.count({
                where:{
                    DOB: {
                        not: null
                    },
                    name: {
                        not: null
                    },
                    visits:{
                        some:{
                            visit_date:{
                                lt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - days - 1))),
                                gt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - days*2))),
                            }
                        }
                    }
                },
            })            

            const currentDaysUsers = await prisma.users.count({
                where:{
                    DOB: {
                        not: null
                    },
                    name: {
                        not: null
                    },
                    visits:{
                        some:{
                            visit_date:{
                                lt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate()))),
                                gt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - days))),
                            }
                        }
                    }
                },
            })

            return NextResponse.json({ 
                count: currentDaysUsers,
                progress: calculatePercentage(prevDaysUsers, currentDaysUsers)
            }, 
            {
                status: 200
            })            

        }else if(request.nextUrl.searchParams.has("year")){
            const counts = [];

            for (let month = 0; month < 12; month++) {
                let startDate = new Date(new Date().getFullYear(), month, 1);
                let lastDate = new Date(new Date().getFullYear(), month+1, 0);                

                const count = await prisma.users.count({
                    where: {
                        DOB: {
                            not: null
                        },
                        name: {
                            not: null
                        },
                        visits: {
                            some:{
                                visit_date: {
                                    gte: startDate,
                                    lt: lastDate,
                                },
                            }
                        }
                    },
                });

                counts.push(count);
            }            

            return NextResponse.json({ 
                counts
            }, 
            {
                status: 200
            })

        }else if(request.nextUrl.searchParams.has("orderBy") 
            && request.nextUrl.searchParams.has("method")){

            const cafeId = await CafeServerService.getCafeId().then(data => data.cafeId)
            const param:string = request.nextUrl.searchParams.get("orderBy") as string
            const method:string = request.nextUrl.searchParams.get("method") as string

            users = await prisma.users.findMany({
                where: {
                    cafe_id: cafeId,
                },
                include:{
                    prizes: true,
                    visits: true
                },
                orderBy:{
                    [param]: method,
                }
            })
            
            return NextResponse.json({ 
                users
            }, 
            {
                status: 200
            })
            
        }else if(request.nextUrl.searchParams.has("stage")){
            const cafeId = await CafeServerService.getCafeId().then(data => data.cafeId)
            
            users = await prisma.users.findMany({
                where:{
                    cafe_id: +cafeId!,
                    DOB: {
                        not: null
                    },
                    name: {
                        not: null
                    }
                },
                select:{
                    _count:{
                        select:{
                            prizes:{
                                where:{
                                    opened:{
                                        not: null
                                    }
                                }
                            },
                        }
                    }
                }
            })            
            
        }else{
            users = await prisma.users.findMany({
                where:{
                    DOB: {
                        not: null
                    },
                    name: {
                        not: null
                    }
                },
                orderBy:{
                    created_at: "desc"
                }
            })
        }

        return NextResponse.json({ 
            users
        }, 
        {
            status: 200
        })
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Error to get all users"
        }, 
        {
            status: 400
        })
    }
}