import styles from "./../page.module.scss"
import SuperAdminDashboard from "@/components/superadmin/SuperAdminDashboard/SuperAdminDashboard"
import AdminMenu from '@/components/admin/AdminMenu/AdminMenu'
import AdminWrapper from '@/components/admin/AdminWrapper/AdminWrapper'
import { getDictionary } from "@/dictionaries/dictionaries"
import { headers } from "next/headers"

export default async function SuperdminPage() {

    const dict = await getDictionary(headers().get('x-language') || "en")

    return <main className={styles.adminMain}>
                <AdminMenu dictionary={dict.admin.menu} superadmin={true} cafes={false}/>
                <AdminWrapper>
                    <SuperAdminDashboard />
                </AdminWrapper>
            </main>
}