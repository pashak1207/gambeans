import 'reset-css';
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, Slide } from 'react-toastify';
import { headers } from 'next/headers';
import { getDictionary } from '@/dictionaries/dictionaries';

export let metadata: Metadata;
  
  
async function AdminLayout({children}: {children: React.ReactNode}) {

    const dict = await getDictionary(headers().get('x-language') || "en")

    metadata = {
        title: dict.meta.admin.title,
        description: dict.meta.admin.desc,
    }

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