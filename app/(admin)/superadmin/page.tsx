import styles from "./../page.module.scss"
import SuperAdminDashboard from "@/components/superadmin/SuperAdminDashboard/SuperAdminDashboard"
import AdminMenu from '@/components/admin/AdminMenu/AdminMenu'
import AdminWrapper from '@/components/admin/AdminWrapper/AdminWrapper'
import { getDictionary } from "@/dictionaries/dictionaries"
import { headers } from "next/headers"

export default async function SuperdminPage() {

    const lang = headers().get('x-language') || "en"
    const dict = await getDictionary(lang)

    return <main className={styles.adminMain}>
                <AdminMenu lang={lang} dictionary={dict.admin.menu} superadmin={true} cafes={false}/>
                <AdminWrapper>
                    <SuperAdminDashboard />
                </AdminWrapper>
            </main>
}