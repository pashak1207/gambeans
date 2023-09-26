import { getDictionary } from "@/dictionaries/dictionaries"
import { headers } from "next/headers"
import Image from "next/image"

export default async function Loading() {

    const dict = await getDictionary(headers().get('x-language') || "en") 

    return (
        <div className="loadingPane">
            <Image
                src="/loading.png"
                alt="loading..."
                width={185}
                priority
                height={224}
            />
            <h2>{dict.loading.heading}</h2>
            <p>{dict.loading.text}</p>
        </div>
    )
}