import { NextRequest } from "next/server";
import { prisma } from '@/prisma/client'
import { cookies } from 'next/headers'
import JWT from '@/utils/jwtgenerate';

const CafeUtils = {
    async getCurrentCafe (request: NextRequest){
        const cookieStore = cookies()
        const accesToken = cookieStore.get('JWTAccessToken')?.value
        let cafe;

        if(!accesToken){
            try{
                cafe = await prisma.cafes.findFirst({
                    where:{
                        OR: [
                            {
                                link_eng: request.headers.get('host')
                            },
                            {
                                link_heb: request.headers.get('host')
                            }
                        ]
                    }
                })    
            }catch (err){
                console.log("Cafe not found: " + err);
            }           
        }else{
            const cafe_id = await JWT.verfiyAccessToken(accesToken!)
                .then(data => data?.payload?.cafe_id)
                .catch(err => console.log("Error to get cafeId from token: " + err.message))
                 
            try{
                cafe = await prisma.cafes.findFirst({
                    where:{
                        id: +cafe_id!
                    }
                })                
                
            }catch(err){
                console.log("Cafe not found: " + err);
            }            
        }

        return cafe
    },

    async getCurrentCafeId (request: NextRequest){
        const cookieStore = cookies()
        const accesToken = cookieStore.get('JWTAccessToken')?.value
        let cafe_id;

        if(accesToken){
            cafe_id = await JWT.verfiyAccessToken(accesToken!)
                .then(data => data?.payload?.cafe_id)
                .catch(err => console.log("Error to get cafeId from token: " + err.message))
            
        }else if(request.headers.has('x-cafe-id')){
            cafe_id = request.headers.get('x-cafe-id')         
        }else{
            try{
                cafe_id = await prisma.cafes.findFirst({
                    where:{
                        OR: [
                            {
                                link_eng: request.headers.get('host')
                            },
                            {
                                link_heb: request.headers.get('host')
                            }
                        ]
                    },
                    select:{
                        id: true
                    }
                }).then(data => data?.id)          
            }catch (err){
                console.log("Cafe not found: " + err);
            }
        }
        
        return cafe_id
    },

    async getCurrentCafeFTW (cafe_id: number): Promise<number>{

        const cafe_ftw = await prisma.cafes.findUnique({
            where:{
                id: cafe_id
            },
            select:{
                ftw: true
            }
        }).then(data => data?.ftw)
        
        return +cafe_ftw!
    },
}

export default CafeUtils