import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import CafeServerService from "@/services/cafeServer.service";

export const config = {
    api: {
      bodyParser: false,
    },
};

export async function POST(request: NextRequest){

    try{
        const currentCafeId:number = await CafeServerService.getCafeId().then(data => data.cafeId)
        const formData = await request.formData();

        const file:File | null  = formData.get('image') as unknown as File
        
        if (!file) {
          return NextResponse.json({ 
              message: "No files received."
          }, 
          {
              status: 400
          })
        }
        
      
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_")
      
        try {

            let dir = path.join(process.cwd(), "public/uploads/" + currentCafeId);

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }

            await writeFile(
                path.join(dir, filename),
                buffer
            );
        
            return NextResponse.json({ 
                url: `/uploads/${currentCafeId}/${filename}`
            }, 
            {
                status: 200
            })

        } catch (error) {
      
            console.log("Error occured ", error);
        
            return NextResponse.json({ 
                message: "Errer to create prize"
            }, 
            {
                status: 400
            })
        }

    }catch(e){
        console.log(e);
        
        return NextResponse.json({ 
            message: "Error to upload file"
        }, 
        {
            status: 400
        })
    }
};