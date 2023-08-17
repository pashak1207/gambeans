import "@/app/globals-client.scss"
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Welcome',
    description: 'Cafe page',
  }
  
  
function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}

export default RootLayout