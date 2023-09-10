import Header from "@/components/client/Header/Header"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Cafe page',
}


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <Header logoURL='/logo.png' color='#FD8679' />
        {children}
      </>
    )
  }