import AdminCafe from "@/components/admin/AdminCafe/AdminCafe"
import styles from "./../page.module.scss"
import AdminMenu from '@/components/admin/AdminMenu/AdminMenu'
import AdminWrapper from '@/components/admin/AdminWrapper/AdminWrapper'

export default async function AdminPage() {        
    return <main className={styles.adminMain}>
                <AdminMenu superadmin={false} cafes={false} />
                <AdminWrapper>
                   <AdminCafe isCreate={false} />
                </AdminWrapper>
            </main>
}