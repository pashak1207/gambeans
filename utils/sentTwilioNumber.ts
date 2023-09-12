import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new Twilio(accountSid, authToken);


export async function sentTwilioNumber(verification_code:string, phoneTo:string){
    return await client.messages
        .create({
            body: `Your verification code is ${verification_code}`,
            to: phoneTo,
            from: process.env.TWILIO_PHONE,
        }).catch(e => console.log("Twilio error: " + e.message))
}