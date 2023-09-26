import AdminCafe from "@/components/admin/AdminCafe/AdminCafe";
import AdminMenu from "@/components/admin/AdminMenu/AdminMenu";
import AdminWrapper from "@/components/admin/AdminWrapper/AdminWrapper";
import styles from "./../../page.module.scss"
import { getDictionary } from "@/dictionaries/dictionaries";
import { headers } from "next/headers";


export default async function SuperdminCreatePage() {      
  
        const dict = await getDictionary(headers().get('x-language') || "en")

        return <main className={styles.adminMain}>
                    <AdminMenu dictionary={dict.admin.menu}  superadmin={true} cafes={true} />
                    <AdminWrapper>
                        <AdminCafe dictionary={dict.admin.cafe} isCreate={true}/>
                    </AdminWrapper>
                </main>
}