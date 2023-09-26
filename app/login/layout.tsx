import Header from "@/components/client/Header/Header"
import { getDictionary } from "@/dictionaries/dictionaries";
import type { Metadata } from 'next'
import { headers } from "next/headers";


export let metadata:Metadata;

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const dict = await getDictionary(headers().get('x-language') || "en")

    metadata = {
      title: dict.meta.login.title,
      description: dict.meta.login.desc,
    }

    return (
      <>
        <Header/>
        {children}
      </>
    )
  }