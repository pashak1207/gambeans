import Header from '@/components/client/Header/Header'
import { getDictionary } from '@/dictionaries/dictionaries'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  const language = headers().get('x-language') || "en"
  const dict = await getDictionary(language)

  return {
    title: dict.meta.dashboard.title,
    description: dict.meta.dashboard.desc
  }
}

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {    
    return (
      <>
        <Header/>
        {children}
      </>
    )
  }