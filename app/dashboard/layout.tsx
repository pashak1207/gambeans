import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Cafe page',
}


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        {children}
      </>
    )
  }