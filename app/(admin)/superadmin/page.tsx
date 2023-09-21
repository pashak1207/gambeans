import styles from "./../page.module.scss"
import SuperAdminDashboard from "@/components/superadmin/SuperAdminDashboard/SuperAdminDashboard"
import AdminMenu from '@/components/admin/AdminMenu/AdminMenu'
import AdminWrapper from '@/components/admin/AdminWrapper/AdminWrapper'

export default async function SuperdminPage() {                    
        return <main className={styles.adminMain}>
                    <AdminMenu superadmin={true} cafes={false}/>
                    <AdminWrapper>
                        <SuperAdminDashboard />
                    </AdminWrapper>
                </main>
}