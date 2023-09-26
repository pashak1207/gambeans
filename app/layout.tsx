import 'reset-css';
import "@/app/globals.scss"
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.min.css';
import { Nunito, Urbanist, Inter, Poppins, Roboto } from 'next/font/google'
import { ToastContainer, Slide } from 'react-toastify';
import { headers } from 'next/headers';
import { getDictionary } from '@/dictionaries/dictionaries';

export let metadata:Metadata;

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})
   
const nunito = Nunito({
    subsets: ['latin'],
    variable: '--font-nunito',
    display: 'swap',
})

const urbanist = Urbanist({
    subsets: ['latin'],
    variable: '--font-urbanist',
    display: 'swap',
})

const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap',
})

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})
  
async function RootLayout({children}: {children: React.ReactNode}) {

    const language = headers().get('x-language') || "en"
    const dict = await getDictionary(language)
    
    metadata = {
        title: dict.meta.welcome.title,
        description: dict.meta.welcome.desc,
    }

    return (
        <html className={`${inter.variable} ${language==="he" ? "rtl" : ""} ${nunito.variable} ${urbanist.variable} ${poppins.variable} ${roboto.variable}`} lang={language}>
            <body>
                {children}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    transition={Slide}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </body>
        </html>
    )
}

export default RootLayout