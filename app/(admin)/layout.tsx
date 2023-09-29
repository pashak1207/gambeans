import 'reset-css';
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, Slide } from 'react-toastify';
import { headers } from 'next/headers';
import { getDictionary } from '@/dictionaries/dictionaries';

export async function generateMetadata(): Promise<Metadata> {
    const language = headers().get('x-language') || "en"
    const dict = await getDictionary(language)
  
    return {
      title: dict.meta.admin.title,
      description: dict.meta.admin.desc
    }
  }
  
  
async function AdminLayout({children}: {children: React.ReactNode}) {
    return (<>
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
        </>
    )
}

export default AdminLayout