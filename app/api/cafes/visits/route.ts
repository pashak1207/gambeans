import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import UserUtils from '@/utils/userUtils';
import { calculatePercentage } from '@/utils/calculatePercentage';
 
export async function GET(request: NextRequest) {
    try{
                
        const prevDayVisitsCount = await prisma.visits.count({
            where:{
                visit_date: {
                    lt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 1))),
                    gt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 2))),
                }
            }
        })

        const currentDayVisitsCount = await prisma.visits.count({
            where:{
                visit_date: {
                    lt: UserUtils.getStartOfDay(new Date()),
                    gt: UserUtils.getStartOfDay(new Date(new Date().setDate(new Date().getDate() - 1))),
                }
            }
        })        

        return NextResponse.json({ 
            count: currentDayVisitsCount,
            progress: calculatePercentage(prevDayVisitsCount, currentDayVisitsCount)
        }, 
        {
            status: 200
        })
        
        

    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Errer to get cafe visits"
        }, 
        {
            status: 400
        })
    }
}