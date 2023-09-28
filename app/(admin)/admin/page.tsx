import AdminCafe from "@/components/admin/AdminCafe/AdminCafe"
import styles from "./../page.module.scss"
import AdminMenu from '@/components/admin/AdminMenu/AdminMenu'
import AdminWrapper from '@/components/admin/AdminWrapper/AdminWrapper'
import { getDictionary } from "@/dictionaries/dictionaries"
import { headers } from "next/headers"

export default async function AdminPage() {
    
    const lang = headers().get('x-language') || "en"
    const dict = await getDictionary(lang) 

    return <main className={styles.adminMain}>
                <AdminMenu lang={lang} dictionary={dict.admin.menu} superadmin={false} cafes={false} />
                <AdminWrapper>
                   <AdminCafe lang={lang} dictionary={dict.admin.cafe} isCreate={false} />
                </AdminWrapper>
            </main>
}