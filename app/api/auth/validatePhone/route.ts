import { NextResponse } from 'next/server'
import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new Twilio(accountSid, authToken);
 
export async function POST(request: Request) {
    try{
        const body = await request.json()
        const { phone } = body

        const isNumberValid = await client.lookups.v2.phoneNumbers(phone)
                 .fetch()
                 .then(phone_number => phone_number.valid);

        if(!isNumberValid){
            return NextResponse.json({
                message: 'Invalid phone number',
                phoneValid: false,
                phoneNumber: phone
            })
        }

        return NextResponse.json({
            message: 'Phone number is valid',
            phoneValid: true,
            phoneNumber: phone
        })


    }catch(e){
        console.log(e)

        return NextResponse.json({ 
            message: "Validate error occured"
        }, 
        {
            status: 400
        })
    }
}