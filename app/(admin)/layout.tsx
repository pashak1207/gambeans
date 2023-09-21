import 'reset-css';
import type { Metadata } from 'next'
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, Slide } from 'react-toastify';

export const metadata: Metadata = {
    title: 'Welcome Admin',
    description: 'Admin page',
  }
  
  
function AdminLayout({children}: {children: React.ReactNode}) {
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