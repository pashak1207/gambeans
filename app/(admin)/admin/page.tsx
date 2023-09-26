import AdminCafe from "@/components/admin/AdminCafe/AdminCafe"
import styles from "./../page.module.scss"
import AdminMenu from '@/components/admin/AdminMenu/AdminMenu'
import AdminWrapper from '@/components/admin/AdminWrapper/AdminWrapper'
import { getDictionary } from "@/dictionaries/dictionaries"
import { headers } from "next/headers"

export default async function AdminPage() {
    
    const dict = await getDictionary(headers().get('x-language') || "en") 

    return <main className={styles.adminMain}>
                <AdminMenu dictionary={dict.admin.menu} superadmin={false} cafes={false} />
                <AdminWrapper>
                   <AdminCafe dictionary={dict.admin.cafe} isCreate={false} />
                </AdminWrapper>
            </main>
}