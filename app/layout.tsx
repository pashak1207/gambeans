import 'reset-css';
import "@/app/globals-client.scss"
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, Slide } from 'react-toastify';

export const metadata: Metadata = {
    title: 'Welcome',
    description: 'Cafe page',
  }
  
  
function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
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