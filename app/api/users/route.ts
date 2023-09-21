import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import UserUtils from '@/utils/userUtils';
import { calculatePercentage } from '@/utils/calculatePercentage';
 
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

        }else if(request.nextUrl.searchParams.has("actMonth")){
            const days = +request.nextUrl.searchParams.get("actMonth")!

            const counts = [];

            for (let i = 0; i < days; i++) {
                const startDate = new Date();
                startDate.setMonth(startDate.getMonth() - i);
                startDate.setDate(1);
                startDate.setHours(0, 0, 0, 0);

                const endDate = new Date(startDate);
                endDate.setMonth(endDate.getMonth() + 1);

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
                                    lt: endDate,
                                },
                            }
                        }
                    },
                });

                counts.unshift(count);
            }            

            return NextResponse.json({ 
                counts
            }, 
            {
                status: 200
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
            message: "Errer to get all users"
        }, 
        {
            status: 400
        })
    }
}