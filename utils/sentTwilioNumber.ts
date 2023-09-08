import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new Twilio(accountSid, authToken);


export function sentTwilioNumber(verification_code:string, phoneTo:string){
    const response = client.messages
        .create({
            body: `Your verification code is ${verification_code}`,
            to: phoneTo,
            from: process.env.TWILIO_PHONE,
        }).catch(e => console.log("Twilio error: " + e.message))

    return response
}