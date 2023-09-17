import { Twilio } from "twilio";

const client = new Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export async function sendTwilioNumber(verification_code:string, phoneTo:string){
    return await client.messages
        .create({
            body: `Your verification code is ${verification_code}`,
            to: phoneTo,
            from: process.env.TWILIO_PHONE,
        }).catch(e => console.log("Twilio error: " + e.message))
}
