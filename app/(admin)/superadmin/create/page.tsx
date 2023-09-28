import AdminCafe from "@/components/admin/AdminCafe/AdminCafe";
import AdminMenu from "@/components/admin/AdminMenu/AdminMenu";
import AdminWrapper from "@/components/admin/AdminWrapper/AdminWrapper";
import styles from "./../../page.module.scss"
import { getDictionary } from "@/dictionaries/dictionaries";
import { headers } from "next/headers";


export default async function SuperdminCreatePage() {      
  
        const lang = headers().get('x-language') || "en"
        const dict = await getDictionary(lang)

        return <main className={styles.adminMain}>
                    <AdminMenu lang={lang} dictionary={dict.admin.menu}  superadmin={true} cafes={true} />
                    <AdminWrapper>
                        <AdminCafe lang={lang} dictionary={dict.admin.cafe} isCreate={true}/>
                    </AdminWrapper>
                </main>
}