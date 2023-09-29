import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import CafeServerService from "@/services/cafeServer.service";

export async function POST(request: NextRequest){

    try{
        const currentCafeId:number = await CafeServerService.getCafeId().then(data => +data.cafeId!)
        const formData = await request.formData();
        const fileName = request.nextUrl.searchParams.has("cafe") ? "logo" : request.nextUrl.searchParams.has("prize") ? request.nextUrl.searchParams.get("prize") : new Date().toString()

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
        const extension = path.extname(filename);        
      
        try {

            let dir = path.join(process.cwd(), "public/uploads/" + currentCafeId);

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }

            await writeFile(
                path.join(dir, (fileName + extension)),
                buffer
            );
        
            return NextResponse.json({ 
                url: `/uploads/${currentCafeId}/${(fileName + extension)}`
            }, 
            {
                status: 200
            })

        } catch (error) {
      
            console.log("Error occured ", error);
        
            return NextResponse.json({ 
                message: "Error to create prize"
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