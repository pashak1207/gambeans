import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/client'
import JWT from '@/utils/jwtgenerate';
import LoginRegisterValidation from '@/utils/loginRegisterValidation';
 
export async function POST(request: NextRequest) {
    try{
        const body = await request.json()
        const { phone, name, dob } = body

        const isPhoneValid = LoginRegisterValidation.validatePhone(phone)
        const isNameValid = LoginRegisterValidation.validateName(name)
        const date = new Date(dob)
        const isDateValid = LoginRegisterValidation.validateDate(`${date.getUTCDate()}`, `${(date.getUTCMonth() + 1)}`, `${date.getUTCFullYear()}`)
        

        if(isPhoneValid && isNameValid && isDateValid){
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

            response.cookies.set(...await JWT.generateAccessToken(+user.id, user.role as Users_role, request) as any)
            response.cookies.set(...await JWT.generateRefreshToken(+user.id, user.role as Users_role, request) as any)
            
            return response



        }else{
            return NextResponse.json({ 
                message: "Not all fields are filled in or some fields are wrong",
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